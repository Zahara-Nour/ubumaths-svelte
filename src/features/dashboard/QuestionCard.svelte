<script>
  import { Card, CardText, CardTitle, Button } from 'svelte-materialify/src'
  import { menuFontSize } from '../../app/stores'
  import Question from '../calcul-mental/Question.svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'

  export let question
  export let size

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)
  const choices = question.choices ?  question.choices.map((c) => c.replace(regex, replacement)) : null
</script>
<div style="font-size:{size}px">
<Card>
  <CardTitle>Question {question.number}</CardTitle>
  <CardText>
    <Question  question="{question}" />
    <div class="d-flex align-center justify-center">
      {#if choices}
        <div class="mt-3 d-flex justify-center" style="width:100%;">
          {#each choices as choice, i}
            <Button class="ml-3 mr-3">
              <div style="font-size:{$menuFontSize}px;">{@html choice}</div>
            </Button>
          {/each}
        </div>
      {/if}
    </div>
  </CardText>
</Card>
</div>
