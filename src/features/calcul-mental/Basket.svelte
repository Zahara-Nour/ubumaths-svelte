<script>
  import { user } from '../../app/stores'
  import { saveDocument, getDocument, supabase } from '../../app/db'
  import { mdiMinus, mdiPlus } from '@mdi/js'
  import {
    Icon,
    List,
    ListItem,
    Card,
    CardTitle,
    CardSubtitle,
    CardText,
    CardActions,
    Button,
    TextField,
    Row,
    Col,
    Checkbox,
    Select,
    Dialog,
    Divider,
    Snackbar,
  } from 'svelte-materialify/src'
  import Question from './Question.svelte'

  export let basket
  export let addToBasket
  export let disableSave
  export let loadAssessments
  export let saveAssessment
  export let modified

  const titleRules = [
    (v) =>
      !teacherAssessmentsTitles.includes(v) ||
      "Titre d'évaluation déjà utilisé",
  ]
  let evalTitle = ''
  let selectedClasses = []
  let selectedClass
  let selectedStudents = {}
  let saving = false
  let teacherAssessmentsTitles = []
  let displayAssessmentList = false
  let teacherAssessmentId
  let saveSuccess = false
  let saveFailure = false
  let loading = false
  let fetchingStudent = false
  let confirmSave
  let activeConfirmSave = false

  $user.classes.forEach((klass) => {
    selectedStudents[klass] = []
  })

  const closeConfirmDialog = () => {
    activeConfirmSave = false
  }

  const closeAndSave = async () => {
    activeConfirmSave = false
    await save(true)
  }

  const addItem = (i) => {
    basket[i].count++
    modified = true
  }

  function removeItem(i) {
    if (basket[i].count > 1) {
      basket[i].count--
    } else {
      basket.splice(i, 1)
      basket = basket
    }
    modified = true
  }

  const lessTime = (i) => {
    if (basket[i].delay < 5) {
      basket[i].delay = 0
    } else {
      basket[i].delay = basket[i].delay - 5
    }
    modified = true
  }

  const moreTime = (i) => {
    basket[i].delay = basket[i].delay + 5
    modified = true
  }

  async function fetchTeacherAssessments() {
    loading = true
    let { data: assessments, error } = await supabase
      .from('assessments')
      .select('*')
    if (error) {
      console.log('error', error)
      $user.teacherAssessments = []
      loading = false
    } else {
      console.log('assessments', assessments)
      $user.teacherAssessments = assessments
      loading = false
    }
  }

  async function assign() {
    if (modified) {
      console.log('erreur : l evaluation doit etre sauvegardée')
      return
    }

    const assignedStudents = []
    selectedClasses.forEach((klass) => {
      $user.students[klass].forEach((student) => {
        assignedStudents.push(student.id)
      })
    })
    console.log('selectedStudentes', selectedStudents)
    Object.keys(selectedStudents).forEach((klass) => {
      selectedStudents[klass].forEach((student_id) => {
        if (!assignedStudents.includes(student_id)) {
          assignedStudents.push(student_id)
        }
      })
    })

    console.log('assigned ', assignedStudents)

    // TODO: il faut vérifier si cette éval a déjà été assignée

    assignedStudents.forEach(async (student) => {
      // get students assesments
      let assessments
      const { data: students_assessments, error_get_assessments } =
        await supabase
          .from('users')
          .select('assessments')
          .eq('id', student)
          .single()

      if (error_get_assessments) {
        console.log('error', error_get_assessments)
      } else {
        assessments = students_assessments.assessments ? students_assessments.assessments : []
        console.log('assessments', assessments)
        if (!assessments.includes(teacherAssessmentId)) {
          assessments.push(teacherAssessmentId)
        }
        const { data, error_assign } = await supabase
          .from('users')
          .upsert([{ id: student, assessments }])

        if (error_assign) {
          console.log('error', error_assign)
        }
      }
    })

    // assignedStudents.forEach(async (student) => {
    //   const doc = await getDocument({
    //     path: 'Users',
    //     id: student,
    //   }).catch((err) => console.log(err))

    //   console.log('doc student', doc)

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

    // if (!doc.assessments) doc.assessments = []
    // if (!doc.assessments.includes(teacherAssessmentId)) {
    //   await saveDocument({
    //     path: 'Users',
    //     document: {
    //       id: student,
    //       assessments: doc.assessments.concat([teacherAssessmentId]),
    //     },
    //   })
    // }
    // })
  }

  loadAssessments = () => {
    displayAssessmentList = true
  }

  saveAssessment = () => {
    if (confirmSave) {
      activeConfirmSave = true
    } else {
      save()
    }
  }

  const save = async function (overwrite = false) {
    const document = {
      questions: basket.map((item) => ({
        count: item.count,
        theme: item.theme,
        domain: item.domain,
        subdomain: item.subdomain,
        level: item.level,
        delay: item.delay,
      })),
      title: evalTitle,
      teacher_id: $user.id,
    }
    saving = true

    let data
    let error
    if (overwrite) {
      ;({ data, error } = await supabase
        .from('assessments')
        .update(document)
        .eq('title', evalTitle)
        .single())
    } else {
      ;({ data, error } = await supabase
        .from('assessments')
        .insert([document])
        .single())
    }

    if (error) {
      console.log('error', error)
      saveFailure = true
    } else {
      teacherAssessmentId = data.id
      if (overwrite) {
        const index = $user.teacherAssessments.findIndex(
          (assessment) => assessment.title === evalTitle,
        )
        $user.teacherAssessments[index] = data
      } else {
        $user.teacherAssessments.push(data)
      }
      $user.teacherAssessments = $user.teacherAssessments
      modified = false
      saveSuccess = true
    }
    saving = false
  }

  function loadAssessment(assessment) {
    basket = []
    assessment.questions.forEach((q) => {
      addToBasket(q.theme, q.domain, q.subdomain, q.level, q.count, q.delay)
    })
    displayAssessmentList = false
    modified = false
  }

  async function fetchStudents() {
    fetchingStudent = true
    const sortedStudents = {}

    const { data: students, error } = await supabase
      .from('users')
      .select('id,firstname,lastname,classes')
      .contains('roles', ['student'])
      .eq('teacher_id', $user.id)

    if (error) {
      console.log('error', error)
    } else if (!students.length) {
      console.log('error : no students found')
    } else {
      console.log('students', students)
      students.forEach((student) => {
        const klass = student.classes[0]
        if (!sortedStudents[klass]) {
          sortedStudents[klass] = []
        }
        sortedStudents[klass].push({
          firstname: student.firstname,
          lastname: student.lastname,
          id: student.id,
        })
      })
    }

    const { data: id_others, error_id_others } = await supabase
      .from('users')
      .select('others')
      .eq('id', $user.id)

      .single()

    if (error_id_others) {
      console.log('error', error_id_others)
    } else {
      console.log('others', id_others.others)
      const { data: others, error_others } = await supabase
        .from('users')
        .select('id, firstname,lastname')
        .in('id', id_others.others)
      if (error_others) {
        console.log('error', error_others)
      } else {
        console.log('others', others)
        sortedStudents['Autres'] = others
      }
    }
    Object.keys(sortedStudents).forEach((klass) => {
      sortedStudents[klass].sort((a, b) => {
        if (a.lastname < b.lastname) return -1
        if (a.lastname > b.lastname) return 1
        if (a.firstname < b.firstname) return -1
        if (a.firstname > b.firstname) return 1
        return 0
      })
    })

    $user.students = sortedStudents
    fetchingStudent = false
    console.log('students', $user.students)
  }

  $: {
    if ($user.classes && !selectedClass) {
      console.log('reset', $user.classes)
      selectedClass = $user.classes[0]
    }
  }

  $: if (!$user.teacherAssessments && !loading) {
    fetchTeacherAssessments()
  }

  $: if ($user.teacherAssessments) {
    teacherAssessmentsTitles = $user.teacherAssessments.map((ev) => ev.title)
    console.log('titles', teacherAssessmentsTitles)
  }

  $: if (!$user.students && !fetchingStudent) {
    fetchStudents()
  }
  $: disableSave = evalTitle === '' || saving

  $: confirmSave = teacherAssessmentsTitles.includes(evalTitle)

  $: console.log('displayAssessmentList dans Basket', displayAssessmentList)
</script>

<TextField filled bind:value="{evalTitle}" rules="{titleRules}">Titre</TextField
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
        <div class="ma-2 d-flex flex-column">
          <div class="d-flex flex-row justify-center">
            <div class="mt-2">
              répétition: {basket[i].count}
            </div>
          </div>
          <div class="ml-2 d-flex flex-row justify-center">
            <Button
              class="ml-1 mr-1"
              fab
              size="x-small"
              on:click="{() => removeItem(i)}"
            >
              <Icon path="{mdiMinus}" />
            </Button>

            <Button
              class="ml-1 mr-1"
              fab
              size="x-small"
              on:click="{() => addItem(i)}"
            >
              <Icon path="{mdiPlus}" />
            </Button>
          </div>

          <div class="d-flex flex-row justify-center">
            <div class="mt-2">
              temps: {basket[i].delay} s
            </div>
          </div>
          <div class="ml-2 d-flex flex-row justify-center">
            <Button
              class="ml-1 mr-1"
              fab
              size="x-small"
              on:click="{() => lessTime(i)}"
            >
              <Icon path="{mdiMinus}" />
            </Button>

            <Button
              class="ml-1 mr-1"
              fab
              size="x-small"
              on:click="{() => moreTime(i)}"
            >
              <Icon path="{mdiPlus}" />
            </Button>
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
      {#each $user.classes as klass}
        <Checkbox
          class="mt-2 mb-2"
          bind:group="{selectedClasses}"
          value="{klass}"
        >
          {klass}
        </Checkbox>
      {/each}
    </List>
  </Col>
  <Col>
    <Select
      items="{$user.classes.map((c) => ({ name: c, value: c }))}"
      bind:value="{selectedClass}"
    >
      Classe
    </Select>
    {#if selectedClass && $user.students && $user.students[selectedClass]}
      <List>
        {#each $user.students[selectedClass] as student}
          <Checkbox
            class="mt-2 mb-2"
            bind:group="{selectedStudents[selectedClass]}"
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

<Dialog bind:active="{displayAssessmentList}">
  <div class="d-flex justify-center mt-2 mb-2">
    <List class="elevation-2">
      <h6>Liste des évaluations</h6>

      <Divider />

      {#each $user.teacherAssessments as assessment}
        <ListItem on:click="{() => loadAssessment(assessment)}">
          {assessment.title}
        </ListItem>
      {/each}
    </List>
  </div>
</Dialog>

<Dialog persistent bind:active="{activeConfirmSave}">
  <Card>
    <CardTitle>Ecraser ?</CardTitle>
    <CardText>Vous allez écraser l'évaluation</CardText>
    <CardActions>
      <Button on:click="{closeConfirmDialog}" text>Non</Button>
      <Button on:click="{closeAndSave}" text class="red-text">Oui</Button>
    </CardActions>
  </Card>
</Dialog>

<Snackbar
  class="justify-space-between red white-text"
  bind:active="{saveFailure}"
  text
  right
  top
  timeout="{3000}"
>
  L'enregistrement a échoué
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
