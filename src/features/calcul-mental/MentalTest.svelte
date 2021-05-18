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
  import { isTouchScreendevice, shuffle } from '../../app/utils'
  import { fontSize, user } from '../../app/stores'
  import { getDocument } from '../../app/db'
  import { tick } from 'svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { math } from 'tinycas/build/math/math'

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
  let correct = false

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.latexToMarkup(p1)

  function countDown() {
    elapsed = Date.now() - start
  }

  onMount(() => {
    if (mf) {
      mf.setOptions({
        // virtualKeyboardMode: 'onfocus',
        virtualKeyboardMode: 'auto',
        ...virtualKeyboard,
        onKeystroke,
        'keypress-sound': 'none',
        'keypress-vibration': false,
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
    answer_choice = choice
    change()
  }

  function recordAnswer() {
    answer_latex = mf
      .getValue()
      .replace(/\s/g, '')
      .replace(/(\\,){2,}/g, '\\,') // Mathlive rajoute ' ' après \,
    answer = mf.getValue('ASCIIMath').replace(/xx/g, '*')
    // console.log(`answer-latex "${answer_latex}"`)
  }

  function commit() {
    recordAnswer()
    change()
  }

  function onKeystroke(mathfield, keystroke, e) {
    const allowed = 'azertyuiopsdfghjklmwxcvbn0123456789,=<>/*-+()^%'

    if (keystroke === '[Enter]' || keystroke === '[NumpadEnter]') {
      commit()
      return false
    } else if (
      keystroke === '[Space]' &&
      !(
        answer_latex &&
        answer_latex.length >= 2 &&
        // answer_latex.slice(answer_latex.length - 3) === '\\, '
        answer_latex.slice(answer_latex.length - 2) === '\\,'
      )
    ) {
      mf.insert('\\,')
      return false
    } else if (e.key === '*') {
      mf.insert('\\times')
      return false
    } else if (e.key === ':') {
      mf.insert('\\div')
      return false
    } else if (e.key === '<') {
      mf.insert('<')
      // prevent backslash
      return false
    }
    // else if (e.key === '^') {
    //   mf.insert('^')
    //   return true
    // }
    else if (
      e.key === 'Backspace' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowDown' ||
      e.key === 'ArrowUp'
    ) {
      return true
    } else if (!allowed.includes(e.key)) {
      return false
    }
    // deactivate command mode with '\'
    // else if (keystroke ==='alt+shift+[Period]') {
    // else if (e.key ==='\\') {
    //   return false
    // }
    return true
  }

  function onChangeMathField(e) {
    // utile dans le cas d'une expression mal formée
    recordAnswer()
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

  $: {
    console.log('answer', answer)
    correct = math(answer).type !== '!! Error !!'
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
  <div class="mt-6 mb-6">
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

  <div class="d-flex align-center justify-center">
    {#if choices}
      <div class="mt-3 d-flex justify-center" style="width:100%;">
        {#each choices as choice, i}
          <Button
            class="ml-3 mr-3"
            on:click="{() => onChoice(generated.choices[i])}"
          >
            <div style="font-size:{$fontSize + 4}px;">{@html choice}</div>
          </Button>
        {/each}
      </div>
    {:else}
      <div
        class="mt-16 d-flex flex-row align-center justify-center"
        style="max-width:500px;width:100%"
      >
        <span class="mr-4" style="font-size:{$fontSize}px;">Ta réponse:</span>
        <div class="flex-grow-1">
          <math-field
            style="width:100%;font-size:{$fontSize}px;"
            class="{correct
              ? 'pa-2 light-green lighten-5'
              : 'pa-2 deep-orange lighten-5'}"
            virtual-keyboard-theme="apple"
            on:input="{onChangeMathField}"
            on:change="{commit}"
            bind:this="{mf}"
          >
          </math-field>
        </div>
      </div>
    {/if}
  </div>
{:else}
  Pas de questions
{/if}

<style>
  .error {
    border: 5px solid red;
  }
</style>
