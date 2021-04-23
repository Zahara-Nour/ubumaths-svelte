<script>
  import Question from './Question.svelte'
  import generate from './generateQuestion'
  import CircularProgress from '../../components/CircularProgress.svelte'
  import { Button } from 'svelte-materialify/src'
  import { onDestroy, onMount } from 'svelte'
  import Correction from './Correction.svelte'
  import qs from './questions'
  import queryString from 'query-string'
  import virtualKeyboard from './virtualKeyboard'
  import { calculMentalAssessment } from './stores'
  import { shuffle } from '../../app/utils'
  import { fontSize, user } from '../../app/stores'
  import { getDocument } from '../../app/db'

  export let location
  // console.log('location', location)

  let question = {}
  let questions
  let answer
  let answer_latex
  let current = -1
  let answers = []
  let answers_latex = []
  let generated
  let generateds = []
  let delay
  let elapsed
  let start
  let percentage
  let timer, timeout
  let mf
  let error = true
  let finish = false
  let queryParams
  let subdomain
  let domain
  let theme
  let level
  let assessmentId

  function countDown() {
    elapsed = Date.now() - start
  }

  onMount(() => {
    if (mf) {
      mf.setOptions({
        virtualKeyboardMode: 'onfocus',
        ...virtualKeyboard,
      })
      mf.focus()
    }
  })

  onDestroy(() => {
    if (timer) clearInterval(timer)
    if (timeout) clearTimeout(timeout)
  })

  function getQuestion(theme, domain, subdomain, level) {
    return qs[theme][domain][subdomain].find(
      (q) =>
        qs[theme][domain][subdomain].indexOf(q) + 1 === parseInt(level, 10),
    )
  }

  function initTest(location) {
    finish = false
    queryParams = queryString.parse(location.search)
    console.log('queryParams', queryParams)
    subdomain = queryParams.subdomain
    domain = queryParams.domain
    theme = queryParams.theme
    level = queryParams.level
    assessmentId = queryParams.assessmentId
    questions = []

    if (theme && domain && subdomain && level) {
      const question = getQuestion(theme, domain, subdomain, level)
      if (question.options && question.options.includes('exhaust')) {
        for (let i = 0; i < question.expressions.length; i++) {
          questions[i] = {
            ...question,
            expressions: [question.expressions[i]],
            solutions: question.solutions ? [question.solutions[i]] : null,
          }
        }
      } else {
        for (let i = 0; i < 10; i++) questions.push(question)
      }
    } else if ($calculMentalAssessment) {
      $calculMentalAssessment.questions.forEach((element) => {
        for (let i = 0; i < element.count; i++) {
          questions.push(
            getQuestion(
              element.theme,
              element.domain,
              element.subdomain,
              element.level,
            ),
          )
        }
      })

      shuffle(questions)
    }
    console.log('questions', questions)
  }

  function onChoice(choice) {
    answer = choice
    change()
  }

  $: initTest(location)

  $: if (delay >= elapsed) {
    percentage = ((delay - elapsed) * 100) / delay
  }

  $: if (questions && questions.length) {
    generateds = []
    change()
  }

  $: if (finish) {
  }

  function onChangeMathField(e) {
    // utile dans le cas d'une expression mal formée
    answer_latex = mf.getValue()
    answer = mf.getValue('ASCIIMath')
  }

  function change() {
    if (timer) clearInterval(timer)
    if (timeout) clearTimeout(timeout)
    if (current >= 0) {
      answers[current] = answer
      answers_latex[current] = answer_latex
    }
    if (current < questions.length - 1) {
      if (mf) {
        mf.setValue('')
        mf.focus()
      }
      answer = ''
      current++
      question = questions[current]
      generated = generate(question, generateds)
      if (generateds) generateds.push(generated)
      delay = question.defaultDelay * 1000
      percentage = 100
      start = Date.now()
      timer = setInterval(countDown, 10)
      timeout = setTimeout(change, delay)
    } else {
      finish = true
    }
  }
</script>

{#if finish}
  <Correction
    questions="{generateds}"
    answers="{answers}"
    answers_latex="{answers_latex}"
  />
{:else if generated}
  <div class="mt-3 mb-3">
    <CircularProgress
      number="{current + 1}"
      fontSize="{$fontSize + 8}"
      strokeWidth="{5}"
      percentage="{percentage}"
    />
  </div>
  <div class="mt-5 mb-5">
    <Question question="{generated}" />
  </div>
  <!-- <div class:error> -->

  <div class="d-flex align-center">
    {#if generated.choices}
      <div class="mt-3 d-flex justify-center" style='width:100%;'>
        {#each generated.choices as choice}
          <Button class='ml-3 mr-3' on:click="{() => onChoice(choice)}">
            {choice}
          </Button>
        {/each}
      </div>
    {:else}
      <span class="mr-4" style="font-size:{$fontSize}px;">Ta réponse:</span>
      <math-field
        style="width:50%;font-size:{$fontSize}px;"
        virtual-keyboard-mode="onfocus"
        virtual-keyboard-theme="apple"
        on:input="{onChangeMathField}"
        bind:this="{mf}"
      >
      </math-field>
    {/if}
  </div>

  {#if !generated.choices}
    <!-- </div> -->
    <div
      style="display:inline-block;margin-top:40px;margin-bottom:20px;right:20px;position:absolute"
    >
      <Button on:click="{change}">Valider</Button>
    </div>
  {/if}

{:else}
  Pas de questions
{/if}

<style>
  .error {
    border: 5px solid red;
  }
</style>
