<script>
  import {
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
    Badge,
  } from 'svelte-materialify/src'
  import { menuFontSize, classroomFontSize } from '../../app/stores'

  import Question from './Question.svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'

  export let question
  export let classroom = false
  let choices

  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)

  $: description = question.description
    ? question.description.replace(regex, replacement)
    : ''

  $: subdescription = question.subdescription
    ? question.subdescription.replace(regex, replacement)
    : ''

  $: if (question.choices) {
    choices = question.choices.map((c) => c.replace(regex, replacement))
  } else {
    choices = null
  }
</script>

<Card class="mt-2" style="{classroom ? 'height:60vh;' : ''}">
  {#if !classroom}
    <div class="d-flex align-center justify-start">
      <CardTitle>{@html description}</CardTitle>
      <span class="pa-1 ma-1 info-color rounded-lg">{question.grade}</span>
    </div>
    {#if subdescription}
      <CardSubtitle>{@html subdescription}</CardSubtitle>
    {/if}
  {/if}
  <CardText style={classroom ? 'height:90%;' : ''}>
    <div
      class="d-flex flex-column align-center justify-space-around"
      style={classroom ? 'height:100%;' : ''}
    >
      <Question
        size="{classroom ? $classroomFontSize : $menuFontSize}"
        question="{question}"
      />

      {#if choices}
        <div class="mt-3 d-flex justify-space-around" style="width:100%;">
          {#each choices as choice, i}
            <!-- <Button size="x-large" class="ml-3 mr-3" on:click="{() => onChoice(i)}"> -->
            <div>
              <button
                class="rounded-lg pa-5 yellow lighten-4 ml-3 mr-3"
                on:click="{() => {}}"
              >
                <div
                  style="font-size:{classroom
                    ? $classroomFontSize
                    : $menuFontSize}px;"
                >
                  {@html choice}
                </div>
              </button>
            </div>
            <!-- </Button> -->
          {/each}
        </div>
      {/if}
    </div>
  </CardText>
</Card>
