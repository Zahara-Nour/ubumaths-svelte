<script>
  import { Item, Text, Meta } from '@smui/list'
  import VirtualList from '@sveltejs/svelte-virtual-list'
  export let value
  export let cards
  export let onChange = () => {}


</script>

{#if cards}
  <VirtualList height="500px" items="{cards}" let:item>
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
