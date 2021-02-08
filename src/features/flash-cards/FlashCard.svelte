<script>
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { afterUpdate } from 'svelte'
  import BackCard from '../../components/BackCard.svelte'
  import FrontCard from '../../components/FrontCard.svelte'
  export let card
  export let frontLocalUrlP
  export let backLocalUrlP



  let flip = false
  const toggleFlip = () => (flip = !flip)

  afterUpdate(() => {
    
    // if (!flip) {
    // Mathlive.renderMathInElement('front')
    // } else  {
    // Mathlive.renderMathInElement('back')
    // }
    // Mathlive.renderMathInDocument()
  })

  $: if (card) flip = false
</script>

{#if flip}
  <div id="back">
    <BackCard
      {card}
      localUrlP="{backLocalUrlP}"
      {toggleFlip}
    />
  </div>
{:else}
  <div id="front">
    <FrontCard {card} localUrlP="{frontLocalUrlP}" {toggleFlip} />
  </div>
{/if}

<style type="text/scss">

</style>
