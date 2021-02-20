<script>
  import Question from './Question.svelte'
  import generate from './generateQuestion'
  import CircularProgress from '../../components/CircularProgress.svelte'
  import { Button } from 'svelte-materialify/src'
  import { onMount } from 'svelte'
  import { math } from 'tinycas/build/math/math'
  import Correction from './Correction.svelte'
  import q from './questions'

  // export let questions = [
  //   {
  //     delay: 10,
  //     expressions: ['3 * 4'],
  //     solutions: ['12'],
  //     variables: {},
  //     type: 'result',
  //     id: '1',
  //     points: 1,
  //   },
  //   {
  //     delay: 10,
  //     expressions: ['&1 * &2'],
  //     solutions: ['#{&1*&2}'],
  //     variables: { '&1': '$e[2;9]', '&2': '$e[2;9]' },
  //     type: 'result',
  //     id: '2',
  //     points: 1,
  //   },
  // ]

  const questions = q['Entiers']['Addition']['Compléments']

  let question = {}
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
  let score

  function countDown() {
    elapsed = Date.now() - start
  }

  onMount(() => {
    mf.focus()
  })

  $: {
    if (delay >= elapsed) {
      percentage = ((delay - elapsed) * 100) / delay
    }
  }

  $: if (questions.length) {
    change()
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
      generated = generate(question)
      generateds.push(generated)
      delay = question.defaultDelay * 1000
      percentage = 100
      start = Date.now()
      timer = setInterval(countDown, 10)
      timeout = setTimeout(change, delay)
    } else {
      finish = true
    }
  }

  $: console.log('generated', generated)
</script>

{#if finish}
  <Correction
    questions="{generateds}"
    answers="{answers}"
    answers_latex="{answers_latex}"
  />
{:else}
  <div style="margin-top:10px;margin-bottom:10px">
    <CircularProgress
      number="{current + 1}"
      fontSize="{24}"
      strokeWidth="{5}"
      percentage="{percentage}"
    />
  </div>
  <div style="margin-top:20px;margin-bottom:20px">
    <Question question="{generated}" />
  </div>
  <!-- <div class:error> -->
  <div style="display:flex;align-items:center">
    <span style="margin-right:15px">Ta réponse:</span>
    <math-field
      style="width:50%"
      virtual-keyboard-mode="onfocus"
      virtual-keyboards="numeric roman"
      virtual-keyboard-theme="apple"
      on:input="{onChangeMathField}"
      bind:this="{mf}"></math-field>
  </div>
  <!-- </div> -->
  <div style="display:inline-block;margin-top:40px;margin-bottom:20px;right:20px;position:absolute">
  <Button on:click="{change}">Valider</Button>
</div>
{/if}

<style>
  .error {
    border: 5px solid red;
  }
</style>
