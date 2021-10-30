import { math } from 'tinycas/build/math/math'
import emptyQuestion from './emptyQuestion'
import { lexicoSort } from '../../app/utils'
import questions from './questions'



export default function generateQuestion(question, generateds) {
  // firestore returns objects with read-only properties
  let expression
  let expression2
  let solutions
  let variables
  let details
  let choices
  let i
  let enounce
  let conditions
  let letters
  let correction
  let testAnswer

  const { options = [] } = question

  const generatedExpressions = generateds ? generateds.map((g) => g.expression) : []
  const generatedEnounces = generateds ? generateds.map((g) => g.enounce) : []
  const generatedChoices = generateds ? generateds.map((g) => g.choices) : []
  const regexExact = /#\{(.*?)\}/g
  const regexExactSigned = /#s\{(.*?)\}/g
  const regexDecimal = /##\{(.*?)\}/g
  const regexExactLatex = /%\{(.*?)\}/g
  const regexDecimalLatex = /%%\{(.*?)\}/g

  const replacementExactSigned = (matched, p1) => {
    let e = math(p1)
    if (e.string === 'Error') {
      console.log('matched', matched)
      console.log('p1', p1)
      console.log('****ERROR ', e)
      return 'Error2'
    }
    e = e.eval()
    if (!e.isOpposite()) {
      e = e.positive()
    }
    return e.toString({ implicit: true })
  }

  const replacementExact = (matched, p1) => {
    const e = math(p1)
    if (e.string === 'Error') {
      console.log('matched', matched)
      console.log('p1', p1)
      console.log('****ERROR ', e)
    }
    return e.string === 'Error' ? 'Error2' : math(p1).eval().toString({ implicit: true })
  }

  const replacementExactLatex = (matched, p1) => {
    const e = math(p1)
    return e.string === 'Error' ? 'Error2' : math(p1).eval().toLatex({ implicit: true })
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
  const n = Math.max(question.choices && question.choices.length || 0,
    question.expressions && question.expressions.length || 0,
    question.enounces && question.enounces.length || 0,
    question.variables && question.variables.length || 0)

  do {
    count++
    doItAgain = false

    // first select an expression
    i = Math.floor(n * Math.random())

    if (question.expressions) {
      expression = question.expressions[question.expressions.length === 1 ? 0 : i]
    }

    if (question.enounces) {
      enounce = question.enounces[question.enounces.length === 1 ? 0 : i]
    }

    if (question.choices) {
      choices = question.choices[question.choices.length === 1 ? 0 : i]
    }

    // generate variables which can depend on precedent ones
    if (question.variables) {
      variables = {
        ...question.variables[question.variables.length === 1 ? 0 : i],
      }

      Object.getOwnPropertyNames(variables)
        .sort(lexicoSort)
        .forEach((name, i) => {

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
        if (expression) {
          expression = expression.replace(regex, variables[name])
        }
        if (enounce) {
          enounce = enounce.replace(regex, variables[name])
        }
        if (choices) {

          choices = choices.map(c => c.replace(regex, variables[name]))
        }
      })

      if (expression) {
        expression = expression.replace(regexDecimal, replacementDecimal)
        expression = expression.replace(regexExactSigned, replacementExactSigned)
        expression = expression.replace(regexExact, replacementExact)
        if (options.includes('remove-null-terms')) {
          expression = math(expression).removeNullTerms().string
        }

        if (options.includes('shuffle-terms-and-factors')) {
          expression = math(expression).shuffleTermsAndFactors().string
        }
        else if (options.includes('shuffle-terms')) {
          expression = math(expression).shuffleTerms().string
        }
        else if (options.includes('shuffle-factors')) {
          expression = math(expression).shuffleFactors().string
        }
        else if (options.includes('shallow-shuffle-terms')) {
          expression = math(expression).shallowShuffleTerms().string
        }
        else if (options.includes('shallow-shuffle-factors')) {
          expression = math(expression).shallowShuffleFactors().string
        }
      }

      if (enounce) {
        enounce = enounce.replace(regexDecimal, replacementDecimal)
        enounce = enounce.replace(regexExactSigned, replacementExactSigned)
        enounce = enounce.replace(regexExact, replacementExact)
        enounce = enounce.replace(regexDecimalLatex, replacementDecimalLatex)
        enounce = enounce.replace(regexExactLatex, replacementExactLatex)
      }

      if (choices) {
        choices = choices.map(c => c.replace(regexDecimal, replacementDecimal))
        choices = choices.map(c => c.replace(regexExactSigned, replacementExactSigned))
        choices = choices.map(c => c.replace(regexExact, replacementExact))
        choices = choices.map(c => c.replace(regexDecimalLatex, replacementDecimalLatex))
        choices = choices.map(c => c.replace(regexExactLatex, replacementExactLatex))
      }

      if (expression) {
        doItAgain = generatedExpressions.includes(expression)
      }
      else if (choices) {
        doItAgain = generatedEnounces.includes(enounce) &&
          generatedChoices.some(gcs => JSON.stringify(choices) == JSON.stringify(gcs))
      }
      else {
        doItAgain = generatedEnounces.includes(enounce)
      }

      if (!doItAgain && question.conditions) {
        let tests =
          question.conditions[question.conditions.length === 1 ? 0 : i].split('&&')
        tests.forEach(test => {
          Object.getOwnPropertyNames(variables).forEach((name) => {
            const regex = new RegExp(name, 'g')
            test = test.replace(regex, variables[name])
          })

          if (math(test).eval().string === 'false') {
            doItAgain = true
          }
        })
      }
    }
  } while (doItAgain && count < 1000)

  if (count >= 1000) {
    throw new Error('limit max')
  }

  if (question.solutions) {

    solutions = question.solutions[question.solutions.length === 1 ? 0 : i]
    solutions = solutions.map((solution) => {
      if (typeof solution === 'string') {
        let regex
        if (question.variables) {
          Object.getOwnPropertyNames(variables).forEach((name) => {
            regex = new RegExp(name, 'g')
            solution = solution.replace(regex, variables[name])
          })
          solution = solution.replace(regexDecimal, replacementDecimal)
          solution = solution.replace(regexExactSigned, replacementExactSigned)
          solution = solution.replace(regexExact, replacementExact)
        }

        regex = /(.*)\?\?(.*)::(.*)/
        const found = solution.match(regex)
        if (found) {
          const test = math(found[1]).eval()
          const success = math(found[2]).eval().value.toNumber()
          const failure = math(found[3]).eval().value.toNumber()
          solution = test.isTrue() ? success : failure
        }

      }
      // if (question.type === 'choice' && typeof solution === 'number') {
      //   solution = choices[solution]
      // }
      return solution
    })

  }
  // Il faut évaluer l'expression
  else if (expression) {
    let params = { decimal: question['result-type'] === 'decimal' }

    // 
    if (question.letters) {
      letters = question.letters[question.letters.length === 1 ? 0 : i]


      Object.getOwnPropertyNames(letters).forEach((letter) => {
        if (letter.startsWith('&')) {
          const value = letters[letter]
          letters[variables[letter]] = value.startsWith('&')
            ? variables[value]
            : value
        } else if (letters[letter].startsWith('&')) {
          letters[letter] = variables[letters[letter]]
        }
      })

      params = { ...params, ...letters }
    }

    solutions = [math(expression).eval(params).removeMultOperator().removeFactorsOne().string]
  }

  if (question.details) {
    details = question.details[question.details.length === 1 ? 0 : i]

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


      const regex = /^(.*)\?\?/
      const found = d.match(regex)

      if (found) {

        const tests = found[1].split('&&')

        if (tests.every((t) => math(t).eval().string === 'true')) {

          d = d.replace(found[0], '')
          acc.push(d)
        }
      } else {
        acc.push(d)
      }
      return acc
    }, [])
  }

  if (question.expressions2) {

    expression2 = question.expressions2[question.expressions2.length === 1 ? 0 : i]

    Object.getOwnPropertyNames(variables).forEach((name) => {
      const regex = new RegExp(name, 'g')

      expression2 = expression2.replace(regex, variables[name])
    })
    expression2 = expression2.replace(regexDecimalLatex, replacementDecimalLatex)
    expression2 = expression2.replace(regexDecimal, replacementDecimal)
    expression2 = expression2.replace(regexExactLatex, replacementExactLatex)
    expression2 = expression2.replace(regexExact, replacementExact)
  }


  // TODO : enlever doublon avec correctionFormat
  if (question.corrections) {
    correction = question.corrections[question.corrections.length === 1 ? 0 : i]
    Object.getOwnPropertyNames(variables).forEach((name) => {
      const regex = new RegExp(name, 'g')

      correction = correction.replace(regex, variables[name])
    })
    correction = correction.replace(regexDecimalLatex, replacementDecimalLatex)
    correction = correction.replace(regexDecimal, replacementDecimal)
    correction = correction.replace(regexExactLatex, replacementExactLatex)
    correction = correction.replace(regexExact, replacementExact)
  }

  if (question.testAnswer) {
    testAnswer = question.testAnswer[question.testAnswer.length === 1 ? 0 : i]
    Object.getOwnPropertyNames(variables).forEach((name) => {
      const regex = new RegExp(name, 'g')

      testAnswer = testAnswer.replace(regex, variables[name])
    })
    testAnswer = testAnswer.replace(regexDecimalLatex, replacementDecimalLatex)
    testAnswer = testAnswer.replace(regexDecimal, replacementDecimal)
    testAnswer = testAnswer.replace(regexExactLatex, replacementExactLatex)
    testAnswer = testAnswer.replace(regexExact, replacementExact)
  }

  let expression_latex
  if (expression) {
    expression_latex = math(expression).toLatex({
      addSpaces: !(question.options && question.options.includes('exp-no-spaces')),
      keepUnecessaryZeros: question.options && question.options.includes('exp-allow-unecessary-zeros')

    })
  }

  let correctionFormat
  if (question.correctionFormat) {
    correctionFormat = question.correctionFormat[question.correctionFormat.length === 1 ? 0 : i]
    console.log('correctionFormat', correctionFormat)
    let { correct, uncorrect, answer } = correctionFormat

    correct = correct.map(format => {
      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')
        format = format.replace(regex, variables[name])
      })
      return format
    })

    correct = correct.map(format => format.replace(regexDecimalLatex, replacementDecimalLatex))
    correct = correct.map(format => format.replace(regexDecimal, replacementDecimal))
    correct = correct.map(format => format.replace(regexExactLatex, replacementExactLatex))
    correct = correct.map(format => format.replace(regexExact, replacementExact))

    uncorrect = uncorrect.map(format => {
      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')
        format = format.replace(regex, variables[name])
      })
      return format
    })

    uncorrect = uncorrect.map(format => format.replace(regexDecimalLatex, replacementDecimalLatex))
    uncorrect = uncorrect.map(format => format.replace(regexDecimal, replacementDecimal))
    uncorrect = uncorrect.map(format => format.replace(regexExactLatex, replacementExactLatex))
    uncorrect = uncorrect.map(format => format.replace(regexExact, replacementExact))


    Object.getOwnPropertyNames(variables).forEach((name) => {
      const regex = new RegExp(name, 'g')
      answer = answer.replace(regex, variables[name])
    })


    answer = answer.replace(regexDecimalLatex, replacementDecimalLatex)
    answer = answer.replace(regexDecimal, replacementDecimal)
    answer = answer.replace(regexExactLatex, replacementExactLatex)
    answer = answer.replace(regexExact, replacementExact)


    correctionFormat = { correct, uncorrect, answer }
  }


  const generated = {
    points: 1,
    ...question,
    solutions,
    expression,
    expression_latex,
    choices
  }


  if (details) generated.details = details
  if (enounce) generated.enounce = enounce
  if (correction) generated.correction = correction
  if (correctionFormat) generated.correctionFormat = correctionFormat
  if (expression2) generated.expression2 = expression2
  if (testAnswer) generated.testAnswer = testAnswer


  return generated
}
