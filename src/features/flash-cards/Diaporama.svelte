<script>
  import { shuffle, getLogger } from '../../app/utils'
  import FlashCard from './FlashCard.svelte'
  import queryString from 'query-string'
  import { navigate } from 'svelte-routing'
  import generate from './generateCard'
  import { Button, Icon } from 'svelte-materialify/src'
  import {
    mdiArrowRight,
    mdiHome,
    mdiReload,
    mdiRestart,
    mdiRestartOff,
  } from '@mdi/js'
  import { flip } from 'svelte/animate'
  import { fly } from 'svelte/transition'
  import allCards from './cards.json'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount } from 'svelte'

  export let location
  let error
  let queryParams
  let domain, theme, level
  const { trace } = getLogger('FlashCards', 'trace')
  let cards

  function nextCard() {
    if (cards.length > 1) {
      cards = [...cards.slice(1, cards.length)]
    }
  }

  function update(search) {
    console.log('update')
    cards = []
    queryParams = queryString.parse(search)
    domain = queryParams.domain
    theme = queryParams.theme
    level = queryParams.level
    cards = allCards[domain][theme]
      .filter((card) => card.level === level)
      .map((card) => generate(card))
    cards.forEach((card, i) => {
      card.id = i
      card.theme = theme
      card.domain = domain
    })
    shuffle(cards)
    console.log('cards', cards)
  }

  $: update(location.search)
</script>

{#if cards}
  <div id="cards-container">
    <div id="cards">
      {#each cards as card (card.id)}
        <div
          class="card"
          animate:flip="{{ duration: 700 }}"
          out:fly="{{ x: -500, duration: cards.length>1 ? 700 : 0 }}"
        >
          <FlashCard card="{card}" />
        </div>
      {/each}
    </div>
  </div>
  {#if cards.length > 1}
    <div class="d-flex">
      <div class="flex-grow-1"></div>
      <Button
        fab
        size="small"
        class="mr-2 blue white-text"
        on:click="{nextCard}"
      >
        <Icon path=" {mdiArrowRight}" />
      </Button>
    </div>
  {:else}
  <div class="d-flex justify-center">
    <Button
      class="blue white-text ma-3"
      fab
      size="small"
      on:click="{() => navigate(`/flash-cards?domain=${domain}`)}"
    >
      <Icon path="{mdiHome}" />
    </Button>
    <Button
      class="blue white-text ma-3"
      fab
      size="small"
      on:click="{() =>
        navigate(
          `/flash-cards/play?domain=${domain}&theme=${theme}&level=${level}`,
        )}"
    >
      <Icon path="{mdiReload}" />
    </Button>
  </div>
  {/if}
{:else}
  <p style="color: red">liste vide</p>
{/if}

<style>
  #cards-container {
    margin-top: 40px;
    margin-bottom: 40px;
    position: relative;
    /* display: flex; */
    /* flex-direction: column; */
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

  /* @media (min-width: 768px) {
    #cards-container {
      max-width: 600px;
      min-width: 600px;
    }
    .card {
      max-width: calc(600px - 8px);
      min-width: calc(600px - 8px);
    }
  } */
</style>
