<script>
  import { math } from 'tinycas/build/math/math'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount, afterUpdate, onDestroy } from 'svelte'
  import { mdiConsoleNetworkOutline } from '@mdi/js'
import { fontSize } from '../../app/stores';
  export let question

  let mf
  let enounce
  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.latexToMarkup(p1)

  


  $:  enounce = question.enounce ? question.enounce.replace(regex, replacement) : null
    
  

  $: if (mf) {
    const exp = math(question.expression)
    mf.setValue(exp.toLatex({addBrackets:true}))
  // $: console.log('enounce', question.enounce)
  }
</script>

<div>
  {#if enounce}
    <div id="enounce">{@html enounce}</div>
  {/if}
  {#if !(question.options && question.options.includes('no-exp'))}
    <div
      id="expression"
      class="mt-4 d-flex align-center justify-center"
    >
      <math-field
        style="font-size:{$fontSize+10}px;display:inline-block"
        read-only="true"
        bind:this="{mf}"></math-field>
    </div>
  {/if}
</div>

<style>
  #expression {
  }
</style>
