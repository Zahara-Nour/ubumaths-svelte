<script>
  import { math } from 'tinycas/build/math/math'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount, afterUpdate, onDestroy } from 'svelte'
  import { mdiConsoleNetworkOutline } from '@mdi/js'
  export let question

  let mf
  let enounce

  onMount(() => {
    if (question.enounce) {
      enounce = question.enounce.replace(regex, replacement)
      if (document.getElementById('enounce')) {
        document.getElementById('enounce').innerHTML = enounce
        console.log('enouce', enounce)
      }
    }
  })

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.latexToMarkup(p1)

  $: {
    if (question.enounce) {
      enounce = question.enounce.replace(regex, replacement)
      if (document.getElementById('enounce')) {
        document.getElementById('enounce').innerHTML = enounce
      }
    }
  }

  $: if (mf) mf.setValue(math(question.expression).toLatex({addBrackets:true}))
  // $: console.log('enounce', question.enounce)
</script>

<div>
  {#if enounce}
    <div id="enounce"></div>
  {/if}
  {#if !(question.options && question.options.includes('no-exp'))}
    <div
      id="expression"
      style="display:flex; align-items:center;justify-content:center"
    >
      <math-field
        style="font-size:32px;display:inline-block"
        read-only="true"
        bind:this="{mf}"></math-field>
    </div>
  {/if}
</div>

<style>
  #expression {
  }
</style>
