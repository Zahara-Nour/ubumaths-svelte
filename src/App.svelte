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
  import Footer from 'svelte-materialify/src/components/Footer'

  export let url = ''

  let theme = 'light'

  function toggleTheme() {
    if (theme === 'light') theme = 'dark'
    else theme = 'light'
  }
</script>

<svelte:head>
  <title>UbuMaths</title>
  <meta name="robots" content="noindex nofollow" />
  <html lang="fr"></html>
  <link rel="stylesheet" href="css/reveal/reveal.css">
    <link rel="stylesheet" href="css/reveal/theme/white.css">
</svelte:head>

<MaterialApp theme="{theme}">
  <Router url="{url}">
    <!-- <button on:click="{toggleTheme}">Toggle Theme</button> -->

    <NavBar />
    <div class="main">
      <!-- <Route path="about/:id/:id2" let:params> -->
      <!-- <About {...params} /> -->
      <!-- </Route> -->
      <!-- <Route path="flash-cards/edit" let:location>
     
      <EditCards location="{location}" />
    </Route>-->
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
      <div class="d-flex align-center" style="width:100%">
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
