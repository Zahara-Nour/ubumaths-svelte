<script>
  import { math } from 'tinycas/build/math/math'
  import { ListItem, Icon } from 'svelte-materialify/src'
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

  onMount(() => {
    Mathlive.renderMathInDocument()
    if (correct) addPoints(item.points)
  })

  switch (item.type) {
    case 'result':
      correction = q_exp.latex + '='

      if (empty) {
        correction += '\\color{green}' + s_exp.latex
        correction += "\\color{black}\\text{   (tu n'as rien répondu)}"
      } else if (badExpression || !correct) {
        correction +=
          '\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{' +
          item.answer_latex +
          '}\\text{  }'
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
  }
  //   correction = '$$' + q_exp.latex + '=\\color{green}' + s_exp.latex + '$$'
  correction = '$$' + correction + '$$'
  //   correction = item.number + ') ' + correction
</script>

<div id="correction">
  <ListItem selectable={false}>
    <div style="display:flex;justify-content:flex-start;align-items:center;">
      {#if correct}
        <Icon style="margin-right:10px" class="mt-0 mb-0 green-text" path="{mdiCheckCircle}" />
      {:else}
        <Icon style="margin-right:10px" class="mt-0 mb-0 red-text" path="{mdiCloseCircle}" />
      {/if}
      {correction}
    </div>
  </ListItem>
</div>
