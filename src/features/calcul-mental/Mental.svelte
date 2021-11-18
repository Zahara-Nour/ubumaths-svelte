<script>
  import {
    List,
    Button,
    Tabs,
    Tab,
    TabContent,
    ExpansionPanels,
    ExpansionPanel,
    Badge,
    Select,
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
  import { getLogger } from '../../app/utils'
  import { CINQUIEME, gradeMatchesClass, grades } from '../../app/grade'

  export let location

  const { info, trace, fail } = getLogger('Mental', 'info')
  let themes = []
  let queryParams={}
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
  let availables = {}
  let value
  let disable
  let grade

  $mode = 'menu'
  const gradesList = grades.map((grade) => ({
    name: grade,
    value: grade,
  }))

  if (location.search) {
    queryParams = queryString.parse(location.search)
  }

  if (queryParams.grade) {
    grade = queryParams.grade
    
  } else {
    grade =CINQUIEME
  }

  onChangeGrade(grade)
  
  if (queryParams.theme && queryParams.domain && queryParams.subdomain) {
    theme = queryParams.theme
    console.log('theme', theme)
    themeIdx = Object.keys(availables).indexOf(theme)
    domain = queryParams.domain
    console.log('domain', domain)
    domainIdx = Object.keys(availables[theme]).indexOf(domain)
    subdomain = queryParams.subdomain
    console.log('subdomain', subdomain)
    subdomainIdx = Object.keys(availables[theme][domain]).indexOf(subdomain)
    console.log('level', level)
    level = queryParams.level
    levelIdx = level - 1
  }
  function onChangeGrade(g) {
    grade = g
    console.log('onChangeGrade', grade)
    availables = getAvailables(grade)

    themes = Object.keys(availables)
    domainsdxs = []
    subdomainsIdxs = []
    levelsIdxs = []
    for (let theme_i = 0; theme_i < themes.length; theme_i++) {
      Object.keys(availables).forEach((th, th_i) => {
        domainsdxs[th_i] = 0
        subdomainsIdxs[th_i] = []
        levelsIdxs[th_i] = []

        Object.keys(availables[th]).forEach((dom, dom_i) => {
          subdomainsIdxs[th_i][dom_i] = 0
          levelsIdxs[th_i][dom_i] = []

          Object.keys(availables[th][dom]).forEach((subdom, subdom_i) => {
            levelsIdxs[th_i][dom_i][subdom_i] = 0
          })
        })
      })
    }

    themeIdx = 0
    theme = themes[0]
    domainIdx = 0
    domain = Object.keys(availables[theme])[0]
    subdomainIdx = 0
    subdomain = Object.keys(availables[theme][domain])[0]
    levelIdx = 0
    level = 1
  }

  function onChangeTheme(e) {
    themeIdx = e.detail
    // console.log('e', e)
    console.log('themes', themes)
    console.log('themeIdx', themeIdx)
    theme = themes[themeIdx]
    console.log('theme', theme)
    domainIdx = domainsdxs[themeIdx]
    domain = Object.keys(availables[theme])[domainIdx]
    subdomainIdx = subdomainsIdxs[themeIdx][domainIdx]
    subdomain = Object.keys(availables[theme][domain])[subdomainIdx]
    levelIdx = levelsIdxs[themeIdx][domainIdx][subdomainIdx]
    level = levelIdx + 1
  }

  function onChangeDomain(e) {
    domainIdx = e.detail.index
    domainsdxs[themeIdx] = domainIdx
    domain = Object.keys(availables[theme])[domainIdx]
    subdomainIdx = subdomainsIdxs[themeIdx][domainIdx]
    subdomain = Object.keys(availables[theme][domain])[subdomainIdx]
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

  function launchTest(assessment) {
    let url = '/mental-test'

    // passation d'une évaluation programmée
    if (assessment) {
      info(`Launching ${assessment.type}`)
      calculMentalAssessment.set(assessment)
    }

    // entrainement aux exercices du panier courant
    else if (basket.length) {
      info('Launching questions from basket')
      calculMentalAssessment.set({ questions: basket })
    }
    // entrainement à l'exercice sélectionné par le menu
    else {
      info('Launching exercice from menu')
      url = `/mental-test?theme=${theme}&domain=${domain}&subdomain=${subdomain}&level=${level}&grade=${grade}`
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
    console.log('q', q)
    return generateQuestion(q)
  }

  const flushBasket = () => {
    basket = []
  }

  function addToBasket(theme, domain, subdomain, level, count, delay) {
    let qs = questions[theme][domain][subdomain]

    const q = qs.find((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    if (!delay) delay = q.defaultDelay
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
          delay,
          generated: generateExemple(theme, domain, subdomain, level),
          ...q,
        },
      ]
    }
    modified = true
  }

  const fillBasket = () => addToBasket(theme, domain, subdomain, level, 1)

  function copyLink() {
    const url = `https://ubumaths.net/mental-test?theme=${theme}&domain=${domain}&subdomain=${subdomain}&level=${level}`
    navigator.clipboard
      .writeText(url)
      .then(function () {
        info('copy exercice url to clipboard: ', url)
      })
      .catch(function () {
        fail('failed to write exercice url to clipboard')
      })
  }

  function getClassColor(theme, domain, subd, l, isStudent, progression) {
    // subdomainIdx === subd && levelIdx === l

    let classColor = ''
    if (isStudent && progression) {
      const currentLevel = progression[theme][domain][subd]
      if (
        l <= currentLevel &&
        subdomain === subd &&
        parseInt(level, 10) === l
      ) {
        classColor = 'green-text'
      } else if (l <= currentLevel) {
        classColor = 'green white-text'
      }
    } else if (subdomain === subd && parseInt(level, 10) === l) {
      classColor = 'red white-text'
    }

    return classColor
  }

  function getAvailables(grade) {
    const available = {}
    Object.keys(questions).forEach((theme) => {
      available[theme] = {}
      Object.keys(questions[theme]).forEach((domain) => {
        available[theme][domain] = {}
        Object.keys(questions[theme][domain]).forEach((subdomain) => {
          available[theme][domain][subdomain] = []
          questions[theme][domain][subdomain].forEach((q, i) => {
            if (gradeMatchesClass(q.grade, grade)) {
              available[theme][domain][subdomain].push(i + 1)
            }
          })
          if (!available[theme][domain][subdomain].length) {
            delete available[theme][domain][subdomain]
          }
        })
        if (!Object.keys(available[theme][domain]).length) {
          delete available[theme][domain]
        }
      })
      if (!Object.keys(available[theme]).length) {
        delete available[theme]
      }
    })
    console.log('availables', available)
    return available
  }


  $: isLoggedIn = $user.id != 'guest'
  $: isTeacher = isLoggedIn && $user.roles.includes('teacher')
  $: isStudent = isLoggedIn && $user.roles.includes('student')

  $: if (isStudent) {
    grade = $user.grade
  } else {
    grade = CINQUIEME
  }
 
 
  $: if (theme && domain && subdomain && level >= 1) {
    generated = generateExemple(theme, domain, subdomain, level)
    disable = false
    console.log('exemple', generated)
  } else {
    disable = true
    console.log('not generated')
  }
  $: console.log('grade', grade)
  $: console.log('value', value)
  $: console.log('theme', theme)
  $: console.log('domain', domain)
  $: console.log('subdomain', subdomain)
  $: console.log('level', level)
  $: console.log('themeIdx', themeIdx)
  $: console.log('disable', disable)
</script>

<h4 class="mt-5 pa-3 mb-5 amber white-text">Calcul mental</h4>

<Assessments disable="{disable}" launchTest="{launchTest}" />

{#if showBasket}
  <h5 class="mt-8 amber-text font-weight-bold">Panier</h5>
{:else}
  <h5 class="mt-8 amber-text font-weight-bold">Entrainement libre</h5>
{/if}

<Buttons
  bind:showBasket
  bind:classroom
  bind:displayDescription
  basket="{basket}"
  launchTest="{launchTest}"
  fillBasket="{fillBasket}"
  disableSave="{disableSave}"
  copyLink="{copyLink}"
  loadAssessments="{loadAssessments}"
  saveAssessment="{saveAssessment}"
  disable="{disable}"
  flushBasket="{flushBasket}"
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
  {#if !isStudent}
    <Select class="mt-3 mb-3" items="{gradesList}" value="{grade}" on:change={e=>onChangeGrade(e.detail)}
      >Niveau :</Select
    >
  {/if}

  <Tabs centerActive class="orange-text" value="{themeIdx}" on:change={onChangeTheme}>
    <div slot="tabs">
      {#each themes as item, i}
        <Tab><span style="font-size:{$menuFontSize}px;">{item}</span></Tab>
      {/each}
    </div>

    {#each themes as them}
      <TabContent>
        <ExpansionPanels on:change="{onChangeDomain}" value="{[domainIdx]}">
          {#each Object.keys(availables[them]) as d}
            {#if availables[them][d]}
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
                    {#each Object.keys(availables[them][d]) as t, t_i}
                      {#if availables[them][d][t]}
                        <div class="mt-2 mb-2 d-flex align-center">
                          <span class="mr-3">{t}</span>
                          <div>
                            {#each questions[them][d][t] as q, i}
                              {#if gradeMatchesClass(q.grade, grade)}
                              
                                <Badge class="info-color" value="{q.grade}">
                                  <Button
                                    outlined="{isStudent &&
                                      subdomainIdx === t_i &&
                                      levelIdx === i}"
                                    class="{getClassColor(
                                      theme,
                                      domain,
                                      t,
                                      i + 1,
                                      isStudent,
                                      $user.progression,
                                      subdomain,
                                      level,
                                    ) + ' ma-1'}"
                                    fab
                                    size="x-small"
                                    depressed
                                    on:click="{() => onChangeLevel(t, t_i, i)}"
                                    ><span style="font-size:{$menuFontSize}px;"
                                      >{i + 1}</span
                                    ></Button
                                  >
                                </Badge>
                              {/if}
                            {/each}
                          </div>
                          <div style="flex-grow:1;"></div>
                        </div>
                      {/if}
                    {/each}
                  </div>
                </List>
              </ExpansionPanel>
            {/if}
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
