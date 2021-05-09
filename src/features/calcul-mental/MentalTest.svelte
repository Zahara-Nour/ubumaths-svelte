<script>
  import Question from './Question.svelte'
  import generate from './generateQuestion'
  import CircularProgress from '../../components/CircularProgress.svelte'
  import { Button } from 'svelte-materialify/src'
  import { onDestroy, onMount, afterUpdate } from 'svelte'
  import Correction from './Correction.svelte'
  import qs from './questions'
  import queryString from 'query-string'
  import virtualKeyboard from './virtualKeyboard'
  import { calculMentalAssessment } from './stores'
  import { shuffle } from '../../app/utils'
  import { fontSize, user } from '../../app/stores'
  import { getDocument } from '../../app/db'
  import { tick } from 'svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  

  export let location
  // console.log('location', location)

  let question = {}
  let questions
  let current = -1
  let answer
  let answer_latex
  let answer_choice
  let answers = []
  let answers_latex = []
  let answers_choice = []
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
  let choices

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.latexToMarkup(p1)

  function countDown() {
    elapsed = Date.now() - start
  }

  onMount(() => {
    if (mf) {
      mf.setOptions({
        virtualKeyboardMode: 'onfocus',
        ...virtualKeyboard,
      })
      if (!mf.hasFocus) mf.focus()
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
    answer_latex = choice
    answer_choice  = choice
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

  $: if (generated && mf && !mf.hasFocus()) {
    
    mf.focus()
  }

  $: if (generated && generated.choices) {
    
      choices = generated.choices.map((c) => c.replace(regex, replacement))
  
    } else {
      choices = null
    }

  function onKeystroke(e) {
    const keystroke = e.detail.keystroke
    if (keystroke === '[Enter]' || keystroke === '[NumpadEnter]') {
      // answer = mf.getValue('ASCIIMath')
      // answer_latex = mf.getValue()
      change()
    }
  }

  function onChangeMathField(e) {
    // utile dans le cas d'une expression mal formée
    // console.log('***change****')
    answer_latex = mf.getValue()
    answer = mf.getValue('ASCIIMath')
  }

  async function change() {
    if (timer) clearInterval(timer)
    if (timeout) clearTimeout(timeout)
    if (current >= 0) {
      answers[current] = answer
      answers_latex[current] = answer_latex
      answers_choice[current] = answer_choice
    }
    if (current < questions.length - 1) {
      if (mf) {
        mf.setValue('')
        if (!mf.hasFocus()) mf.focus()
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
    answers_choice="{answers_choice}"
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
    {#if choices}
      <div class="mt-3 d-flex justify-center" style="width:100%;">
        {#each choices as choice,i}
          <Button class="ml-3 mr-3" on:click="{() => onChoice(generated.choices[i])}">
            <div>{@html choice}</div>
          </Button>
        {/each}
      </div>
    {:else}
      <span class="mr-4" style="font-size:{$fontSize}px;">Ta réponse:</span>
      <math-field
        style="width:50%;font-size:{$fontSize}px;"
        virtual-keyboard-theme="apple"
        on:input="{onChangeMathField}"
        on:keystroke="{onKeystroke}"
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
