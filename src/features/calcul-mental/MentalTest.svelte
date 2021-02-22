<script>
  import Question from './Question.svelte'
  import generate from './generateQuestion'
  import CircularProgress from '../../components/CircularProgress.svelte'
  import { Button } from 'svelte-materialify/src'
  import { onDestroy, onMount } from 'svelte'
  import Correction from './Correction.svelte'
  import qs from './questions'
  import queryString from 'query-string'

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

  export let location
  console.log('location', location)

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
  let type
  let domain
  let theme
  let level

  function countDown() {
    elapsed = Date.now() - start
  }

  onMount(() => {
    mf.setOptions({
      virtualKeyboardMode: 'onfocus',
      customVirtualKeyboardLayers: {
        'layer-name': {
          styles: '',
          rows: [
            [
              {
                class: 'keycap',
                latex: '\\frac{x}{y}',
              },
            ],
          ],
        },
        'layer-name2': {
          styles: '',
          rows: [
            [
              {
                class: 'keycap',
                latex: '7',
              },
              {
                class: 'keycap',
                latex: '8',
              },
              {
                class: 'keycap',
                latex: '9',
              },
              {
                class: 'keycap',
                latex: '\\div',
              },
            ],
            [
              {
                class: 'keycap',
                latex: '4',
              },
              {
                class: 'keycap',
                latex: '5',
              },
              {
                class: 'keycap',
                latex: '6',
              },
              {
                class: 'keycap',
                latex: '\\times',
              },
              
            ],
            [
              {
                class: 'keycap',
                latex: '1',
              },
              {
                class: 'keycap',
                latex: '2',
              },
              {
                class: 'keycap',
                latex: '3',
              },
              {
                class: 'keycap',
                latex: '-',
              },
            ],
            [
              {
                class: 'keycap',
                latex: '0',
              },
              {
                class: 'keycap',
                latex: ',',
              },
              {
                class: 'keycap',
                latex: '=',
              },
              {
                class: 'keycap',
                latex: '+',
              },
            ],
          ],
        },
      },
      customVirtualKeyboards: {
        'keyboard-name': {
          label: 'Json',
          tooltip: 'Json keyboard',
          layer: 'layer-name',
        },
        'keyboard-name2': {
          label: 'Json2',
          tooltip: 'Json keyboard',
          layer: 'layer-name2',
        },
      },
      virtualKeyboards: 'all keyboard-name2 ',
    })
    mf.focus()
    
  })

  onDestroy(() => {
    if (timer) clearInterval(timer)
    if (timeout) clearTimeout(timeout)
  })

  $: {
    queryParams = queryString.parse(location.search)
    console.log('queryParams', queryParams)
    type = queryParams.type
    domain = queryParams.domain
    theme = queryParams.theme
    level = queryParams.level
    if (theme && domain && type && level) {
      questions = qs[theme][domain][type]
      questions = questions.filter(
        (q) => questions.indexOf(q) + 1 === parseInt(level, 10),
      )
      for (let i = 0; i < 9; i++) questions.push(questions[0])
      console.log('questions', questions)
    } else {
      questions = qs['Entiers']['Addition']['A trous']
    }
  }

  $: {
    if (delay >= elapsed) {
      percentage = ((delay - elapsed) * 100) / delay
    }
  }

  $: if (questions.length) {
    generateds = []
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
  <div
    style="display:inline-block;margin-top:40px;margin-bottom:20px;right:20px;position:absolute"
  >
    <Button on:click="{change}">Valider</Button>
  </div>
{/if}

<style>
  .error {
    border: 5px solid red;
  }
</style>
