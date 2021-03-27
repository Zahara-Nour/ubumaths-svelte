<script>
  import {
    Icon,
    List,
    Dialog,
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Tabs,
    Tab,
    TabContent,
  } from 'svelte-materialify/src'
  import ExpansionPanels, {
    ExpansionPanel,
  } from 'svelte-materialify/src/components/ExpansionPanels'
  import { mdiCartArrowDown, mdiRocketLaunchOutline, mdiHelp } from '@mdi/js'
  import { navigate } from 'svelte-routing'
  import questions from './questions'
  import Question from './Question.svelte'
  import generateQuestion from './generateQuestion'
  import { user } from '../../app/stores'

  const themes = Object.keys(questions)

  let theme = themes[0]
  let themeIdx = 0
  let domain
  let domainIdxs = []
  let type
  let typeIdxs = []
  let level
  let levelsIdxs = []
  let generated
  let isLoggedIn

  for (let i = 0; i < themes.length; i++) {
    levelsIdxs[i] = 0
    typeIdxs[i] = 0
    domainIdxs[i] = [0]
  }

  domain = Object.keys(questions[theme])[0]
  type = Object.keys(questions[theme][domain])[0]
  level = 1
  generateExemple()

  function onChangeDomain(e) {
    const idx = e.detail.index
    domainIdxs[themeIdx] = [idx]
    domain = Object.keys(questions[theme])[idx]
    const types = Object.keys(questions[theme][domain])
    type = types[0]
    typeIdxs[themeIdx] = 0
    level = 1
    levelsIdxs[themeIdx] = 0
    generateExemple()
  }

  function onChangeLevel(d, d_i, t, t_i, l) {
    type = t
    typeIdxs[themeIdx] = t_i
    level = l + 1
    levelsIdxs[themeIdx] = l
    generateExemple()
  }

  function launchTest() {
    const url = `/mental-test?theme=${theme}&domain=${domain}&type=${type}&level=${level}`
    if (decodeURI(encodeURI(url)) !== url) warn('URI malformed', url)
    navigate(url)
  }

  function generateExemple() {
    let qs = questions[theme][domain][type]
    // console.log('questions', qs)
    qs = qs.filter((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    // console.log('questions', qs)
    const q = qs[0]
    // console.log('question', q)
    generated = generateQuestion(q)
  }

  let active = false
  function open() {
    active = true
  }
  function close() {
    active = false
  }

  $: if (themeIdx >= 0) {
    theme = themes[themeIdx]
    console.log('changing theme', theme)
    domain = Object.keys(questions[theme])[domainIdxs[themeIdx]]
    type = Object.keys(questions[theme][domain])[typeIdxs[themeIdx]]
    level = levelsIdxs[themeIdx] + 1
    generateExemple()
  }

  $: isLoggedIn = $user.id != 'guest'
  $: disable = !theme || !domain || !type || !(level >= 0)
</script>

<h4 style="margin-top:10px">Calcul mental</h4>
<div
  style="margin-top:10px;margin-bottom:10px;display:flex;justify-content:flex-end"
>
  <Button
    class="mr-2"
    disabled="{disable}"
    fab
    size="x-small"
    on:click="{open}"
  >
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
  <Button disabled="{disable}" fab size="x-small" on:click="{launchTest}">
    <Icon path="{mdiRocketLaunchOutline}" />
  </Button>
</div>

<Tabs centerActive class="orange-text" bind:value="{themeIdx}">
  <div slot="tabs">
    {#each themes as item}
      <Tab>{item}</Tab>
    {/each}
  </div>

  {#each themes as them, them_i}
    <TabContent>
      <ExpansionPanels
        on:change="{onChangeDomain}"
        bind:value="{domainIdxs[them_i]}"
      >
        {#each Object.keys(questions[them]) as d, d_i}
          <ExpansionPanel>
            <span slot="header" style="color:red">{d}</span>
            <List style="width:100%;">
              <div>
                {#each Object.keys(questions[them][d]) as t, t_i}
                  <div
                    style="margin-top:5px; margin-bottom:5px;display:flex; align-items:center;"
                  >
                    <span style="margin-right:10px">{t}</span>
                    <div>
                      {#each questions[them][d][t] as _, i}
                        <Button
                          class="{d_i === domainIdxs[them_i][0] &&
                          typeIdxs[them_i] === t_i &&
                          levelsIdxs[them_i] === i
                            ? 'red white-text'
                            : ''}"
                          fab
                          size="x-small"
                          depressed
                          on:click="{() => onChangeLevel(d, d_i, t, t_i, i)}"
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
    </TabContent>
  {/each}
</Tabs>

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
