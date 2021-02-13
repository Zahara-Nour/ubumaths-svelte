<script>
  import Button, { Label } from '@smui/button'
  import Fa from 'svelte-fa'
  import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
  import Spinner from '../components/Spinner.svelte'
  import { getLocalUrl } from '../app/localUrl'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount, afterUpdate, onDestroy } from 'svelte'

  export let toggleFlip = () => {}
  export let card
  let localUrlP = card.image ? getLocalUrl(card.image) : Promise.resolve('none')

  onMount(() => {
    Mathlive.renderMathInElement('front' + card.id)
  })
  afterUpdate(() => {
    // if (document.getElementById("front_card")) {
    //   Mathlive.renderMathInElement('front_card')
    // }
  })

  //sanityse
</script>

<div class="card" id="{'front' + card.id}">
  <div class="info">
    <Fa icon="{faNewspaper}" />
    {card.theme}
  </div>
  <div class="content">
    <div class="textmath">
      {@html card.enounce}
    </div>

    {#await localUrlP}
      <Spinner />
    {:then localUrl}
      {#if localUrl !== 'none'}
        <img alt="flash card" src="{localUrl}" />
      {/if}
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}

    <div class="buttons">
      <Button
        on:click="{toggleFlip}"
        variant="raised"
        class="button-shaped-round"
        color="secondary"
      >
        <Label>Voir la réponse</Label>
      </Button>
    </div>
  </div>
</div>

<style type="text/scss">
  @import '../theme/_smui-theme.scss';
  .card {
    // -webkit-box-shadow: 0 -1px 1px rgba(230, 188, 188, 0.04),
    //   0 2px 2px rgba(0, 0, 0, 0.04), 0 4px 4px rgba(0, 0, 0, 0.04),
    //   0 8px 8px rgba(0, 0, 0, 0.04), 0 16px 16px rgba(0, 0, 0, 0.04);
    // box-shadow: 0 -1px 1px rgba(230, 188, 188, 0.04),
    //   0 2px 2px rgba(0, 0, 0, 0.04), 0 4px 4px rgba(0, 0, 0, 0.04),
    //   0 8px 8px rgba(0, 0, 0, 0.04), 0 16px 16px rgba(0, 0, 0, 0.04);
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1.5rem;
    height: 100%;
    // display: flex;
    // flex-direction: column;
  }
  .buttons {
    margin-top: 2em;
  }

  .textmath {
    display: block;
    margin-bottom: 0.8em;
  }
  .content {
    // flex: 1;
    // max-height:400px;
    height: calc(100% - 60px);
    // display: -webkit-box;
    // display: -ms-flexbox;
    display: flex;
    // -webkit-box-orient: vertical;
    // -webkit-box-direction: normal;
    // -ms-flex-direction: column;
    flex-direction: column;
    // -ms-flex-pack: distribute;
    justify-content: space-around;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    align-items: center;
  }

  img {
    flex: 1;
    overflow: hidden;
    object-fit: contain;
  }

  .info {
    color: rgb(80, 162, 244);
    // color: $mdc-theme-primary;
    margin-bottom: 1em;
    font-size: 1.2em;
  }
</style>
