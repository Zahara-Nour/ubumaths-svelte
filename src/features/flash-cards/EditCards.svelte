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

  export let location

  let subject
  let domain
  let theme
  let title = ''
  let cards

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
</script>

<div class="container">
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

  {#if title && cards && cards.length}
    <EditCard card="{cards.filter((card) => card.name === title)[0]}" />
  {/if}
</div>

<style type="text/scss">
  .container {
    width: 100%;
  }
</style>
