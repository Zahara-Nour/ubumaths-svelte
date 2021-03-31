<script>
  import CorrectionItem from './CorrectionItem.svelte'
  import { Button, Icon } from 'svelte-materialify/src'
  import { mdiHelp, mdiLifebuoy, mdiScanHelper } from '@mdi/js'
  import Reveal from 'reveal.js'
  import { onMount } from 'svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { fade } from 'svelte/transition';


  export let questions
  export let answers
  export let answers_latex

  const help = questions[0].help
  let score = 0
  let total = 0
  let details = false
  const items = []
  const toggleDetails = () => (details = !details)

  function addPoints(points) {
    score += points
  }

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]
    total += question.points
    items[i] = {
      question: question.expression,
      answer: answers[i],
      answer_latex: answers_latex[i],
      solutions: question.solutions,
      details: question.details,
      type: question.type,
      number: i + 1,
      points: question.points,
      options: question.options,
    }
  }

  const options = {
    // Determines where controls appear, "edges" or "bottom-right"
    controlsLayout: 'edges',

    // Display a presentation progress bar
    progress: false,

    // Vertical centering of slides
    center: true,

    // Turns fragments on and off globally
    fragments: true,

    // Flags if the presentation is running in an embedded mode,
    // i.e. contained within a limited portion of the screen
    embedded: true,

    // Flags if we should show a help overlay when the question-mark
    // key is pressed
    help: true,

    // Flags if it should be possible to pause the presentation (blackout)
    pause: true,

    // Transition style
    transition: 'none', // none/fade/slide/convex/concave/zoom
  }

  let slides
  let displayHelp = false

  function toggleDisplayHelp() {
    displayHelp = !displayHelp
  }

  $: if (slides && displayHelp) {
    slides.innerHTML = help
    Mathlive.renderMathInElement('slides')
    const deck = new Reveal(document.querySelector('.deck'), options)
    deck.initialize()
  }
</script>

<div
  style="margin-top:10px;margin-bottom:10px;display:flex;justify-content:flex-end"
>
  {#if help}
    <Button
      class="{displayHelp ? 'orange white-text' : ''} ml-2 mr-2"
      fab
      size="x-small"
      on:click="{toggleDisplayHelp}"
    >
      <Icon path="{mdiLifebuoy}" />
    </Button>
  {/if}

  <Button class="ml-2 mr-2" fab size="x-small" on:click="{toggleDetails}">
    <Icon path="{mdiScanHelper}" />
  </Button>
</div>

{#if displayHelp}
  <div  class="container">
    <div id="deck" class="reveal deck">
      <div id="slides" class="slides" bind:this="{slides}"></div>
    </div>
  </div>
{/if}

{#each items as item}
  <CorrectionItem item="{item}" addPoints="{addPoints}" details="{details}" />
{/each}

<div class="green d-flex align-center  justify-space-around">
  <span style="font-size:22px" class="white-text">
    Score : {score}/{total}
  </span>
  {#if score >= 0}
    <img alt="Good job!" src="/images/good-job.png" width="25%" />
  {/if}
</div>

<style>
  .container {
    padding-top:15px;
    padding-bottom:15px;
    width: 100%;
    height: 350px;
    border: 8px solid rgb(255, 215, 165);
    border-radius: 15px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
  }
  #deck {
    width: 100%;
    height: 100%;
    
  }
</style>
