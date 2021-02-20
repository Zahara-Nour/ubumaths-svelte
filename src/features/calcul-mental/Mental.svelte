<script>
  import {
    Select,
    Icon,
    List,
    ListItem,
    ListItemGroup,
    Dialog,
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
  } from 'svelte-materialify/src'
  import Button from 'svelte-materialify/src/components/Button'
  import ExpansionPanels, {
    ExpansionPanel,
  } from 'svelte-materialify/src/components/ExpansionPanels'
  import { mdiCartArrowDown, mdiRocketLaunchOutline, mdiHelp } from '@mdi/js'
  import { navigate } from 'svelte-routing'
  import questions from './questions'
  import Question from './Question.svelte'
  import generateQuestion from './generateQuestion'

  const themes = Object.keys(questions).map((q) => ({ name: q, value: q }))

  let theme = themes[0].name
  let domain
  let type
  let level
  let generated

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
    generateExemple()
  }

  function launchTest() {
    const url = `/mental-test?theme=${theme}&domain=${domain}&type=${type}&level=${level}`
    if (decodeURI(encodeURI(url)) !== url) warn('URI malformed', url)
    navigate(url)
  }

  function generateExemple() {
    let qs = questions[theme][domain][type]
    console.log('questions', qs)
    qs = qs.filter((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    console.log('questions', qs)
    const q = qs[0]
    console.log('question', q)
    generated = generateQuestion(q)
  }

  let active = false
  function open() {
    active = true
  }
  function close() {
    active = false
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

<h4 style="margin-top:10px">Calcul mental</h4>
<div
  style="margin-top:10px;margin-bottom:10px;display:flex;justify-content:flex-end"
>
  <Button class="mr-2" disabled="{!level}" fab size="x-small" on:click="{open}">
    <Icon path="{mdiHelp}" />
  </Button>
  <!-- <Button
    class="mr-2"
    disabled="{!level}"
    fab
    size="x-small"
    on:click="{() => {}}"
  >
    <Icon path="{mdiCartArrowDown}" />
  </Button> -->
  <Button disabled="{!level}" fab size="x-small" on:click="{launchTest}">
    <Icon path="{mdiRocketLaunchOutline}" />
  </Button>
</div>
<Select class="mt:10px" items="{themes}" bind:value="{theme}">Thème</Select>

{#if (Array.isArray(theme) && theme.length) || (!Array.isArray(theme) && theme)}
  <ExpansionPanels on:change="{onChange}" bind:value="{domain_idx}">
    {#each Object.keys(questions[theme]) as d}
      <ExpansionPanel>
        <span slot="header" style="color:red">{d}</span>
        <List style="width:100%;">
      
            <div>
              {#each Object.keys(questions[theme][d]) as t}
                <div
                  style="margin-top:5px; margin-bottom:5px;display:flex; align-items:center;"
                >
                  <span style="margin-right:10px">{t}</span>
                  <div>
                    {#each questions[theme][d][t] as question, i}
                      <Button
                        class="{d === domain && type === t && level === i + 1
                          ? 'red white-text'
                          : ''}"
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
        
        </List>
      </ExpansionPanel>
    {/each}
  </ExpansionPanels>
{/if}

<List />

<Dialog bind:active>
  <Card>
    <CardTitle>{generated.description}</CardTitle>
    {#if generated.subdescription}
      <CardSubtitle>{generated.subdescription}</CardSubtitle>
    {/if}
    <CardText>
      <Question question="{generated}" />
    </CardText>
  </Card>
</Dialog>
