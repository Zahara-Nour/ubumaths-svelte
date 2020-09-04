<script>
  import { Item, Text, Meta } from '@smui/list'
  import VirtualList from '@sveltejs/svelte-virtual-list'
  import { afterUpdate, onMount, tick } from 'svelte'
  export let value
  export let cards
  export let onChange = () => {}
  let selectedId
  let element
  let start = 0

  afterUpdate(() => {
    console.log('update')
  })

  function scroll() {
    console.log('reactiv')
    console.log('start', start)
    if (!element && value && cards) {
      console.log('scrolling ?')
      selectedId = cards.find((card) => card.name === value).id
      console.log('selectediId', selectedId)
      element = document.getElementById(selectedId)
      console.log('element', element)
      while (!element && start < cards.length-1)  {
        start = start + 1
        tick()
        element = document.getElementById(selectedId)
      }
      console.log('element', element)
    }
  }

  $: if (cards && cards.length) {
    scroll()
  }
</script>

{start}
{#if cards}
  <VirtualList height="500px" items="{cards}" let:item bind:start>
    <!-- this will be rendered for each currently visible item -->
    <Item
      id="{item.id}"
      on:SMUI:action="{() => {
        value = item.name
        onChange()
      }}"
      selected="{value === item.name}"
    >
      <Text>{item.name}</Text>
      <Meta>{item.level}</Meta>
    </Item>
  </VirtualList>
{/if}
