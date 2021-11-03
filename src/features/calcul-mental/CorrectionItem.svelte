<script>
  import { math } from 'tinycas/build/math/math'

  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount } from 'svelte'
  import {
    STATUS_BAD_FORM,
    STATUS_CORRECT,
    STATUS_INCORRECT,
    STATUS_UNOPTIMAL_FORM,
    STATUS_EMPTY,
  } from './correction'

  export let item
  export let details
  export let size

  let number,
    options = '',
    qexp_latex,
    solutions,
    answer_latex,
    answer_choice,
    correctionFormat,
    coms,
    status

  let answerColor = 'green'
  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)
  const implicit = options && options.includes('implicit')
  // l'expression de départ doit être envoyé en latex également
  let correction_latex
  // less solutions doivent être envoyées en Latex
  let solutions_latex

  let penalty = false
  const details_latex = item.details // details are in latex form

  if (status === STATUS_BAD_FORM || status == STATUS_INCORRECT) {
    answerColor = 'red'
  } else if (status === STATUS_UNOPTIMAL_FORM) {
    answerColor = 'orange'
  }

  let correction
  let detailedCorrection

  // const validateFractions = checkFractions()

  // if (seemsCorrect && !validateAnswer) {
  //   coms.push(FORM)
  // }
  function updateItem() {
    ;({
      correction: correction_latex,
      number,
      options,
      qexp_latex,
      solutions,
      answer_latex,
      answer_choice,
      correctionFormat,
      coms,
      status,
    } = item)

    solutions_latex = item.solutions
      ? item.solutions.map((solution) => {
          if (item.type === 'choice') {
            return item.choices[solution]
          } else {
            const e = math(solution)
            return e.type === '!! Error !!' ? solution : e.toLatex({ implicit })
          }
        })
      : null

    correction = createCorrection(false)
    detailedCorrection = item.details ? createCorrection(true) : null
  }

  onMount(() => {
    //  TODO: a remplacer par le markup direct
    // let score = 0
    // switch (status) {
    //   case STATUS_CORRECT:
    //     score = item.points
    //     break
    //   case STATUS_UNOPTIMAL_FORM:
    //     score = item.points / 2
    //     break
    //   default:
    //   // console.log('default case status')
    // }
    // console.log('score', score, status)
    // addPoints(score)
  })

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
              () =>
                '<span style="color:green;">' +
                (item.type === 'choice'
                  ? item.choices[solutions[0]]
                  : '$$' + answer_latex + '$$') +
                '</span>',
            )
          console.log('line', line)
          lines.push(line)
        })
      } else {
        correctionFormat.uncorrect.forEach((format) => {
          line = format.replace('&exp', qexp_latex).replace(
            '&solution',

            () =>
              '<span style="color:green;">' +
              (item.type === 'choice'
                ? item.choices[solutions[0]]
                : '$$' + solutions_latex[0] + '$$') +
              '</span>',
          )
          lines.push(line)
        })
        if (status === STATUS_INCORRECT) {
          coms.unshift(
            'Ta réponse : ' +
              correctionFormat.answer
                .replace('&exp', qexp_latex)
                .replace(
                  '&answer',
                  () =>
                    '<span style="color:red;">' +
                    (item.type === 'choice'
                      ? item.choices[answer_choice]
                      : '$$' + answer_latex + '$$') +
                    '</span>',
                ),
          )
        } else if (
          status === STATUS_BAD_FORM ||
          status === STATUS_UNOPTIMAL_FORM
        ) {
          coms.unshift(
            'Ta réponse : ' +
              correctionFormat.answer
                .replace('&exp', qexp_latex)
                .replace(
                  '&answer',
                  () =>
                    '<span style="color:orange;">' +
                    (item.type === 'choice'
                      ? item.choices[answer_choice]
                      : '$$' + answer_latex + '$$') +
                    '</span>',
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
            line = `La solution de $$${qexp_latex}$$ est :`
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
          // if (details) {
          // } else {
          //   line = '$$\\begin{align*}' + qexp_latex
          //   if (status===STATUS_EMPTY) {
          //     solutions_latex.forEach((solution, i) => {
          //       if (i !== 0) line += '\\\\'
          //       line += ' &=\\textcolor{green}{' + solution + '}'
          //     })
          //     line += '\\end{align*}$$'
          //   } else if (!seemsCorrect) {
          //     line = '$$\\begin{align*}' + qexp_latex
          //     line += `&= \\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{${answer_latex}}}`
          //     solutions_latex.forEach((solution, i) => {
          //       line += '\\\\ &=\\textcolor{green}{' + solution + '}'
          //     })
          //     line += '\\end{align*}$$'
          //   } else if (!correct) {
          //     line = '$$\\begin{align*}' + qexp_latex
          //     line += `&=\\textcolor{orange}{${answer_latex}}`
          //     solutions_latex.forEach((solution, i) => {
          //       line += '\\\\ &=\\textcolor{green}{' + solution + '}'
          //     })
          //     line += '\\end{align*}$$'
          //   } else {
          //     line += `=\\textcolor{green}{${answer_latex}}$$`
          //   }
          //   lines.push(line)
          // }
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
            }
            lines.push(line)
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

  $: if (item) updateItem()
  // console.log('item', item)
</script>

{#if correction}
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
{/if}
