<script>
  import { Select } from 'svelte-materialify/src'
  import Spinner from './Spinner.svelte'
  import { getCollection } from '../app/collections'
  import { cleanString, lexicoSort } from '../app/utils'
  import { saveDocument } from '../app/db'
  import { collections } from '../app/stores'
  import { navigate } from 'svelte-routing'
  import { updateCardsList } from '../app/stores'
  import { onMount } from 'svelte'

  export let label
  export let newLabel = ''
  export let collectionPath
  export let filters = []
  export let value = null
  export let type = 'select'
  export let custom = null
  export let sort = (a, b) => lexicoSort(a.name, b.name)
  export let add = false
  export let values = []
  export let disabled = false
  export let update = false
  export let onChange = () => {}

  let newValue = ''
  let addNew = false

  let error

  onMount(() => {
    if (update) {
      updateCardsList.subscribe((value) => {
        if (value) {
          updateCardsList.set(false)
          updateWithProps(collectionPath, filters)
        }
      })
    }
  })

  $: console.log('value', collectionPath, value)

  const save = async () => {
    let document = { name: newValue }
    filters.forEach((filter) => {
      document = { ...document, ...filter }
    })

    saveDocument({ path: collectionPath, document })
      .then(() => {
        let name = collectionPath.toLowerCase()
        name = name.substr(0, name.length - 1)

        //updte store
        collections.update((store) => {
          // TODO : split for inner collections
          let collection = store[collectionPath]
          let cards = store.FlashCards
          filters.forEach((filter) => {
            const filterName = Object.getOwnPropertyNames(filter)[0]
            const filterValue = filter[filterName]
            collection = collection[filterValue]
            cards = cards[filterValue]
          })

          collection.collection.push(document)
          cards[newValue] = {}
          cards[newValue].collection = []
          return store
        })
        console.log('doc succefully saved')

        addNew = false

        let url = `/flash-cards/edit?${name}=${newValue}`
        filters.forEach((filter) => {
          const filterName = Object.getOwnPropertyNames(filter)[0]
          const filterValue = filter[filterName]
          url += `&${filterName}=${filterValue}`
        })
        if (decodeURI(encodeURI(url)) !== url) warn('URI malformed', url)
        navigate(url)
      })
      .catch((err) => console.log('error while saving document', err))
  }

  const checkExists = (element, elements) =>
    !!elements.find((el) => cleanString(el.name) === cleanString(element))

  function initValue(elements) {
    elements = elements.sort(sort)
    const names = elements.map((element) => element.name)
    // value = value && names.includes(value) ? value : names[0]
    values = elements.map((element) => ({
      name: element.name,
      value: element.name,
    }))
    value = value && names.includes(value) ? value :values[0].name
  }

  function updateWithProps(collectionPath, filters) {
    values = null
    error = null
    value
    getCollection({
      collectionPath,
      filters,
    })
      .then(initValue)
      .catch((err) => (error = err))
  }

  $: updateWithProps(collectionPath, filters)

  let textField

  // $: {
  //   console.log('selected', label, selected)
  // }

  function focus(node) {
    node.focus()
  }
</script>

{#if error}
  {label}
  {error}
{:else if values}
  {#if values.length}
    {#if type === 'select'}
      <div class="filter">
        {#if add && addNew}
          toto
          <!-- <Textfield
              use="{[focus]}"
              error="{!newValue || checkExists(newValue, values)}"
              bind:value="{newValue}"
              label="{checkExists(newValue, values) ? `${newValue} existe déjà !` : newLabel}"
              input$aria-controls="helper-text-textarea"
              input$aria-describedby="helper-text-textarea"
              bind:this="{textField}"
            /> -->
        {:else}
          <Select class="mt-3 mb-3" items="{values}" bind:value>{label}</Select>
        {/if}

        <!-- {#if add}
            <Fab
              disabled="{disabled || (addNew && (!newValue || checkExists(newValue, values)))}"
              mini
              on:click="{() => {
                if (addNew) {
                  save()
                } else {
                  addNew = true
                  newValue = ''
                }
              }}"
            >
              <Icon class="material-icons">add</Icon>
            </Fab>
          {/if} -->
      </div>
    {:else if custom}
      <svelte:component
        this="{custom}"
        cards="{values}"
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
