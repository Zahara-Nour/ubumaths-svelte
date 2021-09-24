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
    ExpansionPanels,
    ExpansionPanel,
    Row,
    Col,
    Checkbox,
    Select,
    Badge,
  } from 'svelte-materialify/src'

  import {
    mdiProjectorScreen,
    mdiRocketLaunchOutline,
    mdiHelp,
    mdiBasketPlus,
    mdiBasket,
    mdiMinus,
    mdiPlus,
    mdiCloudDownloadOutline,
    mdiCloudUploadOutline,
    mdiLink,
  } from '@mdi/js'
  import { navigate } from 'svelte-routing'
  import questions from './questions'
  import Question from './Question.svelte'
  import generateQuestion from './generateQuestion'
  import { mode, menuFontSize, user } from '../../app/stores'
  import { calculMentalAssessment } from './stores'
  import { getCollection } from '../../app/collections'
  import { saveDocument, getDocument } from '../../app/db'
  import queryString from 'query-string'
  import Exemple from './Exemple.svelte'

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
  let evalTitle = 'toto'
  let teacherAssessments
  let studentAssessments
  let teacherAssessmentsTitles = []
  let disableSave = true
  let saving = false
  let saveSuccess = false
  let saveFailure = false
  let displayAssessmentList = false
  let displayDescription = false
  let classrooms
  let isTeacher
  let selectedClassrooms = []
  let selectedClassroom
  let selectedStudents = {}
  let teacherAssessmentId
  let classroom = false

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

  const titleRules = [
    (v) =>
      !teacherAssessmentsTitles.includes(v) ||
      "Titre d'évaluation déjà utilisé",
  ]

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

  function launchTest({ type, assessment }) {
    let url
    if (type === 'assessment') {
      calculMentalAssessment.set(assessment)
      url = `/mental-test`
    } else if (type === 'practice') {
      calculMentalAssessment.set(assessment)
      url = `/mental-test?practice=true`
    } else if (basket.length) {
      calculMentalAssessment.set({ questions: basket })
      url = '/mental-test'
    } else {
      url = `/mental-test?theme=${theme}&domain=${domain}&subdomain=${subdomain}&level=${level}`
    }

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

  const toggleHelp = () => (displayDescription = !displayDescription)

  function addToBasket(theme, domain, subdomain, level, count) {
    let qs = questions[theme][domain][subdomain]
    // console.log('questions', qs)
    const q = qs.find((q) => qs.indexOf(q) + 1 === parseInt(level, 10))
    const index = basket.findIndex(
      (item) =>
        item.theme === theme &&
        item.domain === domain &&
        item.subdomain === subdomain &&
        item.level === level
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
  }

  const toggleBasket = () => (showBasket = !showBasket)
  const addItem = (i) => basket[i].count++

  function removeItem(i) {
    if (basket[i].count > 1) {
      basket[i].count--
    } else {
      basket.splice(i,1)
      basket = basket
    }
  }

  async function save() {
    const path = `Users/${$user.id}/Assessments`
    const questions = []
    const document = {
      date: new Date().getTime(),
      questions: basket.map((item) => ({
        count: item.count,
        theme: item.theme,
        domain: item.domain,
        subdomain: item.subdomain,
        level: item.level,
      })),
      title: evalTitle,
    }

    saving = true

    const assessment = await saveDocument({ path, document })

    const results = await saveDocument({
      path: `Users/${$user.id}/Results`,
      document: { id: assessment.id },
    })

    if (assessment) {
      teacherAssessments = [...teacherAssessments, assessment]
      teacherAssessmentId = assessment.id
      saveSuccess = true
    } else {
      saveFailure = true
    }
    saving = false
  }

  const load = () => (displayAssessmentList = true)

  async function fetchTeacherAssessments() {
    teacherAssessments = await getCollection({
      collectionPath: `Users/${$user.id}/Assessments`,
    }).catch((error) => console.log(error))
    teacherAssessmentsTitles = teacherAssessments.map((ev) => ev.title)
  }

  async function fetchStudentAssessments() {
    const promises = $user.assessments.map((assessmentId) =>
      getDocument({
        path: `Users/${$user.teacher}/Assessments`,
        id: assessmentId,
      }),
    )

    studentAssessments = await Promise.all(promises)
    console.log('studentAssessments', studentAssessments)
  }

  async function fetchStudents() {
    $user.students = {}
    const school = await getDocument({
      path: `Schools`,
      id: `${$user.country}$${$user.city}$${$user.school}`,
    }).catch((error) => console.log(error))
    console.log('school', school)
    $user.classrooms.forEach((classroom) => {
      $user.students[classroom] = school.classrooms[classroom]
      selectedStudents[classroom] = []
    })
    console.log('students', $user.students)
  }

  function loadAssessment(assessment) {
    basket = []
    assessment.questions.forEach((q) => {
      addToBasket(q.theme, q.domain, q.subdomain, q.level, q.count)
    })
    displayAssessmentList = false
  }

  async function assign() {
    if (!teacherAssessmentId) {
      console.log('erreur : l evaluation doit etre sauvegardée')
      return
    }

    const assignedStudents = []
    selectedClassrooms.forEach((classroom) => {
      $user.students[classroom].forEach((student) => {
        assignedStudents.push(student.id)
      })
    })

    Object.keys(selectedStudents).forEach((classroom) => {
      selectedStudents[classroom].forEach((student) => {
        if (!assignedStudents.includes(student)) {
          assignedStudents.push(student)
        }
      })
    })

    assignedStudents.forEach(async (student) => {
      const doc = await getDocument({
        path: 'Users',
        id: student,
      }).catch((err) => console.log(err))

      console.log('doc student', doc)

      // if (!doc.assessments[teacherAssessmentId]) {
      //   await saveDocument({
      //     path: 'Users',
      //     document: {
      //       id: student,
      //       [`assessments.${teacherAssessmentId}`]: {
      //         status: 'pending',
      //       },
      //     },
      //   })
      // }
      if (!doc.assessments) doc.assessments = []
      if (!doc.assessments.includes(teacherAssessmentId)) {
        await saveDocument({
          path: 'Users',
          document: {
            id: student,
            assessments: doc.assessments.concat([teacherAssessmentId]),
          },
        })
      }
    })

    console.log('assignedStudents', assignedStudents)
  }

  $: isLoggedIn = $user.id != 'guest'
  $: isTeacher = isLoggedIn && $user.roles.includes('teacher')
  $: isStudent = isLoggedIn && $user.roles.includes('student')
  $: gotAssessments = isStudent && $user.assessments.length
  $: if (gotAssessments) {
    fetchStudentAssessments()
  }
  $: if (isTeacher) classrooms = $user.classrooms
  $: disable = !theme || !domain || !subdomain || !(level >= 0)

  $: if (showBasket && !teacherAssessments) {
    fetchTeacherAssessments()
  }

  $: if (isTeacher && showBasket && !$user.students) {
    fetchStudents()
  }
  $: if (teacherAssessments) {
    teacherAssessmentsTitles = teacherAssessments.map((ev) => ev.title)
  }
  $: {
    if ($user.classrooms && !selectedClassroom) {
      console.log('reset', $user.classrooms)
      selectedClassroom = $user.classrooms[0]
    }
  }
  $: disableSave =
    evalTitle === '' || teacherAssessmentsTitles.includes(evalTitle) || saving
  $: generated = generateExemple(theme, domain, subdomain, level)
</script>

<h4 class="mt-5 pa-3 mb-5 amber white-text">Calcul mental</h4>

{#if gotAssessments && studentAssessments}
  <h5 class="amber-text font-weight-bold">Evaluations à faire</h5>

  <div class="mt-3 grey lighten-4">
    <div class="pa-2 pl-5" style="border-left: 5px solid red">
      {#each studentAssessments as assessment}
        <div class="mt-2 mb-2   d-flex align-center">
          {assessment.title}
          <!-- <Tooltip bottom> -->
          <Button
            on:click="{() => launchTest({ type: 'practice', assessment })}"
            size="x-small"
            class="ml-2 mr-2 amber lighten-2"
          >
            Entraînement
          </Button>
          <!-- <span slot="tip">Ce n'est pas noté !</span> -->
          <!-- </Tooltip> -->

          <!-- <Tooltip bottom> -->
          <Button
            class="ml-2 mr-2 white-text red lighten-1"
            disabled="{disable}"
            fab
            size="x-small"
            on:click="{() => launchTest({ type: 'assessment', assessment })}"
          >
            <Icon path="{mdiRocketLaunchOutline}" />
          </Button>
          <!-- <span slot="tip">Attention, c'est noté !</span>
          </Tooltip> -->
        </div>
      {/each}
    </div>
  </div>
{/if}

{#if showBasket}
  <h5 class="mt-8 amber-text font-weight-bold">Panier</h5>
{:else}
  <h5 class="mt-8 amber-text font-weight-bold">Entrainement libre</h5>
{/if}

<div class="mt-3 mb-3 d-flex" style="{'position:sticky;top:10px;z-index:10'}">
  {#if isTeacher && showBasket}
    <Tooltip bottom>
      <Button
        class="ml-2 mr-2 amber white-text darken-2"
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
        class="{disableSave ? '' : 'amber white-text darken-2'} ml-2 mr-2"
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
      class="ml-2 mr-2 amber darken-2 white-text"
      fab
      size="x-small"
      on:click="{copyLink}"
    >
      <Icon path="{mdiLink}" />
    </Button>

    <Button
      class="ml-2 mr-2 amber darken-2 white-text"
      fab
      size="x-small"
      depressed="{classroom}"
      on:click="{() => {
        classroom = !classroom
      }}"
    >
      <Icon path="{mdiProjectorScreen}" />
    </Button>

    <Button
      class="ml-2 mr-2 amber darken-2 white-text"
      disabled="{disable}"
      fab
      size="x-small"
      on:click="{toggleHelp}"
    >
      <Icon path="{mdiHelp}" />
    </Button>
  {/if}

  {#if isTeacher}
    {#if !showBasket}
      <Button
        class="ml-2 mr-2 amber darken-2 white-text"
        disabled="{disable}"
        fab
        size="x-small"
        on:click="{() => addToBasket(theme, domain, subdomain, level, 1)}"
      >
        <Icon path="{mdiBasketPlus}" />
      </Button>
    {/if}
    {#if basket.length}
      <Badge
        class="red"
        bordered
        value="{basket.reduce((acc, item) => acc + item.count, 0)}"
        offsetX="{16}"
        offsetY="{16}"
      >
        <Button
          disabled="{disable}"
          class="amber white-text darken-2 ml-2 mr-2"
          depressed="{showBasket}"
          fab
          size="x-small"
          on:click="{toggleBasket}"
        >
          <Icon path="{mdiBasket}" />
        </Button>
      </Badge>
    {:else}
      <Button
        disabled="{disable}"
        class="amber white-text darken-2 ml-2 mr-2"
        depressed="{showBasket}"
        fab
        size="x-small"
        on:click="{toggleBasket}"
      >
        <Icon path="{mdiBasket}" />
      </Button>
    {/if}
  {/if}

  <Button
    class="ml-2 mr-2 amber darken-2 white-text"
    disabled="{disable}"
    fab
    size="x-small"
    on:click="{launchTest}"
  >
    <Icon path="{mdiRocketLaunchOutline}" />
  </Button>
</div>

{#if isTeacher && showBasket}
  <TextField filled bind:value="{evalTitle}" rules="{titleRules}"
    >Titre</TextField
  >

  {#if basket.length}
    <List>
      {#each basket as item, i}
        <div class="mt-4 mb-4 d-flex flex-row">
          <Card style="width:80%;max-width:500px">
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

  <h5>Assigner à :</h5>
  <Row class="align-start" noGutters style="height:150px">
    <Col>
      <List>
        {#each classrooms as classroom}
          <Checkbox
            class="mt-2 mb-2"
            bind:group="{selectedClassrooms}"
            value="{classroom}">{classroom}</Checkbox
          >
        {/each}
      </List>
    </Col>
    <Col>
      <Select
        items="{$user.classrooms.map((c) => ({ name: c, value: c }))}"
        bind:value="{selectedClassroom}"
      >
        Classe
      </Select>
      {#if selectedClassroom && $user.students && $user.students[selectedClassroom]}
        <List>
          {#each $user.students[selectedClassroom] as student}
            <Checkbox
              class="mt-2 mb-2"
              bind:group="{selectedStudents[selectedClassroom]}"
              value="{student.id}"
            >
              {student.lastname}
              {student.firstname}
            </Checkbox>
          {/each}
        </List>
      {/if}
    </Col>
  </Row>

  <Button on:click="{assign}">Assigner</Button>
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

<Dialog bind:active="{displayAssessmentList}">
  <div class="d-flex justify-center mt-2 mb-2">
    <List class="elevation-2">
      <h6>Liste des évaluations</h6>

      <Divider />

      {#each teacherAssessments as assessment}
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
