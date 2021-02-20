<script>
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { math } from 'tinycas/build/math/math'
  export let question

  let mf

  $: if (mf) mf.setValue(math(question.expression).latex)

  
</script>

<div>
  <!-- {#if question.enounce}
    {question.enounce}
  {/if} -->
  <div id="expression" style="display:flex; align-items:center;justify-content:center">
    <math-field style="font-size:32px;display:inline-block" read-only="true" bind:this="{mf}"></math-field>
  </div>
</div>

<style>
  #expression {
  }
</style>
