<script>
  // import Filter from '../../components/Filter.svelte'
  import queryString from 'query-string'
  import ThemesList from '../../components/ThemesList.svelte'
  import { getCollection } from '../../app/collections'
  import Spinner from '../../components/Spinner.svelte'
  import Select, { Option } from '@smui/select'
  import { lexicoSort } from '../../app/utils'
  export let location
  

  let grade
  let subject
  let domain
  let theme
  let title = ''
  let cards

  function updateWithQueryParams(search) {
    const queryParams = queryString.parse(search)
    subject = queryParams.subject
    domain = queryParams.domain
    theme = queryParams.theme
    grade = queryParams.grade
  }

  $: updateWithQueryParams(location.search)
</script>

<!-- <Filter label="Classe" collectionPath="Grades" bind:value="{grade}" /> -->

<!-- <Filter label="Matière" collectionPath="Subjects" bind:value="{subject}" /> -->

<!-- {#if subject}
  <Filter
    label="Domaine"
    collectionPath="Domains"
    bind:value="{domain}"
    filters="{[{ subject }]}"
  />
{/if}

{#if domain && grade}
  <ThemesList filters="{[{ subject }, { domain }]}" {grade} />
{/if} -->
