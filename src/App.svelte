<script>
  import gidouille from './assets/gidouille'
  // import FlashCards from './features/flash-cards/FlashCards.svelte'
  // import EditCards from './features/flash-cards/EditCards.svelte'
  import { Router, Link, Route } from 'svelte-routing'
  import Home from './routes/Home.svelte'
  // import About from './routes/About.svelte'
  // import Diaporama from './features/flash-cards/Diaporama.svelte'
  import { MaterialApp } from 'svelte-materialify'
  import NavBar from './components/NavBar.svelte'
  import Mental from './features/calcul-mental/Mental.svelte'
import MentalTest from './features/calcul-mental/MentalTest.svelte';

  export let url = ''

  let theme = 'light'

  function toggleTheme() {
    if (theme === 'light') theme = 'dark'
    else theme = 'light'
  }
</script>

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
    </Route>
    <Route path="flash-cards/play" let:location>
      <Diaporama location="{location}" />
    </Route>
    <Route path="flash-cards" let:location>
      <FlashCards location="{location}" />
    </Route> -->
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
  }
</style>
