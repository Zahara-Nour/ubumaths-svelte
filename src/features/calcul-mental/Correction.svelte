<script>
  import CorrectionItem from './CorrectionItem.svelte'
  import { Button, Icon } from 'svelte-materialify/src'
  import { mdiCloudDownloadOutline, mdiHome, mdiLifebuoy, mdiReload, mdiScanHelper, mdiProjectorScreen } from '@mdi/js'
  import Reveal from 'reveal.js'
  import { onMount } from 'svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { fontSize, user } from '../../app/stores'
  import { calculMentalAssessment } from './stores'
  import { saveDocument } from '../../app/db'
import { navigate } from 'svelte-routing';

  export let questions
  export let answers
  export let answers_latex
  export let answers_choice
  export let restart
  export let query
  export let classroom
  export let size = $fontSize


  const help = questions[0].help
  let score = 0
  let total = 0
  let details = false
  const items = []
  const toggleDetails = () => (details = !details)

  let colorResult
  let messageResult

  $: percent = total ? score / total : null

  $: if (percent === 1) {
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

  onMount(async () => {
    const assessment = $calculMentalAssessment
    if (assessment) {
      //on sauvegarde la note dans les données de l'élève
      const result = {
        mark: score,
        total: total,
      }
      $user.results[assessment.id] = result

      saveDocument({
        path: 'Users',
        document: {
          id: $user.id,
          [`results.${assessment.id}`]: result,
        },
      })

      //puis dans les données du professeur
      saveDocument({
        path: `Users/${$user.teacher}/Results`,
        document: {
          id: assessment.id,
          [`${$user.classroom}.${$user.id}`]: result,
        },
      })

      //on enlève l'évaluation de la liste des évaluations
      await saveDocument({
        path: 'Users/',
        document: {
          id: $user.id,
          assessments: firebase.firestore.FieldValue.arrayRemove(assessment.id),
        },
      })
    }
  })

  function addPoints(points) {
    score += points
  }

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]
    total += question.points
    items[i] = {
      qexp: question.expression,
      qexp_latex: question.expression_latex,
      answer: answers[i],
      answer_latex: answers_latex[i],
      answer_choice: answers_choice[i],
      solutions: question.solutions,
      details: question.details,
      type: question.type,
      number: i + 1,
      points: question.points,
      options: question.options,
      enounce: question.enounce,
      correction: question.correction,
      correctionFormat:question.correctionFormat,
      testAnswer:question.testAnswer,
      choices:question.choices
    }
    console.log('items', items )
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
      {#each items as item}
        <CorrectionItem
          item="{item}"
          addPoints="{addPoints}"
          details="{details}"
          classroom={classroom}
          size={size}
        />
      {/each}
    </div>
  </div>

  <div class="{colorResult + ' d-flex align-center  justify-space-around'}">
    <div class="d-flex flex-column align-center">
      <Button
        class="ma-2 white"
        fab
        size="x-small"
        on:click="{() => restart = true}"
      >
        <Icon path="{mdiReload}" />
      </Button>
      <Button
        class="ma-2 white"
        fab
        size="x-small"
        on:click="{() => navigate('/calcul-mental'+query)}"
      >
        <Icon path="{mdiHome}" />
      </Button>
    </div>
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
