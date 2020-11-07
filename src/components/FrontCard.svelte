<script>
  import Button, { Label } from '@smui/button'
  import Fa from 'svelte-fa'
  import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
  import Spinner from '../components/Spinner.svelte'
  import { getLocalUrl } from '../app/localUrl'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount, afterUpdate } from 'svelte'

  export let card
  export let localUrlP
  export let toggleFlip = () => {}

  let mounted

  onMount(() => {
    mounted = true
  })

  afterUpdate(() => {
    if (card && mounted) {
      Mathlive.renderMathInElement('front_card')
    }
  })

  //sanityse
</script>

<div class="card" id="front_card">
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
        <img alt="flash card" src="{localUrl}" width="80%" />
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
    -webkit-box-shadow: 0 -1px 1px rgba(230, 188, 188, 0.04),
      0 2px 2px rgba(0, 0, 0, 0.04), 0 4px 4px rgba(0, 0, 0, 0.04),
      0 8px 8px rgba(0, 0, 0, 0.04), 0 16px 16px rgba(0, 0, 0, 0.04);
    box-shadow: 0 -1px 1px rgba(230, 188, 188, 0.04),
      0 2px 2px rgba(0, 0, 0, 0.04), 0 4px 4px rgba(0, 0, 0, 0.04),
      0 8px 8px rgba(0, 0, 0, 0.04), 0 16px 16px rgba(0, 0, 0, 0.04);
    border-radius: 0.25rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1.5rem;
  }
  .buttons {
    margin-top: 2em;
  }

  .textmath {
    display: inline-block;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .content {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .info {
    color: rgb(80, 162, 244);
    // color: $mdc-theme-primary;
    margin-bottom: 2em;
    font-size: 1.2em;
  }
</style>
