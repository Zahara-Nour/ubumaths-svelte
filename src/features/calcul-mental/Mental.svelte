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
  } from 'svelte-materialify/src'

  import {
    mdiRocketLaunchOutline,
    mdiHelp,
    mdiBasketPlus,
    mdiBasket,
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
  import { calculMentalAssessment } from './stores'
  import { getCollection } from '../../app/collections'
  import { saveDocument, getDocument } from '../../app/db'
  import queryString from 'query-string'
  import Exemple from './Exemple.svelte'

  export let location

  const themes = Object.keys(questions)
  let queryParams
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

  const titleRules = [
    (v) =>
      !teacherAssessmentsTitles.includes(v) ||
      "Titre d'évaluation déjà utilisé",
  ]

  for (let i = 0; i < themes.length; i++) {
    levelsIdxs[i] = 0
    subdomainsIdxs[i] = 0
    domainIdxs[i] = [0]
  }

  domain = Object.keys(questions[theme])[0]
  subdomain = Object.keys(questions[theme][domain])[0]
  level = 1

  function onChangeDomain(e) {
    const idx = e.detail.index
    domainIdxs[themeIdx] = [idx]
    domain = Object.keys(questions[theme])[idx]
    const subdomains = Object.keys(questions[theme][domain])
    subdomain = subdomains[0]
    subdomainsIdxs[themeIdx] = 0
    level = 1
    levelsIdxs[themeIdx] = 0
  }

  function onChangeLevel(d, d_i, t, t_i, l) {
    subdomain = t
    subdomainsIdxs[themeIdx] = t_i
    level = l + 1
    levelsIdxs[themeIdx] = l
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

  const toggleBasket = () => (showBasket = !showBasket)
  const addItem = (i) => basket[i].count++

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

  function passAssessment(assessment) {
    navigate()
  }

  $: {
    queryParams = queryString.parse(location.search)
    if (queryParams.theme) theme = queryParams.theme
    if (queryParams.domain) domain = queryParams.domain
    if (queryParams.subdomain) subdomain = queryParams.subdomain
    if (queryParams.level) level = queryParams.level
  }

  $: if (themeIdx >= 0) {
    theme = themes[themeIdx]
    domain = Object.keys(questions[theme])[domainIdxs[themeIdx]]
    subdomain = Object.keys(questions[theme][domain])[subdomainsIdxs[themeIdx]]
    level = levelsIdxs[themeIdx] + 1
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

<div class="mt-3 mb-3 d-flex">
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
              <span
                slot="header"
                class="text-uppercase red-text"
                style="font-size:{$fontSize}px"
              >
                {d}
              </span>
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
