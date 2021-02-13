<script>
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { afterUpdate, onMount } from 'svelte'
  import BackCard from '../../components/BackCard.svelte'
  import FrontCard from '../../components/FrontCard.svelte'
  export let card


  let flip = false
  const toggleFlip = () => (flip = !flip)

  

  $: if (card) flip = false
</script>

{#if flip}
  <div class="card" >
    <BackCard
      card="{card}"
      toggleFlip="{toggleFlip}"
    />
  </div>
{:else}
  <div  class="card">
    <FrontCard
      card="{card}"
      toggleFlip="{toggleFlip}"
    />
  </div>
{/if}

<style >
  .card {
    height:100%;
  }
</style>
