<script>
  import CorrectionItem from './CorrectionItem.svelte'
  export let questions
  export let answers
  export let answers_latex
  
  let score = 0
  let total=0
  const items = []

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
      solution: question.solution,
      type: question.type,
      number: i+1,
      points:question.points
    }
  }
</script>

{#each items as item}
  <CorrectionItem item="{item}" addPoints={addPoints}/>
{/each}

score : {score}/{total}
