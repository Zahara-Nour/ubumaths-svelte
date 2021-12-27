<script>
  import { math } from 'tinycas/build/math/math'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { fetchImage } from './images'

  export let question
  export let size

  let mf
  let image
  let enounce
  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)

  // $: showExp =
  //   (question.expression_latex &&
  //     !(question.options && question.options.includes('no-exp'))) ||
  //   question.expression2

  $: showExp =
    question.expression_latex &&
    !(question.options && question.options.includes('no-exp'))

  $: enounce = question.enounce
    ? question.enounce.replace(regex, replacement)
    : null

  $: expression = question.expression_latex
    ? Mathlive.convertLatexToMarkup(question.expression_latex)
    : null

  $: expression2 = question.expression2_latex
    ? Mathlive.convertLatexToMarkup(question.expression2_latex)
    : null
 
  // changer le nom
  // $: if (mf && showExp) {
  //   const exp = question.expression2
  //     ? math(question.expression2).latex
  //     : question.expression_latex
  //   mf.setValue(exp)
  //   // $: console.log('enounce', question.enounce)
  // }

  $: if (question.image && !question.imageBase64P) {
    question.imageBase64P = fetchImage(question.image)
  }
</script>

<div class="d-flex flex-column align-center">
  {#if enounce}
    <div
      id="enounce"
      class="mt-4 text-center"
      style="font-size:{size}px;max-width:900px;"
    >
      {@html enounce}
    </div>
  {/if}
  <!-- {#if question.expression2 || !(question.options && question.options.includes('no-exp'))} -->
  {#if showExp}
    <div
      id="expressions"
      class="mt-12 d-flex flex-column align-center justify-center"
    >
      <!-- <div id="expression" class="mt-12 d-flex align-center justify-center">
      <math-field
        style="font-size:{size + 8}px;display:inline-block"
        read-only="true"
        bind:this="{mf}"
      >
      </math-field>
    </div> -->
      <div id="expression" class="mt-4" style="font-size:{size + 8}px;">
        {@html expression}
      </div>
      {#if expression2}
        <div id="expression2" class="mt-4" style="font-size:{size + 8}px;">
          {@html expression2}
        </div>
      {/if}
    </div>
  {/if}
  {#if question.image}
    {#await question.imageBase64P}
      loading image
    {:then base64}
      <img
        src="{base64}"
        class="mt-3 mb-3"
        style="max-width:90%;max-height:40vh;"
        alt="Alright Buddy!"
      />
    {:catch error}
      {error}
    {/await}
  {/if}
</div>
