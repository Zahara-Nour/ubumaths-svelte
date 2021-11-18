<script>
  import gidouille from './assets/gidouille'
  import FlashCards from './features/flash-cards/FlashCards.svelte'
  // import EditCards from './features/flash-cards/EditCards.svelte'
  import { Router, Link, Route } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  // import About from './routes/About.svelte'
  import Diaporama from './features/flash-cards/Diaporama.svelte'
  import { MaterialApp } from 'svelte-materialify'
  import NavBar from './components/NavBar.svelte'
  import Mental from './features/calcul-mental/Mental.svelte'
  import MentalTest from './features/calcul-mental/MentalTest.svelte'
  import { menuFontSize, user, handleKeydown} from './app/stores'
  import { Snackbar, Footer, Button } from 'svelte-materialify/src'
  import { mode } from './app/stores'
  import DashBoardTeacher from './features/dashboard/DashBoardTeacher.svelte'
  import DashBoardStudent from './features/dashboard/DashBoardStudent.svelte'
  import { getLogger } from './app/utils'
  import { supabase } from './app/db'
  import { gradeMatchesClass, testGrades } from './app/grade'
  import questions from './features/calcul-mental/questions'

  testGrades()

  export let url = ''

  const { info, trace, fail } = getLogger('App', 'info')
  let theme = 'light'
  let fetchingProgression = false

  async function fetchProgression() {
    fetchingProgression = true
    const { data, error } = await supabase
      .from('progression')
      .select('progression')
      .eq('user_id', $user.id)

    if (error) {
      fail(error)
    } else {
      let progression = {}
      if (data.length === 0) {
        // init progression
        Object.keys(questions).forEach((theme) => {
          progression[theme] = {}
          Object.keys(questions[theme]).forEach((domain) => {
            progression[theme][domain] = {}
            Object.keys(questions[theme][domain]).forEach((subdomain) => {
              progression[theme][domain][subdomain] = 0
            })
          })
        })

        const { data, error } = await supabase
          .from('progression')
          .insert({ user_id: $user.id, progression })

        if (error) {
          fail(error)
        } else {
          info('progression created in db for user', $user.id)
        }
      } else {
        progression = data[0].progression
        info('fetched progression', progression)
      }
      $user.progression = progression
      fetchingProgression = false
    }
    // fetchingProgression = false
  }

  

  function toggleTheme() {
    if (theme === 'light') theme = 'dark'
    else theme = 'light'
  }

  
  
  $: displayWidth = $mode === 'classroom' ? '95%' : '1024px'
  

  $: isLoggedIn = $user.id !== 'guest'
  $: isTeacher = isLoggedIn && $user.roles.includes('teacher')
  $: isStudent = isLoggedIn && $user.roles.includes('student')
  $: if (isStudent && !$user.progression && !fetchingProgression) {
    fetchProgression()
  }

  
</script>

<svelte:head>
  <title>UbuMaths</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="fr"></html>
  <link rel="stylesheet" href="css/reveal/reveal.css" />
  <link rel="stylesheet" href="css/reveal/theme/white.css" />
</svelte:head>


<svelte:window on:keydown={$handleKeydown}/>


<MaterialApp theme="{theme}">
  <Router url="{url}">
    <!-- <button on:click="{toggleTheme}">Toggle Theme</button> -->
    <NavBar />
    <div
      class="main"
      style="margin:auto; max-width:{displayWidth};font-size:{$menuFontSize}"
    >
      <Route path="flash-cards/play" let:location>
        <Diaporama location="{location}" />
      </Route>
      <Route path="flash-cards" let:location>
        <FlashCards location="{location}" />
      </Route>
      <Route path="calcul-mental" let:location>
        <Mental location="{location}" />
      </Route>
      <Route path="mental-test" let:location>
        <MentalTest location="{location}" />
      </Route>
      <Route path="dashboard" let:location>
        {#if isStudent}
          <DashBoardStudent />
        {:else}
          <DashBoardTeacher />
        {/if}
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </div>
    <Footer>
      <div class="d-flex align-center">
        <a href="https://www.lyceevoltaire.org/">
          <img
            alt="logo voltaire"
            src="/images/logo-voltaire.png"
            height="60px"
          />
        </a>
        <div class="flex-grow-1"></div>
        <div class="text-body-2">D. Le Jolly</div>
      </div>
    </Footer>
  </Router>
</MaterialApp>



<style type="text/scss">
  @import 'style/_include-media';

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;

    @include media('<desktop') {
      display: none;
    }
  }

  .main {
    position: relative;
    min-height: calc(100vh - 140px);
  }
</style>
