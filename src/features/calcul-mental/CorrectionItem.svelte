<script>
  import { math } from 'tinycas/build/math/math'
  import { ListItem, Icon, Button } from 'svelte-materialify/src'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount, afterUpdate } from 'svelte'

  import { mdiCheckCircle } from '@mdi/js'
  import { mdiCloseCircle } from '@mdi/js'

  export let item
  export let addPoints
  export let details

  const q_exp = math(item.question)
  const s_exp = math(item.solution)
  const a_exp = math(item.answer)
  const empty = !item.answer
  const badExpression = a_exp.type === '!! Error !!'
  const correct = !badExpression && s_exp.equals(a_exp)
  const strictlyCorrect = !badExpression && s_exp.strictlyEquals(a_exp)

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
      case 'result':
        if (details) {
          item.details.forEach((detail, i) => {
            line = {}
            if (i === 0) line.left = '$$' + q_exp.latex + '$$'
            line.right = '$$' + detail + '$$'
            lines.push(line)
          })

          line = {
            right:
              '$$' +
              '\\enclose{roundedbox}[2px solid rgba(0, 255, 0, .8)]{' +
              s_exp.latex +
              '}' +
              '$$',
          }
          lines.push(line)
        } else {
          line = q_exp.latex + '='
          if (empty) {
            line += `\\textcolor{green}{${s_exp.latex}}`
            lines.push('$$' + line + '$$')
            line = "\\text{(tu n'as rien répondu)}"
          } else if (badExpression || !correct) {
            line +=
              '\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
              item.answer_latex +
              '}}\\text{  }'
            line += '\\color{green}' + s_exp.latex
          } else {
            line += '\\color{green}' + item.answer_latex

            if (!strictlyCorrect) {
              line +=
                '\\color{black}\\text{ mais }\\color{green}' +
                s_exp.latex +
                "\\color{black}\\text{ c'est encore mieux !}"
            }
          }
          lines.push('$$' + line + '$$')
        }

        break

      case 'trou':
        if (details) {
          item.details.forEach((detail, i) => {
            line =  {}
            if (i===0) line.left = '$$' + detail + '$$'
            if (i===item.details.length-1) {
              line.right = '$$\\enclose{roundedbox}[2px solid rgba(0, 255, 0, .8)]{' + s_exp.latex + '}$$'
            } else  {
              line.right = '$$' + detail + '$$'
            }
            lines.push(line)
          })

        } else {
          line = q_exp.latex.replace(
            /\\ldots/,
            `\\textcolor{green}{${s_exp.latex}}`,
          )
          lines.push('$$' + line + '$$')
          if (empty) {
            line = "\\text{(tu n'as rien répondu)}"
            lines.push('$$' + line + '$$')
          } else if (badExpression || !correct) {
            line = '\\text{(ta réponse: }'
            line += q_exp.latex.replace(
              /\\ldots/,
              `\\textcolor{red}{${item.answer_latex}}`,
            )
            line += '\\text{  )}'
            lines.push('$$' + line + '$$')
          } else {
            line += '\\color{green}' + item.answer_latex

            if (!strictlyCorrect) {
              line +=
                '\\color{black}\\text{ mais }\\color{green}' +
                s_exp.latex +
                "\\color{black}\\text{ c'est encore mieux !}"
            }
          }
        }
    }
    return lines
  }
</script>

<div id="correction">
  <ListItem selectable="{false}">
    <div style="display:flex;justify-content:flex-start;align-items:center;">
      <Button fab size="x-small" depressed class="blue white-text mr-2">
        {item.number}
      </Button>

      <!-- a div is necessary for the icon to center aligned -->
      <div>
        {#if correct}
          <Icon class="mt-0 mb-0 mr-7 green-text" path="{mdiCheckCircle}" />
        {:else}
          <Icon class="mt-0 mb-0 mr-7 red-text" path="{mdiCloseCircle}" />
        {/if}
      </div>

      <div style="display:flex;flex-direction:column">
        {#if details && item.details}
          <table>
            {#each detailedCorrection as line}
              <tr>
                <td>{line.left || ''}</td>
                <td>$$=$$</td>
                <td>{line.right}</td>
              </tr>
            {/each}
          </table>
        {:else}
          {#each correction as line}
            <!-- don't remove this div because mathlive changes dom -->
            <div>
              {line}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </ListItem>
</div>
