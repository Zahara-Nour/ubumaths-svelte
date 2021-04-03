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
  import {
    mdiCartArrowDown,
    mdiRocketLaunchOutline,
    mdiHelp,
    mdiBasketPlus,
    mdiBasket,
    mdiMicroSd,
    mdiMinus,
    mdiPlus,
  } from '@mdi/js'
  import { navigate } from 'svelte-routing'
  import questions from './questions'
  import Question from './Question.svelte'
  import generateQuestion from './generateQuestion'
  import { fontSize, user } from '../../app/stores'
  import { calculMentalTest } from './stores'

  const themes = Object.keys(questions)
  let basket = []
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
  let showBasket = false

  for (let i = 0; i < themes.length; i++) {
    levelsIdxs[i] = 0
    typeIdxs[i] = 0
    domainIdxs[i] = [0]
  }

  domain = Object.keys(questions[theme])[0]
  type = Object.keys(questions[theme][domain])[0]
  level = 1
  generated = generateExemple()

  function onChangeDomain(e) {
    const idx = e.detail.index
    domainIdxs[themeIdx] = [idx]
    domain = Object.keys(questions[theme])[idx]
    const types = Object.keys(questions[theme][domain])
    type = types[0]
    typeIdxs[themeIdx] = 0
    level = 1
    levelsIdxs[themeIdx] = 0
    generated = generateExemple()
  }

  function onChangeLevel(d, d_i, t, t_i, l) {
    type = t
    typeIdxs[themeIdx] = t_i
    level = l + 1
    levelsIdxs[themeIdx] = l
    generated = generateExemple()
  }

  function launchTest() {
    let url
    if (showBasket) {
      calculMentalTest.set(basket)
      url = '/mental-test'
    } else {
      url = `/mental-test?theme=${theme}&domain=${domain}&type=${type}&level=${level}`
    }

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
    return generateQuestion(q)
  }

  let active = false
  function open() {
    active = true
  }
  function close() {
    active = false
  }

  function addToBasket() {
    const qs = questions[theme][domain][type]
    const q = qs.find((elt) => qs.indexOf(elt) + 1 === parseInt(level, 10))
    basket.push({
      question: q,
      generated: generateExemple(),
      count: 1,
    })
    console.log('baskt', basket)
  }

  function toggleBasket() {
    showBasket = !showBasket
  }

  function addItem(i) {
    basket[i].count++
  }
  function removeItem(i) {
    if (basket[i].count > 0) {
      basket[i].count--
    }
  }

  $: if (themeIdx >= 0) {
    theme = themes[themeIdx]
    console.log('changing theme', theme)
    domain = Object.keys(questions[theme])[domainIdxs[themeIdx]]
    type = Object.keys(questions[theme][domain])[typeIdxs[themeIdx]]
    level = levelsIdxs[themeIdx] + 1
    generated = generateExemple()
  }

  $: isLoggedIn = $user.id != 'guest'
  $: disable = !theme || !domain || !type || !(level >= 0)
</script>

<h4 class="mt-3">Calcul mental</h4>
<div class="mt-3 mb-3 d-flex justify-end">
  {#if !showBasket}
    <Button
      class="ml-2 mr-2"
      disabled="{disable}"
      fab
      size="x-small"
      on:click="{open}"
    >
      <Icon path="{mdiHelp}" />
    </Button>
  {/if}
  {#if isLoggedIn && $user.roles.includes('teacher')}
    {#if !showBasket}
      <Button
        class="ml-2 mr-2"
        disabled="{disable}"
        fab
        size="x-small"
        on:click="{addToBasket}"
      >
        <Icon path="{mdiBasketPlus}" />
      </Button>
    {/if}
    <Button
      disabled="{disable}"
      class="{showBasket ? 'orange white-text' : ''} ml-2 mr-2"
      fab
      size="x-small"
      on:click="{toggleBasket}"
    >
      <Icon path="{mdiBasket}" />
    </Button>
  {/if}
  <Button
    class="ml-2 mr-2"
    disabled="{disable}"
    fab
    size="x-small"
    on:click="{launchTest}"
  >
    <Icon path="{mdiRocketLaunchOutline}" />
  </Button>
</div>

{#if showBasket}
  {#if basket.length}
    <List>
      {#each basket as item, i}
        <div class="mt-2 mb-2 d-flex flex-row">
          <Card style="width:300px;max-width:80vh">
            <CardTitle>{item.generated.description}</CardTitle>
            {#if item.generated.subdescription}
              <CardSubtitle>{item.generated.subdescription}</CardSubtitle>
            {/if}
            <CardText>
              <Question question="{item.generated}" />
            </CardText>
          </Card>
          <div class="d-flex flex-column">
            <div class="ml-2 d-flex flex-row">
              <Button
                class="ml-1 mr-1"
                disabled="{disable}"
                fab
                size="x-small"
                on:click="{() => removeItem(i)}"
              >
                <Icon path="{mdiMinus}" />
              </Button>
              <Button
                class="ml-1 mr-1"
                disabled="{disable}"
                fab
                size="x-small"
                on:click="{() => addItem(i)}"
              >
                <Icon path="{mdiPlus}" />
              </Button>
            </div>
            <div class="d-flex flex-row justify-center">
              <div class="mt-2">
                {basket[i].count}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </List>
  {:else}
    Le panier est vide.
  {/if}
{:else}
  <Tabs centerActive class="orange-text" bind:value="{themeIdx}" style="font-size:{$fontSize}px;">
    <div slot="tabs">
      {#each themes as item}
        <Tab><span style="font-size:{$fontSize}px;">{item}</span></Tab>
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
              <span slot="header" style="font-size:{$fontSize}px;color:red">{d}</span>
              <List style="width:100%;">
                <div style="font-size:{$fontSize}px;">
                  {#each Object.keys(questions[them][d]) as t, t_i}
                    <div
                      class="mt-2 mb-2 d-flex align-center"
                    >
                      <span class="mr-3">{t}</span>
                      <div>
                        {#each questions[them][d][t] as _, i}
                          <Button
                            class="{d_i === domainIdxs[them_i][0] &&
                            typeIdxs[them_i] === t_i &&
                            levelsIdxs[them_i] === i
                              ? 'red white-text'
                              : ''} ma-1"
                            fab
                            size="x-small"
                            
                            depressed
                            on:click="{() => onChangeLevel(d, d_i, t, t_i, i)}"
                            ><span style="font-size:{$fontSize}px;">{i + 1}</span></Button
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
{/if}

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
