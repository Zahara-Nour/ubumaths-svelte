<script>
  import {
    List,
    Button,
    Tabs,
    Tab,
    TabContent,
    ExpansionPanels,
    ExpansionPanel,
  } from 'svelte-materialify/src'

  import { navigate } from 'svelte-routing'
  import questions from './questions'
  import generateQuestion from './generateQuestion'
  import { mode, menuFontSize, user } from '../../app/stores'
  import { calculMentalAssessment } from './stores'
  import queryString from 'query-string'
  import Exemple from './Exemple.svelte'
  import Buttons from './Buttons.svelte'
  import Basket from './Basket.svelte'
  import Assessments from './Assessments.svelte'

  export let location

  const themes = Object.keys(questions)
  let queryParams
  let basket = []
  let theme
  let themeIdx
  let domain
  let domainIdx
  let domainsdxs = []
  let subdomain
  let subdomainIdx
  let subdomainsIdxs = []
  let level
  let levelIdx
  let levelsIdxs = []
  let generated
  let isLoggedIn
  let showBasket = false
  let disableSave = true
  let loadAssessments = () => {}
  let saveAssessment = () => {}
  let displayDescription = false
  let isTeacher
  let classroom = false
  let modified = false

  $mode = 'menu'

  for (let theme_i = 0; theme_i < themes.length; theme_i++) {
    Object.keys(questions).forEach((th, th_i) => {
      domainsdxs[th_i] = 0
      subdomainsIdxs[th_i] = []
      levelsIdxs[th_i] = []

      Object.keys(questions[th]).forEach((dom, dom_i) => {
        subdomainsIdxs[th_i][dom_i] = 0
        levelsIdxs[th_i][dom_i] = []

        Object.keys(questions[th][dom]).forEach((subdom, subdom_i) => {
          levelsIdxs[th_i][dom_i][subdom_i] = 0
        })
      })
    })
  }

  if (location.search) {
    queryParams = queryString.parse(location.search)
    theme = queryParams.theme
    themeIdx = Object.keys(questions).indexOf(theme)
    domain = queryParams.domain
    domainIdx = Object.keys(questions[theme]).indexOf(domain)
    subdomain = queryParams.subdomain
    subdomainIdx = Object.keys(questions[theme][domain]).indexOf(subdomain)
    level = queryParams.level
    levelIdx = level - 1
  } else {
    themeIdx = 0
    theme = themes[0]
    domainIdx = 0
    domain = Object.keys(questions[theme])[0]
    subdomainIdx = 0
    subdomain = Object.keys(questions[theme][domain])[0]
    levelIdx = 0
    level = 1
  }

  function onChangeTheme(e) {
    themeIdx = e.detail
    theme = themes[themeIdx]
    domainIdx = domainsdxs[themeIdx]
    domain = Object.keys(questions[theme])[domainIdx]
    subdomainIdx = subdomainsIdxs[themeIdx][domainIdx]
    subdomain = Object.keys(questions[theme][domain])[subdomainIdx]
    levelIdx = levelsIdxs[themeIdx][domainIdx][subdomainIdx]
    level = levelIdx + 1
  }

  function onChangeDomain(e) {
    domainIdx = e.detail.index
    domainsdxs[themeIdx] = domainIdx
    domain = Object.keys(questions[theme])[domainIdx]
    subdomainIdx = subdomainsIdxs[themeIdx][domainIdx]
    subdomain = Object.keys(questions[theme][domain])[subdomainIdx]
    levelIdx = levelsIdxs[themeIdx][domainIdx][subdomainIdx]
    level = levelIdx + 1
  }

  function onChangeLevel(t, t_i, l) {
    subdomainIdx = t_i
    subdomain = t
    subdomainsIdxs[themeIdx][domainIdx] = subdomainIdx
    levelIdx = l
    level = l + 1
    levelsIdxs[themeIdx][domainIdx][subdomainIdx] = l
  }

  function launchTest({ type, assessment }) {
    let url
    // passation d'une évaluation programmée
    if (type === 'assessment') {
      calculMentalAssessment.set(assessment)
      url = `/mental-test`
    } 
    // entrainement à une évaluation programmée
    else if (type === 'practice') {
      calculMentalAssessment.set(assessment)
      url = `/mental-test?practice=true`
    } 
    // entrainement aux exercices du panier courant
    else if (basket.length) {
      calculMentalAssessment.set({ questions: basket })
      url = '/mental-test'
    }
    // entrainement à l'exercice sélectionné par le menu
    else {
      url = `/mental-test?theme=${theme}&domain=${domain}&subdomain=${subdomain}&level=${level}`
    }

    // rajout du mode classroom
    if (url.includes('?')) {
      url += `&classroom=${classroom}`
    } else {
      url += `?classroom=${classroom}`
    }

    if (decodeURI(encodeURI(url)) !== url) warn('URI malformed', url)
    navigate(url)
  }

  function generateExemple(theme, domain, subdomain, level) {
    let qs = questions[theme][domain][subdomain]
    const q = qs.find((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    return generateQuestion(q)
  }

  function addToBasket(theme, domain, subdomain, level, count) {
    let qs = questions[theme][domain][subdomain]
    // console.log('questions', qs)
    const q = qs.find((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    const index = basket.findIndex(
      (item) =>
        item.theme === theme &&
        item.domain === domain &&
        item.subdomain === subdomain &&
        item.level === level,
    )
    if (index !== -1) {
      basket[index].count++
    } else {
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
    }
    modified = true
  }

  const fillBasket = () => addToBasket(theme, domain, subdomain, level, 1)

  function copyLink() {
    console.log('clipboard')
    const url = `https://ubumaths.net/mental-test?theme=${theme}&domain=${domain}&subdomain=${subdomain}&level=${level}`
    navigator.clipboard
      .writeText(url)
      .then(function () {
        console.log('copy to clipboard: ', url)
      })
      .catch(function () {
        console.log('failed to write to clipboard')
      })
  }

  $: isLoggedIn = $user.id != 'guest'
  $: isTeacher = isLoggedIn && $user.roles.includes('teacher')
  $: disable = !theme || !domain || !subdomain || !(level >= 0)
  $: generated = generateExemple(theme, domain, subdomain, level)
</script>

<h4 class="mt-5 pa-3 mb-5 amber white-text">Calcul mental</h4>

<Assessments disable="{disable}" launchTest="{launchTest}" />

{#if showBasket}
  <h5 class="mt-8 amber-text font-weight-bold">Panier</h5>
{:else}
  <h5 class="mt-8 amber-text font-weight-bold">Entrainement libre</h5>
{/if}

<Buttons
  isTeacher="{isTeacher}"
  bind:showBasket
  bind:classroom
  basket="{basket}"
  launchTest="{launchTest}"
  fillBasket="{fillBasket}"
  disableSave="{disableSave}"
  copyLink="{copyLink}"
  loadAssessments="{loadAssessments}"
  saveAssessment="{saveAssessment}"
  disable="{disable}"
/>

{#if isTeacher && showBasket}
  <Basket
    bind:basket
    bind:disableSave
    bind:loadAssessments
    bind:saveAssessment
    bind:modified
    addToBasket="{addToBasket}"
  />
{:else}
  <Tabs
    centerActive
    class="orange-text"
    value="{themeIdx}"
    on:change="{onChangeTheme}"
  >
    <div slot="tabs">
      {#each themes as item}
        <Tab><span style="font-size:{$menuFontSize}px;">{item}</span></Tab>
      {/each}
    </div>

    {#each themes as them, them_i}
      <TabContent>
        <ExpansionPanels on:change="{onChangeDomain}" value="{[domainIdx]}">
          {#each Object.keys(questions[them]) as d, d_i}
            <ExpansionPanel>
              <span
                slot="header"
                class="text-uppercase red-text"
                style="font-size:{$menuFontSize}px"
              >
                {d}
              </span>
              <List style="width:100%;">
                <div style="font-size:{$menuFontSize}px;">
                  {#each Object.keys(questions[them][d]) as t, t_i}
                    <div class="mt-2 mb-2 d-flex align-center">
                      <span class="mr-3">{t}</span>
                      <div>
                        {#each questions[them][d][t] as _, i}
                          <Button
                            class="{subdomainIdx === t_i && levelIdx === i
                              ? 'red white-text'
                              : ''} ma-1"
                            fab
                            size="x-small"
                            depressed
                            on:click="{() => onChangeLevel(t, t_i, i)}"
                            ><span style="font-size:{$menuFontSize}px;"
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

<!-- <Dialog bind:active="{displayDescription}">
  <Exemple question={generated}/>
</Dialog> -->

{#if displayDescription}
  <div
    class="grey lighten-2 pa-2 pt-5 pb-5"
    style="{'position:sticky; bottom:0; z-index:2;'}"
  >
    <Exemple question="{generated}" />
  </div>
{/if}
