<script>
  import {
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
  } from 'svelte-materialify/src'

  import Question from './Question.svelte'

  export let question

</script>

<Card>
  <CardTitle>{question.description}</CardTitle>

  {#if question.subdescription}
    <CardSubtitle>{question.subdescription}</CardSubtitle>
  {/if}

  <CardText>
    <Question question="{question}" />
  </CardText>
</Card>
