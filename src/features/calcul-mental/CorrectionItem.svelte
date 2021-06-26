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
    answer_choice,
    correctionFormat,
    testAnswer,
  } = item

  let answerColor = 'green'

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)

  const STATUS_EMPTY = 'empty'
  const STATUS_CORRECT = 'correct'
  const STATUS_INCORRECT = 'incorrect'
  const STATUS_UNOPTIMAL_FORM = 'unoptimal  form'
  const STATUS_BAD_FORM = 'bad form'

  const EMPTY_ANSWER = "Tu n'as rien répondu."
  const ZEROS =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient des des zéros inutiles"
  const FACTORE_ONE =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient un facteur égal à 1 que tu peux simplifier."
  const FACTORE_ZERO =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient un produit nul que tu peux simplifier."
  const NULL_TERMS =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient un terme nul que tu peux enlever."
  const BRACKETS =
    "<span style='color:#_COLORANSWER_'>Ta réponse</span> contient des parenthèses inutiles."
  const SPACES =
    "Les chiffres sont mal espacés dans <span style='color:_COLORANSWER_'>ta réponse</span>."
  const SIGNS =
    "Tu peux faire des simplifications de signes dans <span style='color:_COLORANSWER_'>ta réponse</span>."
  const BAD =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> n'est pas mathématiquement correcte."
  const PRODUCTS =
    "Tu peux simplifier les symboles de multiplication dans <span style='color:_COLORANSWER_'>ta réponse</span>."
  const FORM =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> n'est pas écrite sous la forme demandée."

  const implicit = options && options.includes('implicit')

  // l'expression de départ doit être envoyé en latex également

  const correction_latex = item.correction
  // less solutions doivent être envoyées en Latex

  const solutions_latex = item.solutions
    ? item.solutions.map((solution) => {
        if (item.type === 'choice') {
          return solution // Ce n'est pas du latex !
        } else {
          const e = math(solution)
          return e.type === '!! Error !!' ? solution : e.toLatex({ implicit })
        }
      })
    : null

  let status
  let penalty = false
  const details_latex = item.details // details are in latex form
  let coms = []

  if (!item.answer && item.answer_choice === null) {
    //answer_choice peut etre égal à 0
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
          testAnswer ||
          (!badExpression &&
            item.solutions.some((solution) =>
              math(answer).equals(math(solution)),
            ))
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

  if (status === STATUS_BAD_FORM || status == STATUS_INCORRECT) {
    answerColor = 'red'
  } else if (status === STATUS_UNOPTIMAL_FORM) {
    answerColor = 'orange'
  }

  const correction = createCorrection(false)
  const detailedCorrection = item.details ? createCorrection(true) : null

  // retourne un tableau des contraintes non respectées
  function checkConstraints() {
    console.log('check Constraints')

    const checks = [
      {
        option: ['no-penalty-for-incorrect-spaces', 'require-correct-spaces'],
        function: checkSpaces,
        com: SPACES,
      },
      {
        option: [
          'no-penalty-for-explicit-products',
          'require-implicit-products',
        ],
        function: checkProducts,
        com: PRODUCTS,
      },
      {
        option: [
          'no-penalty-for-extraneous-brackets',
          'require-no-extraneaous-brackets',
        ],
        function: checkBrackets,
        com: BRACKETS,
      },
      {
        option: [
          'no-penalty-for-extraneous-zeros',
          'require-no-extraneaous-zeros',
        ],
        function: checkZeros,
        com: ZEROS,
      },
      {
        option: [
          'no-penalty-for-extraneous-signs',
          'require-no-extraneaous-signs',
        ],
        function: checkSigns,
        com: SIGNS,
      },
      {
        option: ['no-penalty-for-factor-one', 'require-no-factor-one'],
        function: checkFactorsOne,
        com: FACTORE_ONE,
      },
      {
        option: ['no-penalty-for-factor-zero', 'require-no-factor-zero'],
        function: checkFactorsZero,
        com: FACTORE_ZERO,
      },
      {
        option: ['no-penalty-for-null-terms', 'require-no-null-terms'],
        function: checkNullTerms,
        com: NULL_TERMS,
      },
    ]

    checks.forEach((check) => {
      if (!options.includes(check.option[0]) && !check.function()) {
        coms.push(check.com)
        if (options.includes(check.option[1])) {
          status = STATUS_BAD_FORM
        } else {
          penalty = true
          if (status !== STATUS_BAD_FORM) status = STATUS_UNOPTIMAL_FORM
        }
      }
      console.log('check', status)
    })
  }

  // const validateFractions = checkFractions()

  // if (seemsCorrect && !validateAnswer) {
  //   coms.push(FORM)
  // }

  onMount(() => {
    //  TODO: a remplacer par le markup direct
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

    if (testAnswer) {
      const tests = testAnswer.replace(/&answer/g, answer).split('&&')
      console.log('tests', tests)
      const failed = tests.some((test) => math(test).eval().isFalse())

      // TODO : tester les formats

      if (failed) {
        status = STATUS_INCORRECT
      } else if (status !== STATUS_UNOPTIMAL_FORM) {
        status = STATUS_CORRECT
      }
    } else {
      let e = math(answer)

      let sols = solutions.map((solution) => math(solution))

      // Les tests de contraintes ont été faits. Il faut simplifier la réonse pour pouvoir
      // la comparer à la solution : on enlève les parenthèses inutiles, les signes inutiles....

      e = e.removeUnecessaryBrackets()
      sols = sols.map((solution) => solution.removeUnecessaryBrackets())
      // }

      e = e.removeFactorsOne()
      sols = sols.map((solution) => solution.removeFactorsOne())

      e = e.simplifyNullProducts()
      sols = sols.map((solution) => solution.simplifyNullProducts())

      e = e.removeNullTerms()
      sols = sols.map((solution) => solution.removeNullTerms())

      e = e.removeMultOperator()
      sols = sols.map((solution) => solution.removeMultOperator())

      if (
        options.includes('disallow-terms-and-factors-permutation') ||
        options.includes('disallow-terms-permutation') ||
        options.includes('disallow-factors-permutation')
      ) {
        if (
          !options.includes('disallow-terms-permutation') &&
          !options.includes('disallow-terms-and-factors-permutation')
        ) {
          e = e.sortTerms()
          sols = sols.map((solution) => solution.sortTerms())
        } else if (
          !options.includes('disallow-factors-permutation') &&
          !options.includes('disallow-terms-and-factors-permutation')
        ) {
          e = e.sortFactors()
          sols = sols.map((solution) => solution.sortFactors())
        }
      } else {
        e = e.sortTermsAndFactors()
        sols = sols.map((solution) => solution.sortTermsAndFactors())
      }

      console.log('checkAnswer', sols, e.string)
      if (!sols.some((sol) => sol.strictlyEquals(e))) {
        status = STATUS_BAD_FORM
      } else if (status !== STATUS_UNOPTIMAL_FORM) {
        status = STATUS_CORRECT
      }
    }

    if (status === STATUS_BAD_FORM) coms.push(FORM)
  }

  function checkProducts() {
    const e = math(answer)
    return e.removeMultOperator().string === e.string
  }

  function checkNullTerms() {
    const e = math(answer)
    return e.removeNullTerms().string === e.string
  }

  function checkBrackets() {
    const e = math(answer)
    return e.removeUnecessaryBrackets().string === e.string
  }

  function checkSigns() {
    return true
  }

  function checkFactorsOne() {
    const e = math(answer)
    return e.removeFactorsOne().string === e.string
  }

  function checkFactorsZero() {
    const e = math(answer)
    return e.simplifyNullProducts().string === e.string
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

    return true
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

    if (correctionFormat) {
      if (status === STATUS_CORRECT) {
        correctionFormat.correct.forEach((format) => {
          line = format
            .replace('&exp', qexp_latex)
            .replace(
              '&solution',
              `<span style="color:green;">${
                item.type === 'choice'
                  ? item.choices[solutions[0]]
                  : answer_latex
              }</span>`,
            )
          lines.push(line)
        })
      } else {
        correctionFormat.uncorrect.forEach((format) => {
          line = format.replace('&exp', qexp_latex).replace(
            '&solution',

            `<span style="color:green;">${
              item.type === 'choice'
                ? item.choices[solutions[0]]
                : solutions_latex[0]
            }</span>`,
          )
          lines.push(line)
        })
        if (status === STATUS_INCORRECT) {
          coms.unshift(
            'Ta réponse : ' +
              correctionFormat.correct[0]
                .replace('&exp', qexp_latex)
                .replace(
                  '&solution',
                  `<span style="color:red;">${
                    item.type === 'choice'
                      ? item.choices[answer_choice]
                      : answer_latex
                  }</span>`,
                ),
          )
        } else if (
          status === STATUS_BAD_FORM ||
          status === STATUS_UNOPTIMAL_FORM
        ) {
          coms.unshift(
            'Ta réponse : ' +
              correctionFormat.correct[0]
                .replace('&exp', qexp_latex)
                .replace(
                  '&solution',
                  `<span style="color:orange;">${
                    item.type === 'choice'
                      ? item.choices[answer_choice]
                      : answer_latex
                  }</span>`,
                ),
          )
        }
      }
    } else {
      switch (item.type) {
        case 'result':
        case 'rewrite': {
          if (details) {
          } else {
            // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'

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
              line += `=\\textcolor{green}{${answer_latex}}\\end{align*}$$`
            }
            lines.push(line)
          }
          break
        }

        case 'equation': {
          if (details) {
          } else {
            // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'
            line =  `La solution de $$${qexp_latex}$$ est :`
            lines.push(line)
            line = `$$\\begin{align*}  x`
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
              line += `=\\textcolor{green}{${answer_latex}}\\end{align*}$$`
            }
            lines.push(line)
          }
          break
        }
        case 'choice':
          // line =
          //   correction_latex +
          //   '<span class="green-text">' +
          //   solutions_latex[0] +
          //   '</span>'

          // lines.push(line)
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
            //TODO : empty ?
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
    }

    lines = lines.map((line) =>
      line.replace(regex, replacement).replace(/_COLORANSWER_/g, answerColor),
    )
    coms = coms.map((com) =>
      com.replace(regex, replacement).replace(/_COLORANSWER_/g, answerColor),
    )
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

      <div id="{`correction${number}`}" class="flex-shrink-2">
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
