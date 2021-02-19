<script>
  import { Row, Col, Select, Icon } from 'svelte-materialify/src'
  import Button from 'svelte-materialify/src/components/Button'
  import ExpansionPanels, {
    ExpansionPanel,
  } from 'svelte-materialify/src/components/ExpansionPanels'
  import List from 'svelte-materialify/src/components/List'
  import ListItem from 'svelte-materialify/src/components/List/ListItem.svelte'
  import ListItemGroup from 'svelte-materialify/src/components/List/ListItemGroup.svelte'
  import { mdiCartArrowDown, mdiRocketLaunchOutline } from '@mdi/js'
import CircularProgress from '../../components/CircularProgress.svelte';
  const items = [
    { name: 'Foo', value: 'foo' },
    { name: 'Bar', value: 'bar' },
    { name: 'Fizz', value: 'fizz' },
    { name: 'Buzz', value: 'buzz' },
  ]

  let theme
  let level
  let list = []

  let value = [2]
  let about = { index: '', active: '' }
  function onChange(e) {
    about = e.detail
    console.log('panel', about)
  }

  function onChangeLevel(l) {
    level = l
    console.log('level', l)
  }


  $: if (
    (Array.isArray(theme) && theme.length) ||
    (!Array.isArray(theme) && theme)
  ) {
    console.log('theme', theme)
  }

  $: console.log('value', value)
</script>

<Select items="{items}" bind:value="{theme}">Thème</Select>

<ExpansionPanels on:change="{onChange}" bind:value>
  <ExpansionPanel>
    <span slot="header">Addition</span>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet natus
    obcaecati molestiae quas mollitia error modi atque aliquam esse.
  </ExpansionPanel>
  <ExpansionPanel>
    <span slot="header">Multiplication</span>
    <List style="width:100%;">
      <ListItemGroup>
        <div>
          <div style="display:flex; align-items:center;">
            <span>A Trou</span>
            <div>
              <Button
                fab
                size="x-small"
                depressed
                on:click="{() => onChangeLevel(1)}">1</Button
              >
              <Button fab size="x-small" on:click="{() => onChangeLevel(2)}"
                >2</Button
              >
            </div>
            <div style="flex-grow:1;"></div>
            <Button fab size="x-small" on:click="{() => {}}">
              <Icon path="{mdiCartArrowDown}" />
            </Button>
            <Button fab size="x-small" on:click="{() => {}}">
              <Icon path="{mdiRocketLaunchOutline}" />
            </Button>
          </div>
          <ListItem ripple="{false}">
            <div style="display:flex; align-items:center;">
              <span>A Trou</span>
              <div>
                <Button
                  fab
                  size="x-small"
                  depressed
                  on:click="{() => onChangeLevel(1)}">1</Button
                >
                <Button fab size="x-small" on:click="{() => onChangeLevel(2)}"
                  >2</Button
                >
              </div>
              <div style="flex-grow:1;"></div>
              <Button fab size="x-small" on:click="{() => {}}">
                <Icon path="{mdiCartArrowDown}" />
              </Button>
              <Button fab size="x-small" on:click="{() => {}}">
                <Icon path="{mdiRocketLaunchOutline}" />
              </Button>
            </div>
          </ListItem>
        </div></ListItemGroup
      >
    </List>
  </ExpansionPanel>
  <ExpansionPanel>
    <span slot="header">Soustraction</span>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet natus
    obcaecati molestiae quas mollitia error modi atque aliquam esse.
  </ExpansionPanel>
  <ExpansionPanel>
    <span slot="header">Division</span>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat amet natus
    obcaecati molestiae quas mollitia error modi atque aliquam esse.
  </ExpansionPanel>
</ExpansionPanels>




Panier
<List />
