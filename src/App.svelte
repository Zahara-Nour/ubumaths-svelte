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
  import { fontSize, user } from './app/stores'
  import { Snackbar, Footer, Button } from 'svelte-materialify/src'

  export let url = ''

  let theme = 'light'

  function toggleTheme() {
    if (theme === 'light') theme = 'dark'
    else theme = 'light'
  }

  let assessmentsNotification = false
  function activateAssessmentsNotification() {
    assessmentsNotification = true
  }

  $: {
    if (
      $user.roles &&
      $user.roles.includes('student') &&
      $user.assessments.length
    ) {
      console.log('user', $user)
      activateAssessmentsNotification()
    }
  }
</script>

<svelte:head>
  <title>UbuMaths</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="fr"></html>
  <link rel="stylesheet" href="css/reveal/reveal.css" />
  <link rel="stylesheet" href="css/reveal/theme/white.css" />
</svelte:head>

<MaterialApp theme="{theme}">
  <Router url="{url}">
    <!-- <button on:click="{toggleTheme}">Toggle Theme</button> -->

    <NavBar />
    <div
      class="main"
      style="margin:auto; max-width:1024px;font-size:{$fontSize}"
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
        <Route path="/">
          <Home />
        </Route>
      
      
    </div>
    <Footer>
      <div class="d-flex align-center" >
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

<Snackbar
  class="justify-space-between amber lighten-2"
  bind:active="{assessmentsNotification}"
  text
  right
  top
  timeout="{6000}"
>
  Tu as des évaluations à faire !
  <Button
    text
    on:click="{() => {
      assessmentsNotification = false
    }}"
  >
    Ok
  </Button>
</Snackbar>

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
