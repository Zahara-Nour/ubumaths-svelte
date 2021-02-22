import { math } from 'tinycas/build/math/math'
import emptyQuestion from './emptyQuestion'
import { lexicoSort } from '../../app/utils'

export default function generateQuestion(question, generateds) {
 
  // firestore returns objects with read-only properties
  let expression
  let solution
  const expressions = generateds ? generateds.map((g) => g.expression) : null

  if (!question) return emptyQuestion

  do {
    // first select an expression
    const choice = Math.floor(question.expressions.length * Math.random())
    expression = question.expressions[choice]
  
    if (question.solutions) {
      solution = question.solutions[choice]
    } else {
      solution = null
    }

    // generate variables which can depend on precedent ones
    if (question.variables) {
      const variables = {
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

          const regex = new RegExp(name, 'g')
          expression = expression.replace(regex, generated)
          if (solution) {
            solution = solution.replace(regex, generated)
          }
          variables[name] = generated
        })
    }

    // const regex = /\*\*(.*?)\*\*/g
    //expression to evaluate

    // Pourquoi ne pas mettre ça dans le module maths directement ?
    const regex = /#\{(.*?)\}/g
    const replacement = (matched, p1) => {
      const e = math(p1)
      return e.string === 'Error' ? 'Error' : `${math(p1).eval().latex}`
    }
    expression = expression.replace(regex, replacement)

    if (solution) {
      solution = solution.replace(regex, replacement)
    } else {
      solution = math(expression).eval().latex
    }

  } while (expressions && expressions.includes(expression))

  let tempQuestion = {
    ...question,
    solution,
    expression,
  }

  tempQuestion.points = tempQuestion.points || 1
  // console.log('newCard', tempCard)

  return tempQuestion
}
