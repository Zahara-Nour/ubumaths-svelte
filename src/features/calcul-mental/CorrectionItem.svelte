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
  const q_latex = math(item.question).latex
  const correction_latex = item.correction
  const solutions_latex = item.solutions.map((solution) => {
    const e = math(solution)
    // console.log(solution)
    // console.log('e.type', e.type)
    return e.type === '!! Error !!' ? solution : e.toLatex({ implicit })
  })
  console.log('solutions', solutions_latex)
  const details_latex = item.details // details are in latex form
  const answer_latex = item.answer_latex
  const empty = !item.answer
  const badExpression = item.answer.type === '!! Error !!'
  const correct =
    !badExpression && solutions_latex.some((e) => e === answer_latex)
  // const strictlyCorrect =
  //   !badExpression &&
  //   solutions_latex.some((e) => e.strictlyEquals(answer_latex))
  let com

  const correction = createItem(false)
  const detailedCorrection = item.details ? createItem(true) : null

  onMount(() => {
    Mathlive.renderMathInElement(`correction${number}`)

    if (correct) addPoints(item.points)
  })

  afterUpdate(() => {
    Mathlive.renderMathInElement(`correction${number}`)
  })


  const testlatex =
    '$$3+\\frac{4}{5}$$'
  function createItem(details) {
    let line
    let lines = []
    console.log('type', item.type)
    switch (item.type) {
      case 'choice':
        // // if (empty) {
        console.log(correction_latex)
        line = testlatex
        // '$$' +
        // correction_latex +
        // ' \\textcolor{green}{' +
        // solutions_latex[0] +
        // '}'
        // '$$'
        com = "(tu n'as rien répondu)"
        // }
        lines.push(line)
        break

      case 'enonce':
        lines.push(item.enounce)

        if (empty) {
          line = '$$' + `\\textcolor{green}{${solutions_latex[0]}}` + '$$'

          com = "(tu n'as rien répondu)"
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
          line = '$$\\begin{align*}' + q_latex
          solutions_latex.forEach((solution, i) => {
            if (i !== 0) line += ' \\\\ '
            line += '& =' + solution
          })
          line += '\\end{align*}$$'
          lines.push(line)
        }
        break

      case 'result':
        if (details) {
          line = '$$\\begin{align*}' + q_latex
          details_latex.forEach((detail, i) => {
            if (detail !== solutions_latex[0]) {
              if (i !== 0) line += ' \\\\ '
              line += '& =' + detail
            }
          })
          line +=
            ' \\\\ & =\\enclose{roundedbox}[2px solid rgba(0, 255, 0, .8)]{' +
            solutions_latex[0] +
            '}'
          line += '\\end{align*}$$'
          lines.push(line)
        } else {
          // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'
          line = '$$' + q_latex
          if (empty) {
            line += `=\\textcolor{green}{${solutions_latex[0]}}` + '$$'
            com = "(tu n'as rien répondu)"
          } else if (badExpression || !correct) {
            line +=
              '=\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
              answer_latex +
              '}}\\text{  }\\textcolor{green}{' +
              solutions_latex[0] +
              '}$$'
          } else {
            line += '=\\textcolor{green}{' + answer_latex + '}$$'

            // if (!strictlyCorrect) {
            //   line +=
            //     '\\color{black}\\text{ mais }\\color{green}' +
            //     s_exp.latex +
            //     "\\color{black}\\text{ c'est encore mieux !}"
            // }
          }
          lines.push(line)
        }

        break

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
            q_latex.replace(
              /\\ldots/,
              `\\textcolor{green}{${solutions_latex[0]}}`,
            ) +
            '$$'

          lines.push(line)
          if (empty) {
            com = "(tu n'as rien répondu)"
          } else if (badExpression || !correct) {
            com = '$$\\text{(ta réponse: }'
            com += q_latex.replace(
              /\\ldots/,
              `\\textcolor{red}{${answer_latex}}`,
            )
            com += '\\text{  )}$$'
          } else {
            // line += '\\color{green}' + item.answer_latex
            // if (!strictlyCorrect) {
            //   line +=
            //     '\\color{black}\\text{ mais }\\color{green}' +
            //     s_exp.latex +
            //     "\\color{black}\\text{ c'est encore mieux !}"
            // }
          }
        }
    }
    return lines
  }
</script>

<div>
  <ListItem selectable="{false}">
    <div class="d-flex justify-start align-center">
      <Button fab size="x-small" depressed class="blue white-text mr-2">
        <span style="font-size:{$fontSize}px;">{item.number}</span>
      </Button>

      <!-- a div is necessary for the icon to center aligned -->
      <div>
        {#if correct}
          <Icon
            class="mt-0 mb-0 mr-7 green-text"
            style="font-size:{$fontSize}px;"
            path="{mdiCheckCircle}"
          />
        {:else}
          <Icon
            class="mt-0 mb-0 mr-7 red-text"
            style="font-size:{$fontSize}px;"
            path="{mdiCloseCircle}"
          />
        {/if}
      </div>

      <div
        id="{`correction${number}`}"
        style="display:flex;flex-direction:column"
      >
      <div>{testlatex}</div>
      <div>{testlatex}</div>
        {#if details && item.details}
          {#each detailedCorrection as line}
            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{$fontSize}px;">
              {line}
            </div>
          {/each}
        {:else}
          <div>{testlatex}</div>
          <div>{testlatex}</div>
          {#each correction as line}
            <div>{testlatex}</div>
            <div>{testlatex}</div>

            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{$fontSize}px;">
              <!-- {line} -->
            </div>
          {/each}

          {#if com}
            <div style="font-size:{$fontSize}px;">
              {com}
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </ListItem>
</div>
