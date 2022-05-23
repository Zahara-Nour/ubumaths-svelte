<script>
  import { math } from 'tinycas/build/math/math'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { fetchImage } from './images'

  export let question
  export let size

  let mf
  let image
  let enounce
  let enounce2
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
  
  $: enounce2 = question.enounce2
    ? question.enounce2.replace(regex, replacement)
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


</script>

<div class="d-flex flex-column align-center">
  {#each question.order_elements as element}
    {#if element === 'enounce' && enounce}
      
        <div
          id="enounce"
          class="mt-3 mb-3 text-center"
          style="font-size:{size}px;max-width:900px;line-height: normal;"
        >
          {@html enounce}
        </div>

    {:else if element === 'enounce2' && enounce2}
      
        <div
          id="enounce2"
          class="mt-3 mb-3  text-center"
          style="font-size:{size}px;max-width:900px;"
        >
          {@html enounce2}
        </div>
       
        <!-- {#if question.expression2 || !(question.options && question.options.includes('no-exp'))} -->
    {:else if element === 'enounce-image' && question.image }
     
        {#await question.imageBase64P}
         loading image
        {:then base64}
          <img
            src="{base64}"
            class="mt-3 mb-3"
            style="width:100%;max-width:500px;max-height:40vh;"
            alt="Alright Buddy!"
          />
        {:catch error}
          {error}
        {/await}
      
    {:else if element==='expression' && expression}
      {#if showExp}
        <div
          id="expressions"
          class="mt-3 mb-3  d-flex flex-column align-center justify-center"
        >
   
          <div id="expression" class="mt-3 mb-3 " style="font-size:{size + 8}px;">
            {@html expression}
          </div>
          {#if expression2}
            <div id="expression2" class="mt-4" style="font-size:{size + 8}px;">
              {@html expression2}
            </div>
          {/if}
        </div>
      {/if}
    {/if}
  {/each}
  
</div>
