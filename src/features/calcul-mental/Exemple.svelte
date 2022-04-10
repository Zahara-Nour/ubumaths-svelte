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
    choices = question.choices.map((c) => {
      if (c.text) {
        c.text = c.text.replace(regex, replacement)
      }
      return c
    })
  } else {
    choices = null
  }
</script>

<Card class="mt-2" style="{classroom ? 'height:60vh;' : ''}">
  {#if !classroom}
    <div class="d-flex align-center justify-start">
      <CardTitle>{question.id} {@html description}</CardTitle>
      <span class="pa-1 ma-1 info-color rounded-lg">{question.grade}</span>
    </div>
    {#if subdescription}
      <CardSubtitle>{@html subdescription}</CardSubtitle>
    {/if}
  {/if}
  <CardText style="{classroom ? 'height:90%;' : ''}">
    <div
      class="d-flex flex-column align-center justify-space-around"
      style="{classroom ? 'height:100%;' : ''}"
    >
      <Question
        size="{classroom ? $classroomFontSize : $menuFontSize}"
        question="{question}"
      />

      {#if choices}
        <div
          class="mt-3 d-flex flex-wrap justify-space-around"
          style="width:100%;"
        >
          {#each choices as choice, i}
            <!-- <Button size="x-large" class="ml-3 mr-3" on:click="{() => onChoice(i)}"> -->

            <button
              class="rounded-lg  ma-2 pa-1"
              style="border: 4px solid yellow;"
              on:click="{() => {}}"
            >
              {#if choice.image}
                {#await choice.imageBase64P}
                  loading image
                {:then base64}
                  <img
                    class="white"
                    src="{base64}"
                    style="max-width:min(400px,80%);max-height:40vh;"
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
                    : $menuFontSize}px;"
                >
                  {@html choice.text}
                </div>
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </CardText>
</Card>
