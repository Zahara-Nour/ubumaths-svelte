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

  const options = item.options
  const implicit = options && options.includes('implicit')
  const q_exp = math(item.question)
  const s_exp = 'sexp'
  const s_exps = item.solutions.map((solution) => math(solution))
  const d_exps = item.details // details are in latex form
  const a_exp = math(item.answer)
  const empty = !item.answer
  const badExpression = a_exp.type === '!! Error !!'
  const correct = !badExpression && s_exps.some((e) => e.equals(a_exp))
  const strictlyCorrect =
    !badExpression && s_exps.some((e) => e.strictlyEquals(a_exp))
  let com

  const correction = createItem(false)
  const detailedCorrection = item.details ? createItem(true) : null

  onMount(() => {
    Mathlive.renderMathInDocument()
    if (correct) addPoints(item.points)
  })

  afterUpdate(() => {
    Mathlive.renderMathInDocument()
  })

  function createItem(details) {
    let line
    let lines = []

    switch (item.type) {
      case 'enonce':
        lines.push(item.enounce)

        if (empty) {
          line = '$$'+`\\textcolor{green}{${s_exps[0].toLatex({ implicit })}}` + '$$'

          com = "(tu n'as rien répondu)"
        } else if (badExpression || !correct) {
          line =
            '$$\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
            item.answer_latex +
            '}}\\text{  }\\textcolor{green}{' +
            s_exps[0].toLatex({ implicit }) +
            '}$$'
        } else {
          line = '$$\\textcolor{green}{' + item.answer_latex + '}$$'

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
          line = '$$\\begin{align*}' + q_exp.latex
          s_exps.forEach((solution, i) => {
            if (i !== 0) line += ' \\\\ '
            line += '& =' + solution.latex
          })
          line += '\\end{align*}$$'
          lines.push(line)
        }
        break

      case 'result':
        if (details) {
          line = '$$\\begin{align*}' + q_exp.latex
          d_exps.forEach((detail, i) => {
            if (detail !== s_exps[0].toLatex({ implicit })) {
              if (i !== 0) line += ' \\\\ '
              line += '& =' + detail
            }
          })
          line +=
            ' \\\\ & =\\enclose{roundedbox}[2px solid rgba(0, 255, 0, .8)]{' +
            s_exps[0].toLatex({ implicit }) +
            '}'
          line += '\\end{align*}$$'
          lines.push(line)
        } else {
          // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'
          line = '$$' + q_exp.latex
          if (empty) {
            line +=
              `=\\textcolor{green}{${s_exps[0].toLatex({ implicit })}}` + '$$'

            com = "(tu n'as rien répondu)"
          } else if (badExpression || !correct) {
            line +=
              '=\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
              item.answer_latex +
              '}}\\text{  }\\textcolor{green}{' +
              s_exps[0].toLatex({ implicit }) +
              '}$$'
          } else {
            line += '=\\textcolor{green}{' + item.answer_latex + '}$$'

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
                s_exps[0].latex +
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
            q_exp.latex.replace(
              /\\ldots/,
              `\\textcolor{green}{${s_exps[0].latex}}`,
            ) +
            '$$'

          lines.push(line)
          if (empty) {
            com = "(tu n'as rien répondu)"
          } else if (badExpression || !correct) {
            com = '$$\\text{(ta réponse: }'
            com += q_exp.latex.replace(
              /\\ldots/,
              `\\textcolor{red}{${item.answer_latex}}`,
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

<div id="correction">
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

      <div style="display:flex;flex-direction:column">
        {#if details && item.details}
          {#each detailedCorrection as line}
            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{$fontSize}px;">
              {line}
            </div>
          {/each}
        {:else}
          {#each correction as line}
            <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{$fontSize}px;">
              {line}
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
