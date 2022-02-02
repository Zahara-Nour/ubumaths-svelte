import { math } from 'tinycas/build/math/math'
import emptyQuestion from './emptyQuestion'
import { getLogger, lexicoSort, shuffle } from '../../app/utils'
import questions from './questions'
import { fetchImage } from './images'

let { fail, warn, info } = getLogger('generateQuestion', 'info')

export default function generateQuestion(question, generateds = [], nbquestions = 1) {

  
  // firestore returns objects with read-only properties

  let expression
  let expression2
  let solutions
  let variables
  let details
  let correctionDetails
  let choices
  let i
  let enounce
  let letters
  let correction
  let testAnswer
  let image
  let imageCorrection
 

  const { options = [] } = question


  // les questions de la série déjà générées
  const generatedExpressions = generateds ? generateds.map((g) => g.expression) : []
  const generatedEnounces = generateds ? generateds.map((g) => g.enounce) : []
  const generatedChoices = generateds ? generateds.map((g) => g.choices) : []
  const generatedImages = generateds ? generateds.map((g) => g.image) : []


  // les regex correpondant aux expressions à évaluer
  // #{} : évaluation exacte
  const regexExact = /#\{(.*?)\}/g
  // #s{} : évaluation exacte avec le signe rajouté devant (+  ou -)
  const regexExactSigned = /#s\{(.*?)\}/g
  // ##{}: évaluation décimale
  const regexDecimal = /##\{(.*?)\}/g
  // %{} : évaluation exacte mise sous format LaTeX
  const regexExactLatex = /%\{(.*?)\}/g
  // %%{} : évaluation exacte mise sous format LaTeX
  const regexDecimalLatex = /%%\{(.*?)\}/g

  // Fonction de remplacement associées
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

  function replaceVariablesAndExpressionsToBeEvaluated(o) {


    function replace(s) {
      let result = s
      if (variables) {
        Object.getOwnPropertyNames(variables).forEach((name) => {
          const regex = new RegExp(name, 'g')
          result = result.replace(regex, variables[name])
        })
      }
  
      // on évalue les #...{}
      result = result.replace(regexDecimalLatex, replacementDecimalLatex)
      result = result.replace(regexDecimal, replacementDecimal)
      result = result.replace(regexExactSigned, replacementExactSigned)
      result = result.replace(regexExactLatex, replacementExactLatex)
      result = result.replace(regexExact, replacementExact)
  
      return result
    }
  
    return Array.isArray(o)
      ? o = o.map(s => replace(s))
      : replace(o)
  }
  
  function getSelectedElement(field) {
    const length = question[field].length
    return question[field][length === 1 ? 0 : i]
  }

  if (!question) return emptyQuestion

  question.num = question.num ? question.num + 1 : 1
  let count = 0
  let repeat = false
  // sur combien d'éléments peut-onchour une question
  const n = Math.max(question.choices && question.choices.length || 0,
    question.expressions && question.expressions.length || 0,
    question.expressions2 && question.expressions2.length || 0,
    question.enounces && question.enounces.length || 0,
    question.variables && question.variables.length || 0,
    question.images && question.images.length || 0
  )

   // les limites permettent que les différentes expressions possibles pour la question
    // soient générées à peu près dans la même proportion
    // les limites sont mises à jours à chaque nouvelle génération, dans l'objet initial
  if (!question.limits) {

   
    question.limits = { limits: [] }
    let nbuniques = 0
    for (let i = 0; i < n; i++) {

      question.limits.limits[i] = {}
      question.limits.limits[i].count = 0
      // dans certaines questions, il n'y a pas d'aléatoirisation
      // on fixe la limite à 1

      // const e = question.expressions[i] || ''
      // console.log('e', e)
      // if (!(e.includes('$e') || e.includes('$d') || e.includes('$l') || e.includes('&'))) {
      //   console.log('unique')
      //   nbuniques += 1
      //   question.limits.limits[i].limit = 1
      // }
      if (question.options && question.options.includes('exhaust')) {
        nbuniques += 1
        question.limits.limits[i].limit = 1
      }
      

    }
    question.limits.nbuniques = nbuniques
    // const nbrandoms = question.expressions.length - nbuniques
    const nbrandoms = n - nbuniques
    question.limits.nbrandoms = nbrandoms
  }

  
  if (question.limits) {
  
    question.limits.nbmax = 0
    question.limits.reached = 0

    // recherche des expressions qui ont déjà été utilisées
    // un nombre maximum de fois (à part celles qui sont uniques)
    for (let i = 0; i < n; i++) {

      if (question.limits.limits[i].limit
        && question.limits.limits[i].limit !== 1
        && question.limits.limits[i].limit === question.limits.limits[i].count) {
        question.limits.nbmax += 1
        question.limits.reached += question.limits.limits[i].limit
      }
    }
    // on met à jour les limites des expressions aléatoires
    for (let i = 0; i < n; i++) {
      // si l'initialisation n'a pas été encore faire
      if (!question.limits.limits[i].limit) {

        question.limits.limits[i].limit = Math
          .ceil((1 / question.limits.nbrandoms) * nbquestions)
      }
      // sinon on doit mettre à jour en prenant en compte les expressions qui 
      // ont pu atteindre leur maximum
      else if (question.limits.limits[i].limit !== 1
        && question.limits.limits[i].limit !== question.limits.limits[i].count) {

        const limit = Math
          .ceil(1 / (question.limits.nbrandoms - question.limits.nbmax)
            * (nbquestions - question.limits.nbuniques - question.limits.reached)
          )
        question.limits.limits[i].limit = limit
      }
    }
    
  }
  console.log('limits', JSON.parse(JSON.stringify(question.limits.limits)))

  do {
    count++
    repeat = false

    // first select an expression
    if (question.limits) {
      let count2 = 0
      do {
        i = Math.floor(n * Math.random())
        count2 += 1
      } while (question.limits.limits[i].count >= question.limits.limits[i].limit
        && count2 < 1000)
      if (count2 >= 1000) warn('fail to chose an expression', count2)

      question.limits.limits[i].count += 1
      
    } else {
      i = Math.floor(n * Math.random())
    }
    if (question.images) {
      image = getSelectedElement("images")
    }

    if (question.expressions) {
      expression = getSelectedElement("expressions")
    }

    if (question.enounces) {
      enounce = getSelectedElement("enounces")
    }

    if (question.choices) {
      choices = getSelectedElement("choices").map(choice => ({ ...choice }))
    }

    // generate variables which can depend on precedent ones
    if (question.variables) {
      variables = {
        ...getSelectedElement("variables")
      }

      // génération de la table des variables
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

          generated = generated.replace(regexDecimal, replacementDecimal)
          generated = generated.replace(regexExact, replacementExact)

          // on génère les valeurs aléatoires
          generated = math(generated).generate().string
          variables[name] = generated
        })

      // on remplace dans expression, enounce et choices
      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')
        if (expression) {
          expression = expression.replace(regex, variables[name])
        }
        if (enounce) {
          enounce = enounce.replace(regex, variables[name])
        }
        if (choices) {

          choices = choices.map(c => {
            if (c.text) {
              c.text = c.text.replace(regex, variables[name])
            }
            return c
          })
        }
      })


      if (expression) {
        expression = expression.replace(regexDecimal, replacementDecimal)
        expression = expression.replace(regexExactSigned, replacementExactSigned)
        expression = expression.replace(regexExact, replacementExact)
        if (options.includes('remove-null-terms')) {
          expression = math(expression).removeNullTerms().string
          console.log(expression)
        }

        if (options.includes('shuffle-terms-and-factors')) {
          expression = math(expression).shuffleTermsAndFactors().string
        }
        else if (options.includes('shuffle-terms')) {
          expression = math(expression).shuffleTerms().string
          console.log(expression)
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

        // TODO: ce ne doit plus être utile maintenant que j'ai rajouté la syntaxe {} dans tinycas
        if (options.includes('exp-remove-unecessary-brackets')) {
          expression = math(expression).removeUnecessaryBrackets().string
          console.log(expression)
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
        choices = choices.map(c => {
          if (c.text) {
            c.text = c.text.replace(regexDecimal, replacementDecimal)
            c.text = c.text.replace(regexExactSigned, replacementExactSigned)
            c.text = c.text.replace(regexExact, replacementExact)
            c.text = c.text.replace(regexDecimalLatex, replacementDecimalLatex)
            c.text = c.text.replace(regexExactLatex, replacementExactLatex)
          }
          return c
        })
      }
    }
    if (expression && enounce && choices) {
      repeat = generateds.some(g => g.enounce === enounce
        && JSON.stringify(g.choices) === JSON.stringify(choices)
        && g.expression === expression)
      if (repeat) warn('même énoncé ET choix ET image', enounce, JSON.stringify(choices), expression)

    }

    else if (image && enounce && choices) {
      repeat = generateds.some(g => g.enounce === enounce
        && JSON.stringify(g.choices) === JSON.stringify(choices)
        && g.image === image)
      if (repeat) warn('même énoncé ET choix ET image', enounce, JSON.stringify(choices), image)

    }

    else if (expression && enounce) {
      repeat = generateds.some(g => g.expression === expression && g.enounce === enounce)
      if (repeat) warn('même énoncé ET expression: ', enounce, expression)
    }

    else if (enounce && choices) {
      repeat = generateds.some(g => g.enounce === enounce
        && JSON.stringify(g.choices) === JSON.stringify(choices))
      if (repeat) warn('même énoncé ET choix ', enounce, JSON.stringify(choices))

    }

    else if (enounce && image) {
      repeat = generateds.some(g => g.enounce === enounce
        && g.image === image)
      if (repeat) warn('même énoncé ET image', enounce, image)

    }

    else if (expression && !options.includes('allow-same-expression')) {

      repeat = generatedExpressions.includes(expression)
      if (repeat) warn('même image expression', expression)
    }

    else if (enounce && !options.includes('allow-same-enounce')) {
      repeat = generatedEnounces.includes(enounce)
      if (repeat) warn('même énoncé', enounce)
    }

    else if (image) {
      console.log('includes generated?', image, generatedImages, generatedImages.includes(image))
      const test = generatedImages.includes(image)
      if (test) warn('même image pour la question', image)
      repeat = repeat || test

    }

    if (!repeat && question.conditions) {
      let tests = question.conditions[question.conditions.length === 1 ? 0 : i]

      Object.getOwnPropertyNames(variables).forEach((name) => {
        const regex = new RegExp(name, 'g')
        tests = tests.replace(regex, variables[name])
      })
      tests = tests.replace(regexExact, replacementExact)

      if (tests.includes('||')) {
        tests = tests.split('||')
        repeat = !tests.some(test => math(test).eval().string === 'true')
      } else {
        tests = tests.split('||')
        repeat = !tests.every(test => math(test).eval().string === 'true')
      }
      if (repeat) warn('tests non passé', tests)
    }

  } while (repeat && count < 100)

  if (count >= 100) {
    warn("can't generate a different question from others")
  }

  console.log('limits', JSON.parse(JSON.stringify(question.limits.limits)))

  if (question.solutions) {
    solutions = getSelectedElement("solutions")
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

    if (question.letters) {
      letters = getSelectedElement('letters')

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

    // TODO : i lfaut surement purifier encore plus la solution, quoique c'est surement fait plus tard
    solutions = [math(expression).eval(params).removeMultOperator().removeFactorsOne().string]

  }

  if (choices) {

    choices = choices.map(c => {
      if (c.image) {
        c.imageBase64P = fetchImage(c.image)
        c.imageBase64P.then(base64 => { c.imageBase64 = base64 })
      }
      return c
    })

    // mélange des choix
    if (!options.includes('no-shuffle-choices')) {

      const a = []
      for (let i = 0; i < choices.length; i++) {
        a[i] = i
      }
      // les indices mélangés
      shuffle(a)

      choices = choices.map((_, i) => choices[a[i]])
      solutions = solutions.map((solution) => {
        if (typeof solution === 'number') {
          // il faut retrouver le nouvel index de la solution
          const new_solution = a.indexOf(solution)
          return new_solution
        }
        else {
          return solution
        }
      })

    }
  }


  if (question.imagesCorrection) {
    imageCorrection = getSelectedElement('imagesCorrection')
  }

  if (question.correctionDetails) {
    correctionDetails = getSelectedElement('correctionDetails')
    console.log('variables', variables)
    correctionDetails = correctionDetails.map(details => {
      const d = {...details}
      if (d.text) {
        d.text= replaceVariablesAndExpressionsToBeEvaluated(d.text)
      }
      return d
    })
    console.log('correctionDetails', correctionDetails)
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

    expression2 = getSelectedElement('expressions2')
    expression2 = replaceVariablesAndExpressionsToBeEvaluated(expression2)
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
    testAnswer = getSelectedElement('testAnswer')
    testAnswer = replaceVariablesAndExpressionsToBeEvaluated(testAnswer)
  }

  let expression_latex
  if (expression) {
    expression_latex = math(expression).toLatex({
      addSpaces: !(question.options && question.options.includes('exp-no-spaces')),
      keepUnecessaryZeros: question.options && question.options.includes('exp-allow-unecessary-zeros')
    })
  }
  let expression2_latex
  if (expression2) {
    expression2_latex = math(expression2).toLatex({
      addSpaces: !(question.options && question.options.includes('exp-no-spaces')),
      keepUnecessaryZeros: question.options && question.options.includes('exp-allow-unecessary-zeros')
    })
  }

  let correctionFormat
  if (question.correctionFormat) {
    correctionFormat = getSelectedElement('correctionFormat') 
    let { correct, uncorrect, answer } = correctionFormat
    correct = replaceVariablesAndExpressionsToBeEvaluated(correct)
    uncorrect = replaceVariablesAndExpressionsToBeEvaluated(uncorrect)
    answer = replaceVariablesAndExpressionsToBeEvaluated(answer)
  
    correctionFormat = { correct, uncorrect, answer }
  }


  const generated = {
    points: 1,
    ...question,
    solutions,
    expression,
    expression_latex,
    expression2_latex,
    choices
  }


  if (details) generated.details = details
  if (enounce) generated.enounce = enounce
  if (correction) generated.correction = correction
  if (correctionFormat) generated.correctionFormat = correctionFormat
  if (correctionDetails) generated.correctionDetails = correctionDetails
  if (expression2) generated.expression2 = expression2
  if (testAnswer) generated.testAnswer = testAnswer
  if (image) {
    generated.image = image
    generated.imageBase64P = fetchImage(image)
  }
  if (imageCorrection) {
    generated.imageCorrection = imageCorrection
    generated.imageCorrectionBase64 = fetchImage(imageCorrection)
  }

  generated.order_elements = question.order_elements || ['enounce', 'enounce-image', 'expression']

  return generated
}


// o est une chaine ou un tableau
