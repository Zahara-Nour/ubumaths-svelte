import { math } from 'tinycas/build/math/math'
import emptyQuestion from './emptyQuestion'
import { lexicoSort } from '../../app/utils'
import { mdiLinkVariantRemove } from '@mdi/js'

export default function generateQuestion(question, generateds) {
  // firestore returns objects with read-only properties
  let expression
  let solutions
  let variables
  let details
  let choice
  const expressions = generateds ? generateds.map((g) => g.expression) : null
  const regex = /#\{(.*?)\}/g

  const replacement = (matched, p1) => {
    const e = math(p1)
    return e.string === 'Error' ? 'Error' : `${math(p1).eval().latex}`
  }

  if (!question) return emptyQuestion

  do {
    // first select an expression
    choice = Math.floor(question.expressions.length * Math.random())
    expression = question.expressions[choice]

    // generate variables which can depend on precedent ones
    if (question.variables) {
      variables = {
        ...question.variables[question.variables.length === 1 ? 0 : choice],
      }

      Object.getOwnPropertyNames(variables)
        .sort(lexicoSort)
        .forEach((name, i) => {
          // console.log('\n treating', name, variables[name])
          let generated = variables[name]

          // replace the precedent variables by their generated value
          for (let j = 1; j < i + 1; j++) {
            const precedentName = `&${j}`
            const regex = new RegExp(precedentName, 'g')
            generated = generated.replace(regex, variables[precedentName])
          }
          generated = math(generated).generate().string
          variables[name] = generated
        })

      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')
        expression = expression.replace(regex, variables[name])
      })
    }

    expression = expression.replace(regex, replacement)
  } while (expressions && expressions.includes(expression))

  if (question.solutions) {
    solutions = question.solutions[question.solutions.length === 1 ? 0 : choice]
    solutions = solutions.map((solution) => {
      if (question.variables) {
        Object.getOwnPropertyNames(variables).forEach((name) => {
          const regex = new RegExp(name, 'g')
          solution = solution.replace(regex, variables[name])
        })
        solution = solution.replace(regex, replacement)
        return solution
      }
    })
  } else {
    solutions = [math(expression).eval().latex]
  }

  if (question.details) {
    details = question.details[question.details.length === 1 ? 0 : choice]

    details = details.map((c) => {
      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')

        c = c.replace(regex, variables[name])
      })
      c = c.replace(regex, replacement)
      return c
    })
  }

  return {
    points: 1,
    ...question,
    solutions,
    expression,
    details,
  }
}
