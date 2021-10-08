<script>
  import CorrectionItem from '../calcul-mental/CorrectionItem.svelte'
  import { ListItem, Button, Icon } from 'svelte-materialify/src'
  import { mdiLifebuoy, mdiScanHelper } from '@mdi/js'
  import Reveal from 'reveal.js'
  import { onMount } from 'svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { mode, menuFontSize } from '../../app/stores'
  import {
    STATUS_CORRECT,
    STATUS_UNOPTIMAL_FORM,
  } from '../calcul-mental/correction'
  import QuestionCard from './QuestionCard.svelte'

  export let questions
  export let answers
  export let answers_latex
  export let answers_choice
  export let times
  export let size

  const help = questions[0].help
  let percent
  let score = 0
  let total = 0
  let details = false
  const items = []
  const toggleDetails = () => (details = !details)
  let colorResult
  let messageResult
  let assessment
  let statuss = []

  // Quand le composant de correction a fini de s'afficher,
  // le score a déjà été calculé, on l'enregistre
  onMount(async () => {
    percent = score / total

    if (percent === 1) {
      colorResult = 'green'
      messageResult = 'Perfect !'
    } else if (percent >= 0.8) {
      colorResult = 'green'
      messageResult = 'Good Job !'
    } else if (percent >= 0.5) {
      colorResult = 'orange'
      messageResult = 'Keep on !'
    } else {
      colorResult = 'red'
      messageResult = 'Try again !'
    }
  })

  function addPoints(points) {
    score += points
  }

  function updateItems() {
    total = 0
    score = 0
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      total += question.points
      items[i] = {
        qexp: question.qexp,
        qexp_latex: question.qexp_latex,
        answer: answers[i],
        answer_latex: answers_latex[i],
        answer_choice: answers_choice[i],
        time: times[i],
        solutions: question.solutions,
        details: question.details,
        type: question.type,
        number: i + 1,
        points: question.points,
        options: question.options,
        enounce: question.enounce,
        correction: question.correction,
        correctionFormat: question.correctionFormat,
        testAnswer: question.testAnswer,
        choices: question.choices,
      }
      console.log('items', items)
    }
  }



  // options revealjs
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

  $: if (questions) updateItems()
</script>

<div>
  <div class="mt-3 mb-3 d-flex justify-end">
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
    <div class="container">
      <div id="deck" class="reveal deck">
        <div id="slides" class="slides" bind:this="{slides}"></div>
      </div>
    </div>
  {/if}

  <div class="d-flex flex-column" style="width:100%;overflow-x:auto;">
    <div>
      {#each items as item, i}
        <ListItem selectable="{false}">
          <div class="d-flex justify-start align-start">
            <div class="mr-4 d-flex  flex-column align-center justify-start">
              <Button
                fab
                depressed
                class="{statuss[i] === STATUS_CORRECT
                  ? 'green white-text'
                  : statuss[i] === STATUS_UNOPTIMAL_FORM
                  ? 'orange white-text'
                  : 'red white-text'}"
              >
                <span style="font-size:{size}px;">{item.number}</span>
              </Button>

              
              <div class="flex-grow-1"></div>
            </div>
            <QuestionCard size="{$menuFontSize}" question="{item}" />
            <CorrectionItem
              item="{item}"
              addPoints="{addPoints}"
              details="{details}"
              classroom="{false}"
              size="{size}"
              bind:status="{statuss[i]}"
            />
          </div>
        </ListItem>
      {/each}
    </div>
  </div>

  <div class="{colorResult + ' d-flex align-center  justify-space-around'}">
    <div class="d-flex flex-column align-center">
      <div
        class="mt-2 mb-2 white-text"
        style="font-family:'pacifico';font-size:34px"
      >
        {messageResult}
      </div>
      <div style="font-size:22px" class="mt-2 mb-2  white-text">
        Score : {score}/{total}
      </div>
    </div>
    {#if percent === 1}
      <img alt="Great!" src="/images/great-150.png" />
    {:else if percent >= 0.8}
      <img alt="Good job!" src="/images/good-job-150.png" />
    {:else if percent >= 0.5}
      <img alt="Keep on!" src="/images/keep-on-150.png" />
    {:else}
      <img alt="Try again!" src="/images/try-again-150.png" />
    {/if}
  </div>
</div>

<style>
  /* pacifico-regular - latin */

  .container {
    padding-top: 15px;
    padding-bottom: 15px;
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
