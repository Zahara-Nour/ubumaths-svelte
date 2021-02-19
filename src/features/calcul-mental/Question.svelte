<script>
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { math } from 'tinycas/build/math/math'
  export let question

  let mf

  $: if (mf) mf.setValue(math(question.expression).latex)

  console.log('Question.svelte')
  
</script>

<div>
  <!-- {#if question.enounce}
    {question.enounce}
  {/if} -->
  <div id="expression">
    <math-field read-only="true" bind:this="{mf}"></math-field>
  </div>
</div>

<style>
  #expression {
  }
</style>
