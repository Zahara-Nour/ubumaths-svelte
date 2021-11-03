<script>
  import { Icon, Button, Tooltip, Badge } from 'svelte-materialify/src'
  import { user } from '../../app/stores'
  import {
    mdiProjectorScreen,
    mdiRocketLaunchOutline,
    mdiHelp,
    mdiBasketPlus,
    mdiBasket,
    mdiCloudDownloadOutline,
    mdiCloudUploadOutline,
    mdiLink,
    mdiTrashCanOutline,
  } from '@mdi/js'

  export let showBasket
  export let basket
  export let loadAssessments
  export let saveAssessment
  export let copyLink
  export let fillBasket
  export let launchTest
  export let disableSave
  export let classroom
  export let disable
  export let displayDescription
  export let flushBasket

  const toggleHelp = () => (displayDescription = !displayDescription)
  const toggleBasket = () => (showBasket = !showBasket)

  $: isLoggedIn = $user.id != 'guest'
  $: isTeacher = isLoggedIn && $user.roles.includes('teacher')
  $: isStudent = isLoggedIn && $user.roles.includes('student')
</script>

<div class="mt-3 mb-3 d-flex" style="{'position:sticky;top:10px;z-index:10'}">
  {#if isTeacher && showBasket}
    <Tooltip bottom>
      <Button
        class="ml-2 mr-2 amber white-text darken-2"
        fab
        size="x-small"
        on:click="{loadAssessments}"
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
        on:click="{saveAssessment}"
      >
        <Icon path="{mdiCloudUploadOutline}" />
      </Button>
      <span slot="tip">Enregistrer</span>
    </Tooltip>
  {/if}

  <div class="flex-grow-1"></div>

  {#if !showBasket}
    {#if isTeacher}
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
    {/if}

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
        on:click="{fillBasket}"
      >
        <Icon path="{mdiBasketPlus}" />
      </Button>
    {/if}
    {#if showBasket}
      <Button
        disabled="{!basket.length}"
        class="amber white-text darken-2 ml-2 mr-2"
        fab
        size="x-small"
        on:click="{flushBasket}"
      >
        <Icon path="{mdiTrashCanOutline}" />
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
    on:click="{() => launchTest()}"
  >
    <Icon path="{mdiRocketLaunchOutline}" />
  </Button>
</div>
