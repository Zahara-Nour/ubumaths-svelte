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
  export let classroom
  export let size = $fontSize
  const {
    number,
    options = '',
    qexp_latex,
    solutions,
    answer,
    answer_latex,
  } = item

  const STATUS_EMPTY = 'empty'
  const STATUS_CORRECT = 'correct'
  const STATUS_INCORRECT = 'incorrect'
  const STATUS_UNOPTIMAL_FORM = 'unoptimal  form'
  const STATUS_BAD_FORM = 'bad form'

  const EMPTY_ANSWER = "Tu n'as rien répondu."
  const ZEROS = 'Ta réponse contient des des zéros inutiles.'
  const BRACKETS = 'Ton expression contient des parenthèses inutiles.'
  const SPACES = 'Les chiffres sont mal espacés.'
  const SIGNS = 'Tu peux faire des simplifications de signes.'
  const BAD = "Ton expression n'est pas mathématiquement correcte."
  const PRODUCTS = 'Tu peux simplifier les symboles de multiplication.'
  const FORM =
    "<span class='orange-text'>Ta réponse</span> n'est pas écrite sous la forme demandée."

  const implicit = options && options.includes('implicit')
  // l'expression de départ doit être envoyé en latex également
  const qexp = item.qexp

  const correction_latex = item.correction
  // less solutions doivent être envoyées en Latex

  const solutions_latex = item.solutions.map((solution) => {
    if (item.type === 'choice') {
      return solution // Ce n'est pas du latex !
    } else {
      const e = math(solution)
      return e.type === '!! Error !!' ? solution : e.toLatex({ implicit })
    }
  })

  let status
  let penalty = false
  const details_latex = item.details // details are in latex form
  const coms = []

  if (!item.answer) {
    if (!classroom) coms.push(EMPTY_ANSWER)
    status = STATUS_EMPTY
  } else {
    console.log('not empty')
    switch (item.type) {
      case 'choice':
        status =
          item.solutions.includes(item.answer_choice) === true
            ? STATUS_CORRECT
            : STATUS_INCORRECT
        break

      default: {
        const badExpression =
          item.type !== 'choice' && math(answer).type === '!! Error !!'
        const equivalent =
          !badExpression &&
          item.solutions.some((solution) => math(answer).equals(math(solution)))
        if (badExpression) {
          coms.push(BAD)
          status = STATUS_INCORRECT
        } else if (!equivalent) {
          status = STATUS_INCORRECT
        } else {
          // vérification des contraintes de forme
          checkConstraints()
          if (status !== STATUS_BAD_FORM) {
            checkAnswer()
          }
        }
      }
    }
  }

  // retourne un tableau des contraintes non respectées
  function checkConstraints() {
    console.log('check Constraints')
    if (
      !options.includes('no-penalty-for-incorrect-spaces') &&
      !checkSpaces()
    ) {
      coms.push(SPACES)
      if (options.includes('require-correct-spaces')) {
        status = STATUS_BAD_FORM
      } else {
        penalty = true
        status = STATUS_UNOPTIMAL_FORM
      }
    }

    if (
      !options.includes('no-penalty-for-explicit-products') &&
      !checkProducts()
    ) {
      coms.push(PRODUCTS)
      if (options.includes('require-implicit-products')) {
        status = STATUS_BAD_FORM
      } else {
        penalty = true
        status = STATUS_UNOPTIMAL_FORM
      }
    }

    if (
      !options.includes('no-penalty-for-extraneous-brackets') &&
      !checkBrackets()
    ) {
      coms.push(BRACKETS)
      if (options.includes('require-no-extraneaous-brackets')) {
        status = STATUS_BAD_FORM
      } else {
        penalty = true
        status = STATUS_UNOPTIMAL_FORM
      }
    }

    if (!options.includes('no-penalty-for-extraneous-zeros') && !checkZeros()) {
      coms.push(ZEROS)
      if (options.includes('require-no-extraneaous-zeros')) {
        status = STATUS_BAD_FORM
      } else {
        penalty = true
        status = STATUS_UNOPTIMAL_FORM
      }
    }

    if (!options.includes('no-penalty-for-extraneous-signs') && !checkSigns()) {
      coms.push(SIGNS)
      if (options.includes('require-no-extraneaous-signs')) {
        status = STATUS_BAD_FORM
      } else {
        penalty = true
        status = STATUS_UNOPTIMAL_FORM
      }
    }
  }

  // const validateFractions = checkFractions()

  const correction = createCorrection(false)
  const detailedCorrection = item.details ? createCorrection(true) : null

  // if (seemsCorrect && !validateAnswer) {
  //   coms.push(FORM)
  // }

  onMount(() => {
    Mathlive.renderMathInElement(`correction${number}`)
    let score = 0
    switch (status) {
      case STATUS_CORRECT:
        score = item.points
        break

      case STATUS_UNOPTIMAL_FORM:
        score = item.points / 2
        break

      default:
      // console.log('default case status')
    }
    console.log('score', score, status)
    addPoints(score)
  })

  function checkAnswer() {
    console.log('checkAnswer')
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

    // Les tests de contraintes ont été faits. Il faut simplifier la réonse pour pouvoir
    // la comparer à la solution : on enlève les parenthèses inutiles, les signes inutiles....

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
    if (!sols.some((sol) => sol.strictlyEquals(e))) {
      status = STATUS_BAD_FORM
    } else if (status !== STATUS_UNOPTIMAL_FORM) {
      status = STATUS_CORRECT
    }

    if (status === STATUS_BAD_FORM) coms.push(FORM)
  }

  function checkBrackets() {
    const e = math(answer)
    return e.removeUnecessaryBrackets().string === e.string
  }

  function checkProducts() {
    return true
  }

  function checkSigns() {
    return true
  }

  // retourne true si la vérification est OK
  function checkSpaces() {
    //  TODO: a Remplacer par searchMisplacedSpaces

    const a = answer_latex.replace(/\\,/g, ' ').replace(',', '.').trim()

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

  function checkOrder() {
    return true
  }

  // retourne true si la vérification est OK
  function checkZeros() {
    return !math(answer).searchUnecessaryZeros()
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
          console.log('STATUS', status)
          line = `$$\\begin{align*}  ${qexp_latex}`
          if (status === STATUS_EMPTY) {
            line +=
              `=\\textcolor{green}{${solutions_latex[0]}}` + '\\end{align*}$$'
          } else if (status === STATUS_INCORRECT) {
            line +=
              `&= \\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{${answer_latex}}}` +
              `\\\\&= \\textcolor{green}{${solutions_latex[0]}}\\end{align*}$$`
          } else if (
            status === STATUS_BAD_FORM ||
            status === STATUS_UNOPTIMAL_FORM
          ) {
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
          if (status === STATUS_CORRECT) {
            line =
              '$$' +
              qexp_latex.replace(
                /\\ldots/,
                `\\textcolor{green}{${answer_latex}}`,
              ) +
              '$$'
          } else {
            line =
              '$$' +
              qexp_latex.replace(
                /\\ldots/,
                `\\textcolor{green}{${solutions_latex[0]}}`,
              ) +
              '$$'

            if (status === STATUS_INCORRECT) {
              coms.unshift(
                'Ta réponse : $$' +
                  qexp_latex.replace(
                    /\\ldots/,
                    `\\textcolor{red}{${answer_latex}}`,
                  ) +
                  '$$',
              )
            } else if (
              status === STATUS_BAD_FORM ||
              status === STATUS_UNOPTIMAL_FORM
            ) {
              coms.unshift(
                'Ta réponse : $$' +
                  qexp_latex.replace(
                    /\\ldots/,
                    `\\textcolor{orange}{${answer_latex}}`,
                  ) +
                  '$$',
              )
            }

            lines.push(line)
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
          class="{status === STATUS_CORRECT
            ? 'green white-text'
            : status === STATUS_UNOPTIMAL_FORM
            ? 'orange white-text'
            : 'red white-text'}"
        >
          <span style="font-size:{size}px;">{item.number}</span>
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
            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{size}px;">
              {line}
            </div>
          {/each}
        {:else}
          {#each correction as line}
            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{size}px;">
              {@html line}
            </div>
          {/each}

          {#if coms.length}
            {#each coms as com}
              <div
                class="ml-2 mr-2 mt-2 mb-2"
                style="font-size:{size}px;font-family: 'Handlee', cursive;"
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
