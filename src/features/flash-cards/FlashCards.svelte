<script>
  import Filter from './Filter.svelte'
  import queryString from 'query-string'
  import ThemesList from './ThemesList.svelte'
  import cards from './cards.json'
  import grades from './grades.json'


  export let location
  

  let grade, domain

  
  const domains = Object.keys(cards).map(domain => ({name:domain}))
  console.log('cards', cards)

  function updateWithQueryParams(search) {
    const queryParams = queryString.parse(search)
    domain = queryParams.domain
    grade = queryParams.grade
  }

  $: updateWithQueryParams(location.search)
</script>

<Filter  label="Classe" collection={grades} bind:value="{grade}" />



  <Filter
    label="Domaine"
    collection={domains}
    bind:value="{domain}"
   
  />


{#if domain && grade}
  <ThemesList filters="{[{ domain }]}" {grade} />
{/if}
