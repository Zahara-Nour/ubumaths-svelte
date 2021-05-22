<script>
  import { math } from 'tinycas/build/math/math'
  import { ListItem, Icon, Button } from 'svelte-materialify/src'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount, afterUpdate } from 'svelte'

  import { mdiCheckCircle } from '@mdi/js'
  import { mdiCloseCircle } from '@mdi/js'
  import { fontSize } from '../../app/stores'

  export let item
  export let addPoints
  export let details
  const number = item.number
  const options = item.options
  const implicit = options && options.includes('implicit')
  // l'expression de départ doit être envoyé en latex également
  const qexp = item.qexp
  const qexp_latex = item.qexp_latex
  const correction_latex = item.correction
  // less solutions doivent être envoyées en Latex
  const solutions = item.solutions
  const solutions_latex = item.solutions.map((solution) => {
    if (item.type === 'choice') {
      return solution // Ce n'est pas du latex !
    } else {
      const e = math(solution)
      return e.type === '!! Error !!' ? solution : e.toLatex({ implicit })
    }
  })

  const details_latex = item.details // details are in latex form
  const answer = item.answer
  const answer_latex = item.answer_latex
  const empty = !item.answer
  const badExpression =
    item.type !== 'choice' && math(answer).type === '!! Error !!'
  const seemsCorrect = // réponse équivalente à la solution mais la forme n'est peut être pas satisfaisante
    item.type !== 'choice' &&
    !empty &&
    !badExpression &&
    item.solutions.some((solution) => math(answer).equals(math(solution)))

  let correct = false

  const validateSpaces = checkSpaces()
  const validateBrackets = checkBrackets()
  const validateZeros = checkZeros()
  const validateSigns = checkSigns()
  const validateOrder = checkOrder()
  const validateAnswer = checkAnswer()

  if (item.type === 'choice') {
    correct = item.solutions.includes(item.answer_choice)
  } else {
    correct =
      seemsCorrect &&
      validateZeros &&
      validateBrackets &&
      validateSigns &&
      validateOrder &&
      validateSpaces &&
      validateAnswer
  }
  // const strictlyCorrect =
  //   !badExpression &&
  //   solutions_latex.some((e) => e.strictlyEquals(answer_latex))
  let coms = []

  const correction = createCorrection(false)
  const detailedCorrection = item.details ? createCorrection(true) : null

  // console.log('badExpressio', badExpression)
  // console.log('correct', correct)
  // console.log('empty', empty)
  // console.log('validateSpaces', validateSpaces)

  const EMPTY_ANSWER = "Tu n'as rien répondu."
  const ZEROS = 'Ta réponse contient des des zéros inutiles.'
  const BRACKETS = 'Ton expression contient des parenthèses inutiles.'
  const SPACES = 'Les chiffres sont mal espacés.'
  const SIGNS = 'Tu peux faire des simplifications de signes.'
  const BAD = "Ton expression n'est pas mathématiquement correcte."
  const FORM = "<span class='orange-text'>Ta réponse</span> n'est pas écrite sous la forme demandée."

  if (empty) {
    coms.push(EMPTY_ANSWER)
  }

  if (!empty && badExpression) {
    coms.push(BAD)
  }

  if (seemsCorrect && !validateSpaces) {
    coms.push(SPACES)
  }

  if (seemsCorrect && !validateZeros) {
    coms.push(ZEROS)
  }

  if (seemsCorrect && !validateBrackets) {
    coms.push(BRACKETS)
  }

  if (seemsCorrect && !validateAnswer) {
    coms.push(FORM)
  }

  onMount(() => {
    Mathlive.renderMathInElement(`correction${number}`)

    if (correct) addPoints(item.points)
  })

  function checkAnswer() {
    let e = math(answer)
  
    let sols = solutions.map((solution) => math(solution))

    if (!(options && options.includes('answer-disallow-removing-null-terms'))) {
      e = e.removeNullTerms()
      sols = sols.map((solution) => solution.removeNullTerms())
    }

    if (
      !(options && options.includes('answer-disallow-removing-factors-one'))
    ) {
      e = e.removeFactorsOne()
      sols = sols.map((solution) => solution.removeFactorsOne())
    }

    // if (options && options.includes('answer-allow-unecessary-brackets')) {
    // le test des parenthèses a été fait avant, on les enlève pour comparer à la solution
    e = e.removeUnecessaryBrackets()
    sols = sols.map((solution) => solution.removeUnecessaryBrackets())
    // }

    if (
      !(
        options &&
        options.includes('answer-disallow-terms-and-factors-permutation')
      )
    ) {
      e = e.sortTermsAndFactors()
      sols = sols.map((solution) => solution.sortTermsAndFactors())
    }
   
    return sols.some((sol) => sol.strictlyEquals(e))
  }

  function checkBrackets() {
    if (
      !empty &&
      !(options && options.includes('answer-allow-unecessary-brackets'))
    ) {
      const e = math(answer)
      return e.removeUnecessaryBrackets().string === e.string
    }
    return true
  }

  function checkSigns() {
    return true
  }

  // retourne true si la vérification est OK
  function checkSpaces() {
    //  TODO: a Remplacer par searchMisplacedSpaces
    if (!empty && options && options.includes('answer-require-spaces')) {
      const a = answer_latex.replace(/\\,/g, ' ').replace(',', '.').trim()
      console.log(`a = "${a}"`)
      const regex = /\d+[\d\s]*(\.[\d\s]*\d+)?/g
      const matches = a.match(regex)

      if (matches) {
        const regexsInt = [
          /\d{4}/,
          /\s$/,
          /\s\d{2}$/,
          /\s\d{2}\s/,
          /\s\d$/,
          /\s\d\s/,
        ]

        const regexsDec = [
          /\d{4}/,
          /^\s/,
          /^\d{2}\s/,
          /\s\d{2}\s/,
          /^\d\s/,
          /\s\d\s/,
        ]
        return !matches.some((match) => {
          let [int, dec] = match.split('.')

          return (
            regexsInt.some((regex) => int.match(regex)) ||
            (dec && regexsDec.some((regex) => dec.match(regex)))
          )
        })
      }
    }
    return true
  }

  function checkOrder() {
    return true
  }

  // retourne true si la vérification est OK
  function checkZeros() {
    if (
      !empty &&
      !(options && options.includes('answer-allow-unecessary-zeros'))
    ) {
      console.log('check zeros')
      return !math(answer).searchUnecessaryZeros()
    }
    return true
  }

  function createCorrection(details) {
    let line
    let lines = []

    switch (item.type) {
      case 'result':
      case 'rewrite': {
        if (details) {
        } else {
          // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'
          line = `$$\\begin{align*}  ${qexp_latex}`
          if (empty) {
            line +=
              `=\\textcolor{green}{${solutions_latex[0]}}` + '\\end{align*}$$'
          } else if (!seemsCorrect) {
            line +=
              `&= \\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{${answer_latex}}}` +
              `\\\\&= \\textcolor{green}{${solutions_latex[0]}}\\end{align*}$$`
          } else if (!correct) {
            line +=
              `&= \\textcolor{orange}{${answer_latex}}` +
              `\\\\&= \\textcolor{green}{${solutions_latex[0]}}\\end{align*}$$`
          } else {
            line += `=\\textcolor{green}{${answer_latex}}$$`
          }
          lines.push(line)
        }
        break
      }
      case 'choice':
        line =
          correction_latex +
          '<span class="green-text">' +
          solutions_latex[0] +
          '</span>'

        lines.push(line)
        break

      case 'enonce':
        lines.push(item.enounce)

        if (empty) {
          line = '$$' + `\\textcolor{green}{${solutions_latex[0]}}` + '$$'
        } else if (badExpression || !correct) {
          line =
            '$$\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
            answer_latex +
            '}}\\text{  }\\textcolor{green}{' +
            solutions_latex[0] +
            '}$$'
        } else {
          line = '$$\\textcolor{green}{' + answer_latex + '}$$'

          // if (!strictlyCorrect) {
          //   line +=
          //     '\\color{black}\\text{ mais }\\color{green}' +
          //     s_exp.latex +
          //     "\\color{black}\\text{ c'est encore mieux !}"
          // }
        }
        lines.push(line)

        break

      case 'decomposition':
        if (details) {
        } else {
          line = '$$\\begin{align*}' + qexp_latex
          if (empty) {
            solutions_latex.forEach((solution, i) => {
              if (i !== 0) line += '\\\\'
              line += ' &=\\textcolor{green}{' + solution + '}'
            })
            line += '\\end{align*}$$'
          } else if (!seemsCorrect) {
            line = '$$\\begin{align*}' + qexp_latex
            line += `&= \\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{${answer_latex}}}`
            solutions_latex.forEach((solution, i) => {
              line += '\\\\ &=\\textcolor{green}{' + solution + '}'
            })
            line += '\\end{align*}$$'
          } else if (!correct) {
            line = '$$\\begin{align*}' + qexp_latex
            line += `&=\\textcolor{orange}{${answer_latex}}`
            solutions_latex.forEach((solution, i) => {
              line += '\\\\ &=\\textcolor{green}{' + solution + '}'
            })
            line += '\\end{align*}$$'
          } else {
            line += `=\\textcolor{green}{${answer_latex}}$$`
          }
          lines.push(line)
        }
        break

      // case 'result':
      //   if (details) {
      //     line = '$$\\begin{align*}' + qexp_latex
      //     details_latex.forEach((detail, i) => {
      //       if (detail !== solutions_latex[0]) {
      //         if (i !== 0) line += ' \\\\ '
      //         line += '& =' + detail
      //       }
      //     })
      //     line +=
      //       ' \\\\ & =\\enclose{roundedbox}[2px solid rgba(0, 255, 0, .8)]{' +
      //       solutions_latex[0] +
      //       '}'
      //     line += '\\end{align*}$$'
      //     lines.push(line)
      //   } else {
      //     // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'
      //     line = '$$' + qexp_latex
      //     if (empty) {
      //       line += `=\\textcolor{green}{${solutions_latex[0]}}` + '$$'
      //     } else if (badExpression || !correct) {
      //       line +=
      //         '=\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
      //         answer_latex +
      //         '}}\\text{  }\\textcolor{green}{' +
      //         solutions_latex[0] +
      //         '}$$'
      //     } else {
      //       line += '=\\textcolor{green}{' + answer_latex + '}$$'

      //     }
      //     lines.push(line)
      //   }

      // break

      case 'trou':
        if (details) {
          line = '$$\\begin{align*}'
          item.details.forEach((detail, i) => {
            if (i === 0) line += detail
            if (i > 1) line += ' \\\\ '
            if (i === item.details.length - 1) {
              line +=
                '& =\\enclose{roundedbox}[2px solid rgba(0, 255, 0, .8)]{' +
                solutions_latex[0] +
                '}'
            } else {
              line += '& =' + detail
            }
            line += '\\end{align*}$$'
            lines.push(line)
          })
        } else {
          line =
            '$$' +
            qexp_latex.replace(
              /\\ldots/,
              `\\textcolor{green}{${solutions_latex[0]}}`,
            ) +
            '$$'

          lines.push(line)
          if (!empty && !correct) {
            coms.push(
              'Ta réponse : $$' +
                qexp_latex.replace(
                  /\\ldots/,
                  `\\textcolor{red}{${answer_latex}}`,
                ) +
                '$$',
            )
          }
        }
    }
    return lines
  }

  // console.log('item', item)
</script>

<div>
  <ListItem selectable="{false}">
    <div class="d-flex justify-start align-start">
      <div class="mr-4 d-flex  flex-column align-center justify-start">
        <Button
          fab
          size="x-small"
          depressed
          class="{correct ? 'green white-text' : 'red white-text'}"
        >
          <span style="font-size:{$fontSize}px;">{item.number}</span>
        </Button>

        <!-- a div is necessary for the icon to center aligned -->
        <!-- <div>
          {#if correct}
            <Icon
              class="mt-2 green-text"
              style="font-size:{$fontSize}px;"
              path="{mdiCheckCircle}"
            />
          {:else}
            <Icon
              class="mt-2 red-text"
              style="font-size:{$fontSize}px;"
              path="{mdiCloseCircle}"
            />
          {/if}
        </div> -->
        <div class="flex-grow-1"></div>
      </div>

      <div
        id="{`correction${number}`}"
        style="display:flex;flex-direction:column"
      >
        {#if details && item.details}
          {#each detailedCorrection as line}
            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{$fontSize}px;">
              {line}
            </div>
          {/each}
        {:else}
          {#each correction as line}
            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{$fontSize}px;">
              {@html line}
            </div>
          {/each}

          {#if coms.length}
            {#each coms as com}
              <div
                class="ml-2 mr-2 mt-2 mb-2"
                style="font-size:{$fontSize}px;font-family: 'Handlee', cursive;"
              >
                {@html com}
              </div>
            {/each}
          {/if}
        {/if}
      </div>
    </div>
  </ListItem>
</div>
