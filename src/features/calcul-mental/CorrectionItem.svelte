<script>
  import { math } from 'tinycas/build/math/math'
  import { ListItem, Icon, Button } from 'svelte-materialify/src'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount } from 'svelte'

  import { mdiCheckCircle } from '@mdi/js'
  import { mdiCloseCircle } from '@mdi/js'

  export let item
  export let addPoints

  const q_exp = math(item.question)
  const s_exp = math(item.solution)
  const a_exp = math(item.answer)
  const empty = !item.answer
  const badExpression = a_exp.type === '!! Error !!'
  const correct = !badExpression && s_exp.equals(a_exp)
  const strictlyCorrect = !badExpression && s_exp.strictlyEquals(a_exp)

  let correction
  let corrections = []

  onMount(() => {
    Mathlive.renderMathInDocument()
    if (correct) addPoints(item.points)
  })

  switch (item.type) {
    case 'result':
      correction = q_exp.latex + '='

      if (empty) {
        correction += `\\textcolor{green}{${s_exp.latex}}`
        corrections.push('$$' + correction + '$$')
        correction = "\\text{(tu n'as rien répondu)}"
      } else if (badExpression || !correct) {
        correction +=
          '\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
          item.answer_latex +
          '}}\\text{  }'
        correction += '\\color{green}' + s_exp.latex
      } else {
        correction += '\\color{green}' + item.answer_latex

        if (!strictlyCorrect) {
          correction +=
            '\\color{black}\\text{ mais }\\color{green}' +
            s_exp.latex +
            "\\color{black}\\text{ c'est encore mieux !}"
        }
      }
      corrections.push('$$' + correction + '$$')
      break

    case 'trou':
      correction = q_exp.latex.replace(
        /\\ldots/,
        `\\textcolor{green}{${s_exp.latex}}`,
      )
      corrections.push('$$' + correction + '$$')
      if (empty) {
        correction = "\\text{(tu n'as rien répondu)}"
        corrections.push('$$' + correction + '$$')
      } else if (badExpression || !correct) {
        correction = '\\text{(ta réponse: }'
        correction += q_exp.latex.replace(
          /\\ldots/,
          `\\textcolor{red}{${item.answer_latex}}`,
        )
        correction += '\\text{  )}'
        corrections.push('$$' + correction + '$$')
      } else {
        correction += '\\color{green}' + item.answer_latex

        if (!strictlyCorrect) {
          correction +=
            '\\color{black}\\text{ mais }\\color{green}' +
            s_exp.latex +
            "\\color{black}\\text{ c'est encore mieux !}"
        }
      }
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
        {#each corrections as correction}
          {correction}
        {/each}
      </div>
    </div>
  </ListItem>
</div>
