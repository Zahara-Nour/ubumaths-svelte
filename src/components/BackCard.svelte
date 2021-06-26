<script>
  import { Button, Icon } from 'svelte-materialify/src'
  import { getLocalUrl } from '../app/localUrl'
  import Spinner from './Spinner.svelte'
  import { onMount, afterUpdate, onDestroy } from 'svelte'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
import { mdiOrbitVariant } from '@mdi/js';

  export let card
  let localUrlP = card.imageAnswer
          ? getLocalUrl(card.imageAnswer)
          : Promise.resolve('none')
  export let toggleFlip = () => {}
 
  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)


  if (card.imageAnswer && !localUrlP) {
    localUrp = getLocalUrl(card.imageAnswer)
  }
</script>

<div class="card" id="{'back' + card.id}">
  <div class="title-answer green-text">Réponse</div>
  <div class="flex-grow-1"/>
  <div class="answer textmath">
    {@html card.answer.replace(regex, replacement)}
  </div>
  {#if localUrlP}
    {#await localUrlP}
      <Spinner />
    {:then localUrl}
      {#if localUrl !== 'none'}
        <img alt="flash card" src="{localUrl}"/>
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  {/if}
  <div class="flex-grow-1"/>
  {#if card.explanation}
    <div>
      {@html card.explanation.replace(regex, replacement)}
    </div>
  {/if}
  {#if card.warning}
    <div >
      {@html card.warning.replace(regex, replacement)}
    </div>
  {/if}
  <div class="buttons">
    <Button fab  class="green white-text"
        on:click="{toggleFlip}"
      >
      <Icon path="{mdiOrbitVariant}" />
      </Button>
  </div>
</div>

<style type="text/scss">
  // @import '../theme/_smui-theme';

  .card {
    
    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1em;
    height: calc(100% - 4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .title-answer {
    // color: $mdc-theme-secondary;
    font-size: 1.2em;
   
  }
  .answer {
    font-size: 1.3em;
    font-weight: 500;
  }

  img {
    // flex: 1;
    overflow: hidden;
    max-width: 100%;
    object-fit: contain;
  }

  .buttons {
    margin-top: 2em;
  }


  
</style>
