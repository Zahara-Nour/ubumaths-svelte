<script>
  import CorrectionItem from './CorrectionItem.svelte'
  import { Button } from 'svelte-materialify/src'
  export let questions
  export let answers
  export let answers_latex

  let score = 0
  let total = 0
  let details = false
  const items = []
  const toggleDetails = () => (details = !details)

  function addPoints(points) {
    score += points
  }

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]
    total += question.points
    items[i] = {
      question: question.expression,
      answer: answers[i],
      answer_latex: answers_latex[i],
      solutions: question.solutions,
      details: question.details,
      type: question.type,
      number: i + 1,
      points: question.points,
      options:question.options
    }
  }

  console.log('items', items)
</script>

<Button class="mt-2 mb-2" size="small" on:click="{toggleDetails}">
  Correction détaillée
</Button>

{#each items as item}
  <CorrectionItem item="{item}" addPoints="{addPoints}" details="{details}" />
{/each}

<div class="green d-flex align-center  justify-space-around">
  <span style='font-size:22px' class="white-text">
    Score : {score}/{total}
  </span>
  {#if score >= 0}
    <img alt="Good job!" src="/images/good-job.png" width="25%" />
  {/if}
</div>
