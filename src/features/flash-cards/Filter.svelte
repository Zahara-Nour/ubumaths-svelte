<script>
  import { Select } from 'svelte-materialify/src'
  import Spinner from '../../components/Spinner.svelte'
  import { lexicoSort } from '../../app/utils'

  export let label
  export let collection
  export let value = null
  export let type = 'select'
  export let custom = null
  export let sort = (a, b) => lexicoSort(a.name, b.name)
  export let elements = []
  export let onChange = () => {}

  

  function update(collection) {
    

    elements = collection.sort(sort).map((element) => ({
      name: element.name,
      value: element.name,
    }))
    const names = elements.map((element) => element.name)
    value = value && names.includes(value) ? value : elements[0].name
  }

  $: if (collection) update(collection)
</script>

{#if elements}
  {#if elements.length}
    {#if type === 'select'}
      <div class="filter">
        <Select class="mt-3 mb-3" items="{elements}" bind:value>{label}</Select>
      </div>
    {:else if custom}
      <svelte:component
        this="{custom}"
        cards="{elements}"
        bind:value
        onChange="{onChange}"
      />
    {:else}
      rien
      <!-- <List class="demo-list">
          {#each values as v}
            <Item on:SMUI:action="{() => (value = v)}" value="{value === v}">
              <Text>{v}</Text>
            </Item>
          {/each}
        </List> -->
    {/if}
  {:else}Liste vide{/if}
{:else}
  <Spinner />
{/if}

<style>
  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
