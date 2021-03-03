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
  const expressions = generateds ? generateds.map((g) => g.expression) : null
  const regexExact = /#\{(.*?)\}/g
  const regexDecimal = /##\{(.*?)\}/g
  const regexExactLatex = /%\{(.*?)\}/g
  const regexDecimalLatex = /%%\{(.*?)\}/g

  const replacementExact = (matched, p1) => {
    
    const e = math(p1)  
    return e.string === 'Error' ? 'Error2' : math(p1).eval().string
  }

  const replacementExactLatex = (matched, p1) => {
    
    const e = math(p1)    
    return e.string === 'Error' ? 'Error2' : math(p1).eval().latex
  }

  const replacementDecimal = (matched, p1) => {
    
    const e = math(p1)
    return e.string === 'Error' ? 'Error2' : math(p1).eval({decimal:true}).string
  }

  const replacementDecimalLatex = (matched, p1) => {
    
    const e = math(p1)
    return e.string === 'Error' ? 'Error2' : math(p1).eval({decimal:true}).latex
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

    expression = expression.replace(regexDecimal, replacementDecimal)
    expression = expression.replace(regexExact, replacementExact)
   
  } while (expressions && expressions.includes(expression))

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
    console.log('eval', expression, math(expression).eval().latex)
    
    solutions = [math(expression).eval({decimal:question["result-type"]==='decimal'}).string]
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
  }

  if (question.enounce) {
    enounce = question.enounce

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
