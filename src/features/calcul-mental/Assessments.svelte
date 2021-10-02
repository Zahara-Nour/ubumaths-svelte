<script>
  import { user } from '../../app/stores'
  import { mdiRocketLaunchOutline } from '@mdi/js'
  import { Button, Icon } from 'svelte-materialify/src'
  import { supabase } from '../../app/db'

  export let launchTest
  export let disable
  let assessments

  async function fetchAssessments() {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .in('id', $user.assessments)

    if (error) {
      console.log('error', error)
    } else {
      assessments = data
      console.log('assessments', assessments)
    }
  }

  $: isLoggedIn = $user.id != 'guest'
  $: isStudent = isLoggedIn && $user.roles.includes('student')
  $: if (isStudent && $user.assessments) {
    fetchAssessments()
  }
</script>

{#if assessments}
  <h5 class="amber-text font-weight-bold">Evaluations à faire</h5>

  <div class="mt-3 grey lighten-4">
    <div class="pa-2 pl-5" style="border-left: 5px solid red">
      {#each assessments as assessment}
        <div class="mt-2 mb-2   d-flex align-center">
          {assessment.title}
          <!-- <Tooltip bottom> -->
          <Button
            on:click="{() => launchTest({ ...assessment, type: 'practice' })}"
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
            on:click="{() => launchTest({ ...assessment, type: 'assessment' })}"
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
