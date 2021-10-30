<script>
  import { supabase } from '../../app/db'
  import { user, testFontSize } from '../../app/stores'
  import StudentAssessment from './StudentAssessment.svelte'
  import { Select } from 'svelte-materialify/src'

  let assessment
  let value
  let items
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
        items = results.map(result =>({name:result.result.title, value:result.result.title}))
        value = items[0].value
      }
    }
  }
  $: if ($user.results && value) {
    console.log('$user.result', $user.results)
    console.log('value', value)
    assessment = $user.results.find(result => result.result.title === value).result.questions
    console.log('assessment', assessment)
  }

  $: if (!$user.results) fetchResults()
</script>

Dashboard student

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
