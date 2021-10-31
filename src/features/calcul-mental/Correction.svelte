<script>
  import CorrectionItem from './CorrectionItem.svelte'
  import { ListItem, Button, Icon } from 'svelte-materialify/src'
  import { mdiHome, mdiLifebuoy, mdiReload, mdiScanHelper } from '@mdi/js'
  import Reveal from 'reveal.js'
  import { onMount } from 'svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { user } from '../../app/stores'
  import { calculMentalAssessment } from './stores'
  import { supabase } from '../../app/db'
  import { navigate } from 'svelte-routing'
  import { mode } from '../../app/stores'
  import {
    getStatus,
    STATUS_CORRECT,
    STATUS_UNOPTIMAL_FORM,
  } from './correction'
  import {
    good_class,
    not_complete_class,
    not_good_class,
  } from '../../app/colors'
  import { getLogger } from '../../app/utils'

  export let questions
  export let answers
  export let answers_latex
  export let answers_choice
  export let times
  export let restart
  export let query
  export let classroom
  export let size
  export let theme = ''
  export let domain = ''
  export let subdomain = ''
  export let level = 0

  const { info, fail } = getLogger('Correction', 'info')
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
  let comss = []

  // Quand le composant de correction a fini de s'afficher,
  // le score a déjà été calculé, on l'enregistre
  onMount(async () => {
    percent = score / total

    if (percent === 1) {
      colorResult = good_class
      messageResult = 'Perfect !'
    } else if (percent >= 0.9) {
      colorResult = good_class
      messageResult = 'Good Job !'
    } else if (percent >= 0.5) {
      colorResult = not_complete_class
      messageResult = 'Keep on !'
    } else {
      colorResult = not_good_class
      messageResult = 'Try again !'
    }

    assessment = $calculMentalAssessment

    //  sauvegarde de la progression dans le cas d'un exercice du menu
    if (isStudent && percent >= 0.9 && theme) {
      const currentLevel = $user.progression[theme][domain][subdomain]

      if (parseInt(level, 10) === currentLevel + 1) {
        const newProgression = { ...$user.progression }
        newProgression[theme][domain][subdomain] = parseInt(level, 10)
        info(
          `user ${$user.id} won level ${level} for ${theme} > ${domain} > ${subdomain}`,
        )

        const { data, error } = await supabase
          .from('progression')
          .update({ progression: newProgression })
          .eq('user_id', $user.id)

        if (error) {
          fail(error)
        } else {
          user.update((u) => {
            u.progression = newProgression
            return u
          })
          info(`progression updated for user ${$user.id}`, newProgression)
        }
      }
    } 
    // évaluation à sauvegarder
    else if (assessment && assessment.type === 'assessment') {
      
      const result = {
        mark: score,
        total: total,
        title: assessment.title,
        questions: items,
      }

      const { data, error } = await supabase
        .from('results')
        .insert([{ assessment_id: assessment.id, user_id: $user.id, result }])

      if (error) {
        fail(error)
      } else {
      
        let { data: students_assessments, error_get_assessments } =
          await supabase
            .from('users')
            .select('assessments')
            .eq('id', $user.id)
            .single()

        if (error_get_assessments) {
          fail(error_get_assessments)
        } else {
          students_assessments = students_assessments.assessments
          const index = students_assessments.indexOf(assessment.id)
          students_assessments.splice(index, 1)
          const { data, error_update } = await supabase
            .from('users')
            .upsert([{ id: $user.id, assessments: students_assessments }])

          if (error_update) {
            fail(error_update)
          } else {
            info('assessments results updated', data)
            $user.assessments.splice(
              $user.assessments.indexOf(assessment.id),
              1,
            )
          }
        }
      }
      // on vide la session de question à faire
      calculMentalAssessment.set(null)
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
      time: times[i],
      solutions: question.solutions,
      details: question.details,
      type: question.type,
      number: i + 1,
      points: question.points,
      options: question.options ? question.options : [],
      enounce: question.enounce,
      correction: question.correction,
      correctionFormat: question.correctionFormat,
      testAnswer: question.testAnswer,
      choices: question.choices,
    }
    comss[i] = []
    statuss[i] = getStatus(items[i], comss[i], classroom)
    switch (statuss[i]) {
      case STATUS_CORRECT:
        score += items[i].points
        break

      case STATUS_UNOPTIMAL_FORM:
        score += items[i].points / 2
        break

      default:
      // console.log('default case status')
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
  $: isLoggedIn = $user.id != 'guest'
  $: isTeacher = isLoggedIn && $user.roles.includes('teacher')
  $: isStudent = isLoggedIn && $user.roles.includes('student')
</script>

<div>
  <div class="mt-3 mb-3 d-flex justify-end">
    {#if help}
      <Button
        class="{displayHelp ? not_complete_class : ''} ml-2 mr-2"
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

  {#if classroom}
    <div class="d-flex" style="width:100%;overflow-x:auto;">
      <div class="d-flex flex-column" style="width:100%;overflow-x:auto;">
        <div>
          {#each items.filter((item, i) => i % 2 == 1) as item, i}
            <ListItem selectable="{false}">
              <div class="d-flex justify-start align-start">
                <div
                  class="mr-4 d-flex  flex-column align-center justify-start"
                >
                  <Button
                    fab
                    depressed
                    class="{statuss[i] === STATUS_CORRECT
                      ? good_class
                      : statuss[i] === STATUS_UNOPTIMAL_FORM
                      ? not_complete_class
                      : not_good_class}"
                  >
                    <span style="font-size:{size}px;">{item.number}</span>
                  </Button>

                  <!-- a div is necessary for the icon to center aligned -->
                  <!-- <div>
                  {#if correct}
                    <Icon
                      class="mt-2 green-text"
                      style="font-size:{$fontSize}px;"
                      path="{mdiCheckCircle}"
                    />
                  {:else}
                    <Icon
                      class="mt-2 red-text"
                      style="font-size:{$fontSize}px;"
                      path="{mdiCloseCircle}"
                    />
                  {/if}
                </div> -->
                  <div class="flex-grow-1"></div>
                </div>
                <CorrectionItem
                  item="{item}"
                  details="{details}"
                  size="{size}"
                  status="{statuss[i]}"
                  coms="{comss[i]}"
                />
              </div>
            </ListItem>
          {/each}
        </div>
      </div>
    </div>
  {:else}
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
                    ? good_class
                    : statuss[i] === STATUS_UNOPTIMAL_FORM
                    ? not_complete_class
                    : not_good_class}"
                >
                  <span style="font-size:{size}px;">{item.number}</span>
                </Button>

                <!-- a div is necessary for the icon to center aligned -->
                <!-- <div>
              {#if correct}
                <Icon
                  class="mt-2 green-text"
                  style="font-size:{$fontSize}px;"
                  path="{mdiCheckCircle}"
                />
              {:else}
                <Icon
                  class="mt-2 red-text"
                  style="font-size:{$fontSize}px;"
                  path="{mdiCloseCircle}"
                />
              {/if}
            </div> -->
                <div class="flex-grow-1"></div>
              </div>
              <CorrectionItem
                item="{item}"
                details="{details}"
                size="{size}"
                status="{statuss[i]}"
                coms="{comss[i]}"
              />
            </div>
          </ListItem>
        {/each}
      </div>
    </div>
  {/if}

  {#if $mode !== 'classroom'}
    <div class="{colorResult + ' d-flex align-center  justify-space-around'}">
      <div class="d-flex flex-column align-center">
        {#if !assessment || assessment.type !== 'assessment'}
          <Button
            class="ma-2 white black-text"
            fab
            size="x-small"
            on:click="{() => (restart = true)}"
          >
            <Icon path="{mdiReload}" />
          </Button>
        {/if}
        <Button
          class="ma-2 white black-text"
          fab
          size="x-small"
          on:click="{() => navigate('/calcul-mental' + query)}"
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
        <div style="font-size:22px" class="mt-2 mb-2">
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
  {/if}
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
