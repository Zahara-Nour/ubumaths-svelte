<script>
  import { getLocalUrl } from '../../app/localUrl'
  import { shuffle, getLogger } from '../../app/utils'
  import FlashCard from './FlashCard.svelte'
  import queryString from 'query-string'
  import { navigate } from 'svelte-routing'
  import { getCollection } from '../../app/collections'
  import Spinner from '../../components/Spinner.svelte'
  import { afterUpdate } from 'svelte'
  import generate from './generateCard'
  import { Button, Icon } from 'svelte-materialify/src'
  import { mdiArrowRight, mdiReload, mdiRestart, mdiRestartOff } from '@mdi/js'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'

  export let location
  let error
  let queryParams
  let subject, domain, theme, level
  let filters = []
  const { trace } = getLogger('FlashCards', 'trace')
  let cards,
    card_i = -1

  const getCards = async (filters) => {
    // first seek in store

    getCollection({
      collectionPath: 'FlashCards',
      filters,
    })
      .then((values) => {
        trace('crds received, ', values)
        shuffle(values)
        cards = values
        return values
      })
      .catch((err) => (error = err))
  }

  function nextCard() {
    if (cards.length > 1) {
      cards = [...cards.slice(1, cards.length)]
      console.log('cards', cards)
    }

    console.log('change card', card_i)

    // if (card_i == cards.length) {
    //   navigate(`/flash-cards?subject=${subject}&domain=${domain}`)
    // } else {
    //   frontLocalUrlP = nextFrontLocalUrlP
    //   backLocalUrlP = nextBackLocalUrlP

    //   if (card_i < cards.length - 1) {
    //     disable = true
    //     const nextcard = cards[card_i + 1]
    //     nextFrontLocalUrlP = nextcard.image
    //       ? getLocalUrl(nextcard.image)
    //       : Promise.resolve('none')
    //     nextBackLocalUrlP = nextcard.imageAnswer
    //       ? getLocalUrl(nextcard.imageAnswer)
    //       : Promise.resolve('none')

    //     // allow to go to next card if images are downloaded
    //     Promise.all([nextFrontLocalUrlP, nextBackLocalUrlP]).then(() => {
    //       disable = false
    //     })
    //   }
    // }
  }

  $: {
    queryParams = queryString.parse(location.search)
    subject = queryParams.subject
    domain = queryParams.domain
    theme = queryParams.theme
    level = queryParams.level
    filters = []
    if (subject) filters.push({ subject })
    if (domain) filters.push({ domain })
    if (theme) filters.push({ theme })
    if (level) filters.push({ level })
  }

  $: getCards(filters)
</script>

{#if error}
  <p style="color: red">{error}</p>
{:else if !cards}
  <div class="center">
    <Spinner />
  </div>
{:else if cards.length}
  <div id="cards-container">
    <div id="cards">
      {#each cards as card (card.id)}
        <div
          class="card"
          animate:flip="{{ duration: 500 }}"
          out:fly="{{ x: -300, duration: 500 }}"
        >
          <FlashCard card="{generate(card)}" />
        </div>
      {/each}
    </div>
  </div>
  {#if cards.length > 1}
    <Button fab size="small" class="blue white-text" on:click="{nextCard}">
      <Icon path=" {mdiArrowRight}" />
    </Button>
  {:else}
    <Button
      fab
      size="small"
      class="blue white-text"
      on:click="{() =>
        navigate(`/flash-cards?subject=${subject}&domain=${domain}`)}"
    >
      <Icon path=" {mdiRestartOff}" />
    </Button>
    <Button
      fab
      size="small"
      class="blue white-text"
      on:click="{() =>
        navigate(
          `/flash-cards/play?subject=${subject}&domain=${domain}&theme=${theme}&level=${level}`,
        )}"
    >
      <Icon path=" {mdiRestart}" />
    </Button>
  {/if}
{:else}
  <p style="color: red">liste vide</p>
{/if}

<style>
  #cards-container {
    margin-top: 40px;
    margin-bottom: 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    height: 500px;
    max-height: 70vh;
    width: 100%;
  }
  #cards {
    display: flex;
    flex-wrap: nowrap;
    height: 600px;
    overflow-x: hidden;
    height: 100%;
    width: 100%;
  }
  .card {
    min-width: calc(100% - 8px);
    /* min-width: 400px; */
    margin: 4px;
    height: 100%;
  }

  .center {
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 768px) {
    #cards-container {
      max-width: 600px;
      min-width: 600px;
    }
    .card {
      max-width: calc(600px - 8px);
      min-width: calc(600px - 8px);
    }
  }
</style>
