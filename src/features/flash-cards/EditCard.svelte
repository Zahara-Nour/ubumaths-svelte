<script>
  import Card from '@smui/card'
  import Textfield from '@smui/textfield'
  import Filter from '../../components/Filter.svelte'
  import Fab, { Icon } from '@smui/fab'
  import emptyCard from './emptyCard'
  import { saveDocument } from '../../app/db'
  import { collections } from '../../app/stores'
  import { navigate } from 'svelte-routing'
  import { updateCardsList } from '../../app/stores'
  import { lexicoSort } from '../../app/utils'
  import Dropzone from '../../components/Dropzone.svelte'

  export let card
  export let edited

  const addedfile = (file) => console.log(file)
  const drop = (event) => console.log(event.target)
  const init = () => console.log('dropzone init ! 😍')
  let level = '1'
  let title = ''
  let enounce = ''
  let answer = ''
  let explanation = ''
  let warning = ''
  let subject
  let domain
  let theme
  let grade
  let saving = false
  let id
  let variables = {}
  let imageAnswer
  let image

  async function save() {
    saving = true

    const promise = saveDocument({
      path: 'FlashCards',
      document: edited,
    })
      .then((document) => {
        saving = false

        // update store
        collections.update((store) => {
          if (!store.FlashCards[subject][domain]) {
            store.FlashCards[subject][domain] = {}
          }
          if (!store.FlashCards[subject][domain][theme]) {
            store.FlashCards[subject][domain][theme] = {}
          }
          if (!store.FlashCards[subject][domain][theme].collection) {
            store.FlashCards[subject][domain][theme].collection = []
          }

          let collection = store.FlashCards[subject][domain][theme].collection
          let index = collection.findIndex((doc) => doc.id === document.id)
          if (index >= 0) {
            collection[index] = document
          } else {
            // this is a new card
            collection.push(document)
          }

          // remove the former one
          if (card.domain !== domain || card.theme !== theme) {
            collection =
              store.FlashCards[subject][card.domain][card.theme].collection
            index = collection.findIndex((doc) => doc.id === document.id)
            if (index >= 0) {
              collection.splice(index, 1)
            }
          }

          return store
        })

        if (
          card.domain !== domain ||
          card.theme !== theme ||
          card.name !== document.name
        ) {
          if (card.name !== document.name) {
            updateCardsList.set(true)
          }
          const url = `/flash-cards/edit?subject=${subject}&domain=${domain}&theme=${theme}&title=${title}`
          if (decodeURI(encodeURI(url)) !== url) warn('URI malformed', url)
          navigate(url)
        }
      })
      .catch((err) => {
        console.log('error while saving card', err.message)
        saving = false
      })
    return promise
  }

  const getIdVariables = () =>
    Object.getOwnPropertyNames(variables)
      .map((name) => name.substring(1))
      .map((name) => parseInt(name, 10))

  const getNextId = () => {
    for (let i = 1; i < 10; i++) {
      if (!getIdVariables().includes(i)) return i
    }
    throw new Error('too much variables')
  }

  const addVariable = () => {
    const nextId = getNextId()
    variables[`&${nextId}`] = ''
    variables = variables
  }

  const deleteVariable = (name) => () => {
    const { [name]: tmp, ...rest } = variables
    variables = { ...rest }
  }

  function duplicate() {
    // const { id, ...rest } = card.id ? card : { ...card, id: '' }
    // const { id, ...rest } = card.id ? card : { ...card, id: '' }

    updateCard({
      ...edited,
      id: '',
      name: edited.name + ' (copie)',
    })
  }

  function newCard() {
    updateCard({
      ...emptyCard,
      subject,
      domain,
      theme,
      grade,
      level,
    })
  }

  function updateCard(card) {
    if (card) {
      title = card.name || ''
      enounce = card.enounce || ''
      answer = card.answer || ''
      explanation = card.explanation || ''
      warning = card.warning || ''
      subject = card.subject
      domain = card.domain
      theme = card.theme
      grade = card.grade
      level = card.level
      id = card.id
      variables = { ...card.variables }
      image = card.image || ''
      imageAnswer = card.imageAnswer || ''
    }
  }

  $: updateCard(card)

  $: edited = {
    ...edited,
    level,
    name: title,
    enounce,
    answer,
    explanation,
    warning,
    subject,
    domain,
    theme,
    grade,
    image,
    imageAnswer,
    variables,
    id,
  }
</script>

<Card padded>
  <!-- <div class="marge"> -->
  <Textfield
    fullwidth
    textarea
    bind:value="{title}"
    label="Titre"
    input$aria-controls="helper-text-textarea"
    input$aria-describedby="helper-text-textarea"
  />
  <!-- </div> -->
  <div class="marge">
    <Textfield
      fullwidth
      textarea
      bind:value="{enounce}"
      label="Enoncé"
      input$aria-controls="helper-text-textarea"
      input$aria-describedby="helper-text-textarea"
    />
  </div>
  <div class="marge">
    <Textfield
      fullwidth
      textarea
      bind:value="{answer}"
      label="Réponse"
      input$aria-controls="helper-text-textarea"
      input$aria-describedby="helper-text-textarea"
    />
  </div>
  <div class="marge">
    <Textfield
      fullwidth
      textarea
      bind:value="{explanation}"
      label="Explication"
      input$aria-controls="helper-text-textarea"
      input$aria-describedby="helper-text-textarea"
    />
  </div>
  <div class="marge">
    <Textfield
      fullwidth
      textarea
      bind:value="{warning}"
      label="Avertissement"
      input$aria-controls="helper-text-textarea"
      input$aria-describedby="helper-text-textarea"
    />
  </div>

  {#if subject}
    <Filter
      label="Domaine"
      collectionPath="Domains"
      filters="{[{ subject }]}"
      bind:value="{domain}"
    />
  {/if}

  {#if domain}
    <Filter
      label="Thème"
      collectionPath="Themes"
      bind:value="{theme}"
      filters="{[{ subject }, { domain }]}"
    />
  {/if}

  <Filter label="Classe" collectionPath="Grades" bind:value="{grade}" />

  <Textfield bind:value="{level}" label="Niveau" />

  Image pour la question :
  {image}
  <Dropzone
    dropzoneEvents="{{ addedfile, drop, init }}"
    options="{{ clickable: true, acceptedFiles: 'image/*', init }}"
  >
    <p>Drop files here to upload</p>
  </Dropzone>

  <!-- <form action="/file-upload" class="dropzone" id="my-awesome-dropzone"></form> -->
  
  

  Variables


  <Fab mini on:click="{addVariable}" disabled="{saving}">
    <Icon class="material-icons">add</Icon>
  </Fab>
  <div class="variables">
    {#each Object.getOwnPropertyNames(variables).sort(lexicoSort) as name}
      <div class="variable">
        <Textfield
          fullwidth
          bind:value="{variables[name]}"
          label="{name}"
          input$aria-controls="helper-text-textarea"
          input$aria-describedby="helper-text-textarea"
        />
        <Fab mini on:click="{deleteVariable(name)}" disabled="{saving}">
          <Icon class="material-icons">delete</Icon>
        </Fab>
      </div>
    {/each}
  </div>

  <div class="buttons">
    <Fab mini on:click="{save}" disabled="{saving}">
      <Icon class="material-icons">save_alt</Icon>
    </Fab>

    <Fab mini on:click="{duplicate}" disabled="{saving}">
      <Icon class="material-icons">content_copy</Icon>
    </Fab>

    <Fab disabled="{saving}" mini on:click="{newCard}">
      <Icon class="material-icons">add</Icon>
    </Fab>
  </div>
</Card>

<style>
  .marge {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
  }
  .buttons {
    margin-top: 15px;
    margin-bottom: 15px;

    display: flex;
    justify-content: space-around;
  }

  .variable {
    display: flex;
  }

  .variables {
    display: flex;
    flex-direction: column;
  }
</style>
