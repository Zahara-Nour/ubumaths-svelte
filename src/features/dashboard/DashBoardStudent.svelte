<script>
  import { supabase } from '../../app/db'
  import { user, testFontSize } from '../../app/stores'
  import StudentAssessment from './StudentAssessment.svelte'
  import { Select, ProgressLinear } from 'svelte-materialify/src'
  import questions from '../calcul-mental/questions'

  let assessment
  let value
  let items
  let percents = {}

  function updateProgresssionSummary() {
    Object.keys(questions).forEach((theme) => {
      percents[theme] = {}
      Object.keys(questions[theme]).forEach((domain) => {
        let nitems = 0
        let nfullfilled = 0
        Object.keys(questions[theme][domain]).forEach((subdomain) => {
          nitems += questions[theme][domain][subdomain].length
          nfullfilled += $user.progression[theme][domain][subdomain]
        })
        percents[theme][domain] = Math.round((nfullfilled / nitems) * 100)
      })
    })
  }

  async function fetchResults() {
    const { data: results, error } = await supabase
      .from('results')
      .select('result,assessment_id, status')
      .eq('user_id', $user.id)
      .order('updated_at', { ascending: false })

    if (error) {
      console.log('error')
    } else {
      console.log('results', results)
      $user.results = results
      console.log(results)
      if (results.length) {
        items = results.map((result) => ({
          name: result.result.title,
          value: result.result.title,
        }))
        value = items[0].value
      }
    }
  }
  $: if ($user.results && value) {
    console.log('$user.result', $user.results)
    console.log('value', value)
    assessment = $user.results.find((result) => result.result.title === value)
      .result.questions
    console.log('assessment', assessment)
  }

  $: if (!$user.results) fetchResults()

  $: if ($user.progression) {
    updateProgresssionSummary()
  }

  $: isLoggedIn = $user.id != 'guest'
  $: isTeacher = isLoggedIn && $user.roles.includes('teacher')
  $: isStudent = isLoggedIn && $user.roles.includes('student')
</script>

<h5>Dashboard student progression</h5>
{#if $user.progression}
  <div style="max-width:500px">
    {#each Object.keys(questions) as theme}
      {#if !isLoggedIn || (isStudent && $user.available && $user.available[theme])}
        <div>
          <p class="mt-10 text-center font-weight-black">{theme}</p>
        </div>
        {#each Object.keys(questions[theme]) as domain}
          {#if !isLoggedIn || (isStudent && $user.available[theme][domain])}
            <div class="d-flex flex-row align-center justify-space-between">
              <div style="min-width:150px">
                {domain}
              </div>

              <ProgressLinear
                style="max-width:250px;"
                class="white-text"
                height="20px"
                value="{percents[theme][domain]}"
                >{percents[theme][domain]}%</ProgressLinear
              >
            </div>
          {/if}
        {/each}
      {/if}
    {/each}
  </div>
{/if}

<Select class="mt-3 mb-3" items="{items}" bind:value>Evaluations</Select>

{value}

{#if assessment}
  {assessment[0].enounce}
  <StudentAssessment
    questions="{assessment}"
    answers="{assessment.map((item) => item.answer)}"
    answers_latex="{assessment.map((item) => item.answer_latex)}"
    answers_choice="{assessment.map((item) => item.answer_choice)}"
    times="{assessment.map((item) => item.answer_times)}"
    size="{$testFontSize}"
  />
{/if}
