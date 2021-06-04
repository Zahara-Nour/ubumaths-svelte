<script>
  import {
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
  } from 'svelte-materialify/src'

  import Question from './Question.svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'

  export let question

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.latexToMarkup(p1)

  $: description = question.description.replace(regex, replacement)

  $: subdescription = question.subdescription
    ? question.subdescription.replace(regex, replacement)
    : null
</script>

<Card>
  <CardTitle>{@html description}</CardTitle>

  {#if subdescription}
    <CardSubtitle>{@html subdescription}</CardSubtitle>
  {/if}

  <CardText>
    <Question question="{question}" />
  </CardText>
</Card>
