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

<div class="card">
  <div class="flipper" class:flip>
    <div class="front">
      <FrontCard card="{card}" toggleFlip="{toggleFlip}" />
    </div>
    <div class="back">
      <BackCard card="{card}" toggleFlip="{toggleFlip}" />
    </div>
  </div>
</div>

<style>
  .card {
    width:100%;
    height: calc(100% - 8px);
    perspective: 1000px;
  }

  .flip {
    transform: rotateY(180deg);
  }

  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    height:100%;
    position: relative;
    width:100%;
  }

  /* hide back of pane during swap */
  .front,
  .back {
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    height:100%;
    width:100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* front pane, placed above back */
  .front {
    z-index: 2;
    /* for firefox 31 */
    transform: rotateY(0deg);
  }

  /* back, initially hidden pane */
  .back {
    transform: rotateY(180deg);
  }
</style>
