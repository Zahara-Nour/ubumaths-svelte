<script>
  import Filter from '../../components/Filter.svelte'
  import queryString from 'query-string'
  import GetFilters from '../../components/GetFilters.svelte'
  import Card from '@smui/card'
  import Textfield from '@smui/textfield'
  import CardsList from './CardsList.svelte'
  import { cleanString, lexicoSort } from '../../app/utils'
  import EditCard from './EditCard.svelte'
  import { getCollection } from '../../app/collections'
  import AuthButton from '../../components/AuthButton.svelte'
  import FrontCard from '../../components/FrontCard.svelte'
  import BackCard from '../../components/BackCard.svelte'
  import generateCard from './generateCard'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
import { afterUpdate } from 'svelte';
import { getLocalUrl } from '../../app/localUrl';

  export let location

  let subject
  let domain
  let theme
  let title = ''
  let cards
  let card
  let edited
  let generated
  let localUrlP
  let localUrlAnswerP
  let image
  let imageAnswer

  function changeSubject() {
    domain = null
    changeDomain()
  }

  function changeDomain() {
    theme = null
    changeTheme()
  }

  function changeTheme() {
    title = null
  }

  function changeTitle() {
    updateCards(theme)
  }

  function updateWithQueryParams(search) {
    const queryParams = queryString.parse(search)
    subject = queryParams.subject
    domain = queryParams.domain
    theme = queryParams.theme
    title = queryParams.title
  }

  function updateCards(theme) {
    if (theme) {
      getCollection({
        collectionPath: 'FlashCards',
        filters: [{ subject }, { domain }, { theme }],
      }).then((documents) => (cards = documents))
    }
  }

  $: updateCards(theme)

  $: updateWithQueryParams(location.search)

  $: if (cards && title) card = cards.filter((card) => card.name === title)[0]

  function updateEdited() {
    if (edited.image && edited.image !== image) {
      image = edited.image
      localUrlP = getLocalUrl(image)
    } else if (!edited.image) {
      localUrlP = Promise.resolve('none')
    }
    generated = generateCard(edited)
  }
  $:  if (edited) updateEdited()
  
  

  afterUpdate(() => {
    // if (!flip) {
    // Mathlive.renderMathInElement('front')
    // } else  {
    // Mathlive.renderMathInElement('back')
    // }
    // Mathlive.renderMathInDocument()
  })
</script>

<div class="container">
  <div class="select">
    <Card padded>
      <Filter
        label="Matière"
        collectionPath="Subjects"
        bind:value="{subject}"
        onChange="{changeSubject}"
      />

      {#if subject}
        <Filter
          label="Domaine"
          collectionPath="Domains"
          bind:value="{domain}"
          filters="{[{ subject }]}"
          onChange="{changeDomain}"
        />
      {/if}

      {#if domain}
        <Filter
          label="Thème"
          collectionPath="Themes"
          bind:value="{theme}"
          filters="{[{ subject }, { domain }]}"
          add
          newLabel="Nouveau domaine"
          onChange="{changeTheme}"
        />
      {/if}

      {#if theme}
        <Filter
          label="Titre"
          collectionPath="FlashCards"
          type="list"
          bind:value="{title}"
          filters="{[{ subject }, { domain }, { theme }]}"
          custom="{CardsList}"
          sort="{(a, b) => (lexicoSort(a.level, b.level) === 0 ? lexicoSort(a.name, b.name) : lexicoSort(a.level, b.level))}"
          update
          onChange="{changeTitle}"
        />
      {/if}
    </Card>
  </div>
  {#if title && cards && cards.length}
    <div class="edit">
      <EditCard card="{card}" bind:edited />
    </div>
  {/if}

  {#if edited}
    <div class="edit">
      <div id="front">
        <FrontCard card="{generated}" {localUrlP} />
      </div>
      <div id="back">
        <BackCard card="{generated}" />
      </div>
    </div>
  {/if}
</div>

<style type="text/scss">
  .container {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .select,
  .edit {
    width: 30%;
  }
</style>
