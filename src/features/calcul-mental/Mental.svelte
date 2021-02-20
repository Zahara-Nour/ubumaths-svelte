<script>
  import {
    Select,
    Icon,
    List,
    ListItem,
    ListItemGroup,
  } from 'svelte-materialify/src'
  import Button from 'svelte-materialify/src/components/Button'
  import ExpansionPanels, {
    ExpansionPanel,
  } from 'svelte-materialify/src/components/ExpansionPanels'
  import { mdiCartArrowDown, mdiRocketLaunchOutline } from '@mdi/js'
  import { navigate } from 'svelte-routing'
  import questions from './questions'

  const themes = Object.keys(questions).map((q) => ({ name: q, value: q }))

  let theme = themes[0].name
  let domain
  let type
  let level

  let domain_idx
  let about = { index: '', active: '' }
  function onChange(e) {
    about = e.detail
    console.log('panel', about)
  }

  function onChangeLevel(d, t, l) {
    domain = d
    type = t
    level = l
  }

  function launchTest() {
    const url = `/mental-test?theme=${theme}&domain=${domain}&type=${type}&level=${level}`
    if (decodeURI(encodeURI(url)) !== url) warn('URI malformed', url)
    navigate(url)
  }

  $: if (
    (Array.isArray(theme) && theme.length) ||
    (!Array.isArray(theme) && theme)
  ) {
    domain_idx = [0]
  }
  $: console.log('domain', domain)
  $: console.log('type', type)
  $: console.log('level', level)
</script>

<div style="margin-top:10px;margin-bottom:10px;display:flex;justify-content:flex-end">
  <Button class="mr-2" disabled="{!level}" fab size="x-small" on:click="{() => {}}">
    <Icon path="{mdiCartArrowDown}" />
  </Button>
  <Button disabled="{!level}" fab size="x-small" on:click="{launchTest}">
    <Icon path="{mdiRocketLaunchOutline}" />
  </Button>
</div>
<Select class="mt:10px" items="{themes}" bind:value="{theme}">Thème</Select>

{#if (Array.isArray(theme) && theme.length) || (!Array.isArray(theme) && theme)}
  <ExpansionPanels on:change="{onChange}" bind:value="{domain_idx}">
    {#each Object.keys(questions[theme]) as d}
      <ExpansionPanel>
        <span slot="header">{d}</span>
        <List style="width:100%;">
          <ListItemGroup>
            <div>
              {#each Object.keys(questions[theme][d]) as t}
                <div style="margin-top:5px; margin-bottom:5px;display:flex; align-items:center;">
                  <span style="margin-right:10px">{t}</span>
                  <div>
                    {#each questions[theme][d][t] as question, i}
                      <Button
                        fab
                        size="x-small"
                        depressed
                        on:click="{() => onChangeLevel(d, t, i + 1)}"
                        >{i + 1}</Button
                      >
                    {/each}
                  </div>
                  <div style="flex-grow:1;"></div>
                </div>
              {/each}
            </div>
          </ListItemGroup>
        </List>
      </ExpansionPanel>
    {/each}
  </ExpansionPanels>
{/if}

Panier
<List />
