<script>
  import { math } from 'tinycas/build/math/math'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { fontSize } from '../../app/stores'
  export let question
  export let size = $fontSize

  let mf
  let enounce
  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)

  $: showExp =
    (question.expression_latex &&
      !(question.options && question.options.includes('no-exp'))) ||
    question.expression2

  $: enounce = question.enounce
    ? question.enounce.replace(regex, replacement)
    : null

  $: if (mf && showExp) {
    const exp = question.expression2
      ? math(question.expression2).latex
      : question.expression_latex
    mf.setValue(exp)
    // $: console.log('enounce', question.enounce)
  }
</script>

<div class="d-flex flex-column align-center">
  {#if enounce}
    <div
      id="enounce"
      class="mt-4 text-center"
      style="font-size:{size}px;max-width:500px;"
    >
      {@html enounce}
    </div>
  {/if}
  <!-- {#if question.expression2 || !(question.options && question.options.includes('no-exp'))} -->
  {#if showExp}
    <div id="expression" class="mt-12 d-flex align-center justify-center">
      <math-field
        style="font-size:{size + 8}px;display:inline-block"
        read-only="true"
        bind:this="{mf}"
      >
      </math-field>
    </div>
  {/if}
</div>
