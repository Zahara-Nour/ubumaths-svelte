<script context="module">
  import Viewport from 'svelte-viewport-info'
</script>

<script>
  import Question from './Question.svelte'
  import generate from './generateQuestion'
  import CircularProgress from '../../components/CircularProgress.svelte'
  import { Button, Icon, Slider } from 'svelte-materialify/src'
  import { onDestroy, onMount } from 'svelte'
  import Correction from './Correction.svelte'
  import datas from './questions.js'
  import queryString from 'query-string'
  import virtualKeyboard from './virtualKeyboard'
  import { calculMentalAssessment } from './stores'
  import { getLogger, shuffle } from '../../app/utils'
  import {
    mode,
    testFontSize,
    classroomFontSize,
    handleKeydown,
  } from '../../app/stores'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { math } from 'tinycas/build/math/math'
  import Exemple from './Exemple.svelte'
  import { mdiRocketLaunchOutline, mdiRestart } from '@mdi/js'
  import { fetchImage } from './images'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'

  export let location
  const qs = datas.questions
  const ids = datas.ids
  let audio = new Audio('sounds/ressort.mp3')
  let { info, fail, trace } = getLogger('MentalTest', 'trace')
  let question = {}
  let questions
  let current = 0
  let answer
  let answer_latex
  let answer_choice
  let answers = []
  let answers_latex = []
  let answers_choice = []
  let times = []
  // let generated
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
  // let choices
  let correct = false
  let restart = false
  let classroom
  let selectionRef
  let pause = false
  let previous
  let showExemple = false
  let showCorrection = false
  let generatedExemple
  let images = []
  let grade
  let alert
  let slider
  let min = 0,
    max = 60
  let cards
  let card
  let orientation = Viewport.Orientation

  trace(
    'Viewport Width x Height:     ',
    Viewport.Width + 'x' + Viewport.Height,
  )
  trace('standard Screen Orientation: ', Viewport.Orientation)
  trace('detailled Screen Orientation:', Viewport.detailledOrientation)

  const togglePause = () => {
    if (pause) {
      start = Date.now()
    } else {
      previous = elapsed
    }
    pause = !pause
  }

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (_, p1) => Mathlive.convertLatexToMarkup(p1)

  function countDown() {
    if (!pause) {
      elapsed = Date.now() - start + previous
      if (delay >= elapsed) {
        percentage = ((delay - elapsed) * 100) / delay
        if (delay - elapsed < 5000) alert = true
      } else {
        change()
      }
    }
  }

  onDestroy(() => {
    if (timer) clearInterval(timer)
    // if (timeout) clearTimeout(timeout)
    handleKeydown.set(() => {})
  })

  function initMathField() {
    
    mf.setOptions({
      // virtualKeyboardMode: 'onfocus',
      decimalSeparator:",",
      virtualKeyboardMode: 'auto',
      ...virtualKeyboard,
      // onKeystroke,
      inlineShortcuts: {
        xx: {},
      },
    })
    mf.addEventListener('keystroke', onKeystroke)
    if (!mf.hasFocus) mf.focus()
  }

  function getQuestion(theme, domain, subdomain, level) {
    // on retourne une copie car on doit modifier les questions à la volée
    return {
      ...qs[theme][domain][subdomain].find(
        (q) =>
          qs[theme][domain][subdomain].indexOf(q) + 1 === parseInt(level, 10),
      ),
    }
  }

  function initTest() {
    info('init test')
    current = 0
    restart = false
    finish = false
    generateds = []
    answers = []
    answers_latex = []
    answers_choice = []
    queryParams = queryString.parse(location.search)
    subdomain = queryParams.subdomain
    domain = queryParams.domain
    theme = queryParams.theme
    level = queryParams.level
    classroom = queryParams.classroom === 'true'
    showCorrection = !classroom
    $mode = classroom ? 'classroom' : 'test'
    assessmentId = queryParams.assessmentId
    questions = []
    generateds = []

    if (queryParams.questions) {
      let offset = 0
      const data = JSON.parse(queryParams.questions)

      data.forEach((d) => {
        questions = []
        const { theme, domain, subdomain, level } = ids[d.id]
        const question = getQuestion(theme, domain, subdomain, level)
        question.delay = d.delay

        for (let i = 0; i < d.count; i++) {
          questions.push(question)
        }
        console.log('questions', questions)
        generateds = generateds.concat(
          questions.reduce((acc, current) => {
            const q = generate(current, acc, d.count, offset)
            acc.push(q)
            return acc
          }, []),
        )
        offset += d.count
      })
    } else if (queryParams.course) {
      const course = JSON.parse(queryParams.course)
      console.log(course)

      course.forEach((id) => {
        const { theme, domain, subdomain, level } = ids[id]
        const question = getQuestion(theme, domain, subdomain, level)
        questions.push({
          ...question,
          delay: 15,
        })
      })

      generateds = generateds.concat(
        questions.reduce((acc, current) => {
          const q = generate(current, acc)
          acc.push(q)
          return acc
        }, []),
      )
    }
    // 1 seul exercice a été selectionné par l'intermédiaire du menu
    else if (theme && domain && subdomain && level) {
      const question = getQuestion(theme, domain, subdomain, level)

      // cas où les différentes questions sont écrites en dur
      // if (question.options && question.options.includes('exhaust')) {

      //   const n = Math.min(question.expressions.length, 10)

      //   const indices = []
      //   question.expressions.forEach((_, i) => {
      //     indices.push(i)
      //   })
      //   shuffle(indices)

      //   for (let i = 0; i < n; i++) {
      //     const indice = indices.pop()
      //     generateds[i] = {
      //       ...question,
      //       expressions: [question.expressions[indice]],
      //       solutions: question.solutions ? [question.solutions[indice]] : null,
      //     }

      //   }

      // }
      // // on, répète 10 fois la question de l'exercice
      // else {
      const count = 10
      for (let i = 0; i < count; i++) questions.push(question)
      generateds = generateds.concat(
        questions.reduce((acc, current) => {
          const q = generate(current, acc, count)
          acc.push(q)
          return acc
        }, []),
      )
      // }
    }

    // les questions ont été passée par un store
    else {
      let offset = 0
      $calculMentalAssessment.questions.forEach((element) => {
        questions = []
        const question = getQuestion(
          element.theme,
          element.domain,
          element.subdomain,
          element.level,
        )
        question.delay = element.delay

        for (let i = 0; i < element.count; i++) {
          questions.push(question)
        }
        generateds = generateds.concat(
          questions.reduce((acc, current) => {
            const q = generate(current, acc, element.count, offset)
            acc.push(q)
            return acc
          }, []),
        )
        offset += element.count
      })
    }
    shuffle(generateds)

    generateds.forEach(async (q) => {
      if (q.image) {
        q.imageBase64P =  fetchImage(q.image)
      }
      if (q.imageCorrection) {
        q.imageCorrectionBase64P =  fetchImage(q.imageCorrection)
      }
      if (q.choices) {
        q.choices.forEach(async (choice) => {
          if (choice.image) {
            choice.imageBase64P =  fetchImage(choice.image)
          }
        })
      }
    })

    console.log('generateds', generateds)
    cards = generateds.map((generated) => {
      const card = { ...generated }
      if (card.choices) {
        card.choices = card.choices.map((c) => {
          const choice = { ...c }
          if (c.text) {
            choice.markup = c.text.replace(regex, replacement)
          }
          return choice
        })
      }
      return card
    })
    cards.unshift(null)
    if (classroom && theme) {
      showExemple = true
      generatedExemple = generate(getQuestion(theme, domain, subdomain, level))
    } else {
      change()
    }

    info('Begining test with questions :', cards)
  }

  function onChoice(choice) {
    // answer = choice
    // answer_latex = choice
    answer_choice = choice
    change()
  }

  function recordAnswer() {
    // console.log('mf value', mf.value)
    answer_latex = mf
      .getValue()
      // on remplace plusieurs espaces par un seul, bizarrz normalement pas besoin
      .replace(/(\\,){2,}/g, '\\,')
      .trim()
    answer = mf.getValue('ascii-math')
    answer = answer
      // .replace(/xx/g, '*')
      .replace(/÷/g, ':')
      .replace(/\((\d+(,\d+)*)\)\//g, (_, p1) => p1 + '/')
      .replace(/\(([a-z])\)\//g, (_, p1) => p1 + '/')
      .replace(/\/\((\d+(,\d+)*)\)/g, (_, p1) => '/' + p1)
      .replace(/\/\(([a-z])\)/g, (_, p1) => '/' + p1)
      .trim()
    trace(`answer latex: ${answer_latex} asccii: ${answer}`)
  }

  function commit() {
    recordAnswer()
    change()
  }

  function beginTest() {
    if (classroom) {
      handleKeydown.set((event) => {
        event.preventDefault()
        if (event.code === 'Space') {
          togglePause()
        } else if (event.code === 'ArrowRight') {
          change()
        }
      })
    }
    showExemple = false
    change()
  }

  function onKeystroke(ev) {
    const allowed = 'azertyuiopsdfghjklmwxcvbn0123456789,=<>/*-+()^%€L'
    const keystroke = ev.detail.keystroke
    const key = ev.detail.event.key
    trace('keystroke', keystroke)
    trace('key', key)
    // if (keystroke === '[Enter]' || keystroke === '[NumpadEnter]') {
    //   trace('answer :' + answer + '!')
    //   if (answer !== '') {
    //     trace('going to commit')
    //     commit()
    //   }
    //   return false
    // } else
    if (
      keystroke === '[Space]' &&
      !(
        answer_latex &&
        answer_latex.length >= 2 &&
        answer_latex.slice(answer_latex.length - 2) === '\\,'
      )
    ) {
      mf.insert('\\,')
      return false
    } else if (key === '%') {
      mf.insert('\\%')
      return false
    } else if (key === 'r') {
      mf.insert('\\sqrt')
      return false
    } else if (key === '*') {
      mf.insert('\\times ')
      return false
    } else if (key === ':') {
      mf.insert('\\div ')
      return false
    } else if (key === '<') {
      mf.insert('<')
      return false
    } else if (
      key === 'Backspace' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight' ||
      key === 'ArrowDown' ||
      key === 'ArrowUp'
    ) {
      return true
    } else if (!allowed.includes(key)) {
      return false
    }

    return true
  }

  function onChangeMathField(e) {
    // utile dans le cas d'une expression mal formée
    recordAnswer()
  }

  // on passe à la question suivante
  async function change() {
    current++
    audio.play()
    if (timer) clearInterval(timer)
    // if (timeout) clearTimeout(timeout)

    if (cards.length <= generateds.length) {
      answers.push(answer)
      answers_latex.push(answer_latex)
      answers_choice.push(answer_choice)
      let time = Math.min(Math.round(elapsed / 1000), delay)
      if (time === 0) time = 1
      times.push(time)
    }
    if (cards.length > 1) {
      if (mf) {
        mf.setValue('')
        if (!mf.hasFocus()) mf.focus()
      }
      answer = ''
      answer_latex = ''
      answer_choice = null

      cards = [...cards.slice(1, cards.length)]
      card = cards[0]

      // generated = generate(question, generateds)
      // if (generateds) generateds.push(generated)
      if (slider && theme && domain && subdomain && level) {
        delay = slider * 1000
      } else {
        delay = card.delay ? card.delay * 1000 : card.defaultDelay * 1000
        slider = delay / 1000
      }
      percentage = 0
      alert = false
      start = Date.now()
      previous = 0
      timer = setInterval(countDown, 10)
    } else {
      finish = true
      // mathlive bug : virtual keyboard still displays otherwise
      if (mf) mf.blur()
    }
  }

  function handleViewportChanged() {
    trace(
      'Viewport Size changed to: ',
      Viewport.Width + 'x' + Viewport.Height,
    )
  }

  function handleOrientationChanged() {
    orientation =
      Viewport.Orientation +
      (Viewport.detailledOrientation == null
        ? ''
        : '(' + Viewport.detailledOrientation + ')')
    trace('$' + orientation + '$')
  }

  initTest()

  // le bouton restart a été appuyé après la correction
  $: if (restart) {
    initTest()
  }

  $: if (mf) {
    initMathField()
  }

  $: if (card && mf && !mf.hasFocus()) {
    mf.focus()
  }

  // test pour vérifier que l'expression est bien formée à chaque frappe
  $: if (answer) {
    correct = math(answer).type !== '!! Error !!'
  }

  $: delay = slider * 1000
</script>

<svelte:body
  on:viewportchanged="{handleViewportChanged}"
  on:orientationchangeend="{handleOrientationChanged}" />

{#if showExemple}
  <Exemple question="{generatedExemple}" classroom="{true}" />
  <div class="mt-2 d-flex justify-end">
    <Button
      class="ml-2 mr-2 amber darken-2 white-text"
      fab
      on:click="{() => {
        generatedExemple = generate(
          getQuestion(theme, domain, subdomain, level),
        )
      }}"
    >
      <Icon path="{mdiRestart}" />
    </Button>
    <Button
      class="ml-2 mr-2 amber darken-2 white-text"
      fab
      on:click="{() => beginTest()}"
    >
      <Icon path="{mdiRocketLaunchOutline}" />
    </Button>
  </div>
{:else if finish}
  {#if showCorrection}
    <Correction
      questions="{generateds}"
      answers="{answers}"
      answers_latex="{answers_latex}"
      answers_choice="{answers_choice}"
      times="{times}"
      query="{location.search}"
      classroom="{classroom}"
      size="{classroom ? $classroomFontSize : $testFontSize}"
      bind:restart
      theme="{theme}"
      domain="{domain}"
      subdomain="{subdomain}"
      level="{level}"
    />
  {:else}
    <div style="height:90vh" class="d-flex justify-center align-center">
      <Button
        on:click="{() => {
          showCorrection = true
        }}"
      >
        Afficher la correction
      </Button>
    </div>
  {/if}
{:else if card}
  <div>
    <div class="{' mt-1 mb-1 d-flex justify-start'}">
      <CircularProgress
        number="{current}"
        fontSize="{classroom ? $classroomFontSize : $testFontSize + 8}"
        strokeWidth="{7}"
        percentage="{percentage}"
        pulse="{alert}"
      />
      {#if slider && classroom}
        <Slider
          min="{min}"
          max="{max}"
          style="width:100px;"
          thumb
          bind:value="{slider}"
          color="orange"
          thumbClass="orange"
        />
      {/if}
    </div>
    <div class="{orientation === 'portrait' ? 'portrait' : 'landscape'}">
      {#if cards}
        <div
          id="cards-container"
          class=" {orientation === 'landscape' ? 'column1' : ''}"
        >
          <div id="cards">
            {#each cards as card (card.id + card.num)}
              <div
                class="card"
                animate:flip="{{ duration: 700 }}"
                out:fly="{{ x: -500, duration: cards.length > 1 ? 700 : 0 }}"
              >
                <div class=" pa-2 pb-2 elevation-{4} rounded-lg">
                  <Question
                    size="{classroom ? $classroomFontSize : $testFontSize}"
                    question="{card}"
                  />
                  {#if card.choices}
                    <div
                      class="mt-3 d-flex flex-wrap justify-space-around"
                      style="width:100%;"
                    >
                      {#each card.choices as choice, i}
                        <!-- <Button size="x-large" class="ml-3 mr-3" on:click="{() => onChoice(i)}"> -->

                        <button
                          class="rounded-lg  ma-3 pa-3"
                          style="border: 5px solid yellow;"
                          on:click="{() => {
                            if (!classroom) onChoice(i)
                          }}"
                        >
                          {#if choice.image}
                            {#await choice.imageBase64P}
                              loading image
                            {:then base64}
                              <img
                                class="white"
                                src="{base64}"
                                style="max-width:400px;max-height:40vh;"
                                alt="{`choice ${i}`}"
                              />
                            {:catch error}
                              {error}
                            {/await}
                          {/if}
                          {#if choice.markup}
                            <div
                              style="font-size:{classroom
                                ? $classroomFontSize
                                : $testFontSize + 4}px;"
                            >
                              {@html choice.markup}
                            </div>
                          {/if}
                        </button>

                        <!-- </Button> -->
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      {/if}
      <!-- <div class="mt-1 mb-1 elevation-{4} rounded-lg">
      <Question
        size="{classroom ? $classroomFontSize : $testFontSize}"
        question="{generated}"
      />
      {#if choices}
        <div
          class="mt-3 d-flex flex-wrap justify-space-around"
          style="width:100%;"
        >
          {#each choices as choice, i}
            
            <button
              class="rounded-lg  ma-3 pa-3"
              style="border: 5px solid yellow;"
              on:click="{() => {
                if (!classroom) onChoice(i)
              }}"
            >
              {#if choice.image}
                {#await choice.imageBase64P}
                  loading image
                {:then base64}
                  <img
                    class="white"
                    src="{base64}"
                    style="max-width:400px;max-height:40vh;"
                    alt="{`choice ${i}`}"
                  />
                {:catch error}
                  {error}
                {/await}
              {/if}
              {#if choice.text}
                <div
                  style="font-size:{classroom
                    ? $classroomFontSize
                    : $testFontSize + 4}px;"
                >
                  {@html choice.text}
                </div>
              {/if}
            </button>

            
          {/each}
        </div>
      {/if}
    </div> -->
      <!-- <div class:error> -->

      <div
        class="d-flex align-center justify-center {orientation === 'landscape'
          ? 'column2'
          : ''}"
        style="width:100%"
      >
        {#if !card.choices && !classroom}
          <div
            class="d-flex align-center justify-center {orientation ===
            'landscape'
              ? 'flex-column'
              : 'flex-row'}"
            style="width:80%"
          >
            <span class="mr-4" style="font-size:{$testFontSize}px;"
              >Ta réponse:</span
            >
            <div class="flex-grow-1" style="width:70%">
              <math-field
                
                keypress-vibration="off"
                remove-extraneous-parentheses="off"
                smart-fence="off"
                smart-superscript="off"
                style="width:100%;font-size:{$testFontSize}px;"
                class="{correct
                  ? 'pa-2 light-green lighten-5'
                  : 'pa-2 deep-orange lighten-5'}"
                virtual-keyboard-theme="apple"
                on:input="{onChangeMathField}"
                on:change="{() => {
                  if (answer !== '') commit()
                }}"
                bind:this="{mf}"
              >
              </math-field>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{:else}
  Pas de questions
{/if}

<style>
  .error {
    border: 5px solid red;
  }

  .portrait {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .landscape {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .column1 {
    flex-basis: 60%;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .column2 {
    flex-basis: 40%;
    flex-grow: 0;
    flex-shrink: 0;
  }

  #cards-container {
    margin-top: 20px;
    margin-bottom: 20px;
    position: relative;
    /* display: flex; */
    /* flex-direction: column; */
    overflow-x: hidden;
    /* height: 500px; */
    /* max-height: 70vh; */
    width: 100%;
  }
  #cards {
    display: flex;
    flex-wrap: nowrap;
    /* height: 600px; */
    overflow-x: hidden;
    /* height: 100%; */
    width: 100%;
  }
  .card {
    min-width: calc(100% - 24px);
    /* min-width: 95%; */
    /* min-width: 400px; */
    margin: 12px;
    /* height: 100%; */
  }
</style>
