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
  let enounce
  let conditions

  const expressions = generateds ? generateds.map((g) => g.expression) : []
  const regexExact = /#\{(.*?)\}/g
  const regexDecimal = /##\{(.*?)\}/g
  const regexExactLatex = /%\{(.*?)\}/g
  const regexDecimalLatex = /%%\{(.*?)\}/g

  const replacementExact = (matched, p1) => {
    const e = math(p1)
    if (e.string === 'Error') {
      console.log('matched', matched)
      console.log('p1', p1)
      console.log('****ERROR ', e)
    }
    return e.string === 'Error' ? 'Error2' : math(p1).eval().string
  }

  const replacementExactLatex = (matched, p1) => {
    const e = math(p1)
    return e.string === 'Error' ? 'Error2' : math(p1).eval().latex
  }

  const replacementDecimal = (matched, p1) => {
    const e = math(p1)
    return e.string === 'Error'
      ? 'Error2'
      : math(p1).eval({ decimal: true }).string
  }

  const replacementDecimalLatex = (matched, p1) => {
    const e = math(p1)
    return e.string === 'Error'
      ? 'Error2'
      : math(p1).eval({ decimal: true }).latex
  }

  if (!question) return emptyQuestion

  let count = 0
  let doItAgain = false

  do {
    count++
    doItAgain = false
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
          // console.log("\n\n\nVariable",name,variables[name])

          // replace the precedent variables by their generated value
          for (let j = 1; j < i + 1; j++) {
            const precedentName = `&${j}`
            const regex = new RegExp(precedentName, 'g')
            generated = generated.replace(regex, variables[precedentName])
            // console.log("generated", generated)
          }
          generated = math(generated).generate().string
          variables[name] = generated
          // console.log("generated", generated)
        })

      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')
        expression = expression.replace(regex, variables[name])
      })

      expression = expression.replace(regexDecimal, replacementDecimal)
      expression = expression.replace(regexExact, replacementExact)
      doItAgain = expressions.includes(expression)

      if (!doItAgain && question.conditions) {
        let condition =
          question.conditions[question.conditions.length === 1 ? 0 : choice]
        console.log('condition', condition)
        Object.getOwnPropertyNames(variables).forEach((name) => {
          const regex = new RegExp(name, 'g')
          condition = condition.replace(regex, variables[name])
        })

        if (math(condition).eval().string === 'false') {
          doItAgain = true
        }
      }
    }
  } while (doItAgain && count < 1000)

  if (count >= 1000) {
    throw new Error('limit max')
  }

  if (question.solutions) {
    solutions = question.solutions[question.solutions.length === 1 ? 0 : choice]
    solutions = solutions.map((solution) => {
      if (question.variables) {
        Object.getOwnPropertyNames(variables).forEach((name) => {
          const regex = new RegExp(name, 'g')
          solution = solution.replace(regex, variables[name])
        })
        solution = solution.replace(regexDecimal, replacementDecimal)
        solution = solution.replace(regexExact, replacementExact)
        return solution
      }
    })
  } else {
    // console.log('eval', expression, math(expression).eval().latex)

    solutions = [
      math(expression).eval({ decimal: question['result-type'] === 'decimal' })
        .string,
    ]
  }

  if (question.details) {
    details = question.details[question.details.length === 1 ? 0 : choice]

    details = details.map((c) => {
      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')

        c = c.replace(regex, variables[name])
      })

      c = c.replace(regexDecimalLatex, replacementDecimalLatex)
      c = c.replace(regexDecimal, replacementDecimal)
      c = c.replace(regexExactLatex, replacementExactLatex)
      c = c.replace(regexExact, replacementExact)
      return c
    })

    details = details.reduce((acc, d) => {
      // console.log('d', d)
      // console.log('acc', acc)

      const regex = /^(.*)\?\?/
      const found = d.match(regex)

      if (found) {
        //  console.log('found', found)
        const tests = found[1].split('&&')
        console.log('tests', tests)
        if (tests.every((t) => math(t).eval().string === 'true')) {
          // console.log('tests ok, replace ', d, ' with ', d.replace(found[0], ''))
          d = d.replace(found[0], '')
          acc.push(d)
        }
      } else {
        acc.push(d)
      }
      return acc
    }, [])
  }

  if (question.enounces) {
    enounce = question.enounces[question.enounces.length === 1 ? 0 : choice]
    Object.getOwnPropertyNames(variables).forEach((name) => {
      const regex = new RegExp(name, 'g')

      enounce = enounce.replace(regex, variables[name])
    })
    enounce = enounce.replace(regexDecimalLatex, replacementDecimalLatex)
    enounce = enounce.replace(regexDecimal, replacementDecimal)
    enounce = enounce.replace(regexExactLatex, replacementExactLatex)
    enounce = enounce.replace(regexExact, replacementExact)
  }

  return {
    points: 1,
    ...question,
    solutions,
    expression,
    details,
    enounce,
  }
}
