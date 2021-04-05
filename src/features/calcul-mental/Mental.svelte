<script>
  import {
    Icon,
    List,
    ListItem,
    Dialog,
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Tabs,
    Tab,
    TabContent,
    TextField,
    Tooltip,
    Snackbar,
    Divider,
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
    mdiCloudDownloadOutline,
    mdiCloudUploadOutline,
  } from '@mdi/js'
  import { navigate } from 'svelte-routing'
  import questions from './questions'
  import Question from './Question.svelte'
  import generateQuestion from './generateQuestion'
  import { fontSize, user } from '../../app/stores'
  import { calculMentalTest } from './stores'
  import { getCollection } from '../../app/collections'
  import { saveDocument } from '../../app/db'

  const themes = Object.keys(questions)
  let basket = []
  let theme = themes[0]
  let themeIdx = 0
  let domain
  let domainIdxs = []
  let subdomain
  let subdomainsIdxs = []
  let level
  let levelsIdxs = []
  let generated
  let isLoggedIn
  let showBasket = false
  let evalTitle = 'toto'
  let evals
  let evalsTitles = []
  let disableSave = true
  let saving = false
  let saveSuccess = false
  let saveFailure = false
  let displayAssessmentList = false
  const titleRules = [
    (v) => !evalsTitles.includes(v) || "Titre d'évaluation déjà utilisé",
  ]

  for (let i = 0; i < themes.length; i++) {
    levelsIdxs[i] = 0
    subdomainsIdxs[i] = 0
    domainIdxs[i] = [0]
  }

  domain = Object.keys(questions[theme])[0]
  subdomain = Object.keys(questions[theme][domain])[0]
  level = 1
  generated = generateExemple(theme, domain, subdomain, level)

  function onChangeDomain(e) {
    const idx = e.detail.index
    domainIdxs[themeIdx] = [idx]
    domain = Object.keys(questions[theme])[idx]
    const subdomains = Object.keys(questions[theme][domain])
    subdomain = subdomains[0]
    subdomainsIdxs[themeIdx] = 0
    level = 1
    levelsIdxs[themeIdx] = 0
    generated = generateExemple(theme, domain, subdomain, level)
  }

  function onChangeLevel(d, d_i, t, t_i, l) {
    subdomain = t
    subdomainsIdxs[themeIdx] = t_i
    level = l + 1
    levelsIdxs[themeIdx] = l
    generated = generateExemple(theme, domain, subdomain, level)
  }

  function launchTest() {
    let url
    if (showBasket) {
      calculMentalTest.set(basket)
      url = '/mental-test'
    } else {
      url = `/mental-test?theme=${theme}&domain=${domain}&subdomain=${subdomain}&level=${level}`
    }

    if (decodeURI(encodeURI(url)) !== url) warn('URI malformed', url)
    navigate(url)
  }

  function generateExemple(theme, domain, subdomain, level) {
    let qs = questions[theme][domain][subdomain]
    // console.log('questions', qs)
    const q = qs.find((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    // console.log('questions', qs)

    // console.log('question', q)
    return generateQuestion(q)
  }

  let displayDescription = false
  function open() {
    displayDescription = true
  }
  function close() {
    displayDescription = false
  }

  function addToBasket(theme, domain, subdomain, level, count) {
    let qs = questions[theme][domain][subdomain]
    // console.log('questions', qs)
    const q = qs.find((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    basket = [
      ...basket,
      {
        theme,
        domain,
        subdomain,
        level,
        count,
        generated: generateExemple(theme, domain, subdomain, level),
        ...q,
      },
    ]
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

  async function save() {
    const path = `Users/${$user.id}/Assessments`
    const questions = []
    const document = {
      date: new Date().getTime(),
      questions: basket,
      title: evalTitle,
    }
    saving = true
    const assessment = await saveDocument({ path, document })
    if (assessment) {
      evals = [...evals, assessment]
      saveSuccess = true
    } else {
      saveFailure = true
    }
    saving = false
  }

  function load() {
    displayAssessmentList = true
  }

  async function fetchEvals() {
    evals = await getCollection({
      collectionPath: `Users/${$user.id}/Assessments`,
    }).catch((error) => console.log(error))
    evalsTitles = evals.map((ev) => ev.title)
  }

  function loadAssessment(assessment) {
    basket = []
    console.log('assessment', assessment)
    assessment.questions.forEach((q) => {
      addToBasket(q.theme, q.domain, q.subdomain, q.level, q.count)
    })

    console.log('baskt', basket)
    displayAssessmentList = false
  }

  $: if (themeIdx >= 0) {
    theme = themes[themeIdx]
    console.log('changing theme', theme)
    domain = Object.keys(questions[theme])[domainIdxs[themeIdx]]
    subdomain = Object.keys(questions[theme][domain])[subdomainsIdxs[themeIdx]]
    level = levelsIdxs[themeIdx] + 1
    generated = generateExemple(theme, domain, subdomain, level)
  }

  $: isLoggedIn = $user.id != 'guest'
  $: disable = !theme || !domain || !subdomain || !(level >= 0)

  $: if (showBasket && !evals) {
    console.log('fetch evals')
    fetchEvals()
  }
  $: {
    console.log('evals', evals)
    if (evals) {
      evalsTitles = evals.map((ev) => ev.title)
    }
  }
  $: disableSave = evalTitle === '' || evalsTitles.includes(evalTitle) || saving
</script>

<h4 class="mt-3">Calcul mental</h4>
<div class="mt-3 mb-3 d-flex">
  {#if showBasket}
    <Tooltip bottom>
      <Button
        class="ml-2 mr-2"
        disabled="{disable}"
        fab
        size="x-small"
        on:click="{load}"
      >
        <Icon path="{mdiCloudDownloadOutline}" />
      </Button>
      <span slot="tip">Charger</span>
    </Tooltip>
    <Tooltip bottom>
      <Button
        class="ml-2 mr-2"
        disabled="{disableSave}"
        fab
        size="x-small"
        on:click="{save}"
      >
        <Icon path="{mdiCloudUploadOutline}" />
      </Button>
      <span slot="tip">Enregistrer</span>
    </Tooltip>
  {/if}
  <div class="flex-grow-1"></div>
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
        on:click="{() => addToBasket(theme, domain, subdomain, level, 1)}"
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
  <TextField filled bind:value="{evalTitle}" rules="{titleRules}">Titre</TextField>
  
  {#if basket.length}
    <List>
      {#each basket as item, i}
        <div class="mt-2 mb-2 d-flex flex-row">
          <Card style="width:300px;max-width:80vh">
            <CardTitle>{item.description}</CardTitle>
            {#if item.subdescription}
              <CardSubtitle>{item.subdescription}</CardSubtitle>
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
  <Tabs centerActive class="orange-text" bind:value="{themeIdx}">
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
              <span slot="header" style="font-size:{$fontSize}px;color:red"
                >{d}</span
              >
              <List style="width:100%;">
                <div style="font-size:{$fontSize}px;">
                  {#each Object.keys(questions[them][d]) as t, t_i}
                    <div class="mt-2 mb-2 d-flex align-center">
                      <span class="mr-3">{t}</span>
                      <div>
                        {#each questions[them][d][t] as _, i}
                          <Button
                            class="{d_i === domainIdxs[them_i][0] &&
                            subdomainsIdxs[them_i] === t_i &&
                            levelsIdxs[them_i] === i
                              ? 'red white-text'
                              : ''} ma-1"
                            fab
                            size="x-small"
                            depressed
                            on:click="{() => onChangeLevel(d, d_i, t, t_i, i)}"
                            ><span style="font-size:{$fontSize}px;"
                              >{i + 1}</span
                            ></Button
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

<Dialog bind:active="{displayDescription}">
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

<Dialog bind:active="{displayAssessmentList}">
  <div class="d-flex justify-center mt-2 mb-2">
    <List class="elevation-2">
      <h6>Liste des évaluations</h6>
      <Divider />

      {#each evals as assessment}
        <ListItem on:click="{() => loadAssessment(assessment)}">
          {assessment.title}
        </ListItem>
      {/each}
    </List>
  </div>
</Dialog>

<Snackbar
  class="justify-space-between red white-text"
  bind:active="{saveFailure}"
  text
  right
  top
  timeout="{3000}"
>
  Enregistrement réussi
</Snackbar>

<Snackbar
  class="justify-space-between green  white-text"
  bind:active="{saveSuccess}"
  text
  right
  top
  timeout="{3000}"
>
  Enregistrement réussi
</Snackbar>
