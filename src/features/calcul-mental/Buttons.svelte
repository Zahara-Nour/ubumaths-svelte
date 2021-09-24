<script>
  import { Icon, Button, Tooltip, Badge } from 'svelte-materialify/src'
  import {
    mdiProjectorScreen,
    mdiRocketLaunchOutline,
    mdiHelp,
    mdiBasketPlus,
    mdiBasket,
    mdiCloudDownloadOutline,
    mdiCloudUploadOutline,
    mdiLink,
  } from '@mdi/js'
  import { user } from '../../app/stores'
  export let isTeacher
  export let showBasket
  export let classroom
  export let basket
  export let launchTest
  export let addToBasket
  export let theme
  export let domain
  export let subdomain
  export let level
  export let disable
  export let evalTitle
  export let teacherAssessmentsTitles


  let disableSave = true
  let saving = false

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

  const toggleHelp = () => (displayDescription = !displayDescription)
  const toggleBasket = () => (showBasket = !showBasket)

  const load = () => (displayAssessmentList = true)

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


  $: disableSave =
    evalTitle === '' || teacherAssessmentsTitles.includes(evalTitle) || saving

</script>

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
