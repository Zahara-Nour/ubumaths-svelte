<script>
  import Gidouille from './Gidouille.svelte'
  import AuthButton from './AuthButton.svelte'
  import { onMount } from 'svelte'
  import {
    AppBar,
    Button,
    Icon,
    Menu,
    List,
    ListItem,
    ListItemGroup,
    NavigationDrawer,
    Overlay,
  } from 'svelte-materialify/src'
  import { navigate, Link } from 'svelte-routing'
  import {
    mdiFormatFontSizeDecrease,
    mdiFormatFontSizeIncrease,
    mdiMenu,
  } from '@mdi/js'
  import { fontSize, user } from '../app/stores'
import { waiting } from '../features/calcul-mental/stores';

  let miniWindow = false
  let active = false
  let links = [
    {
      name: 'Calcul mental',
      url: 'calcul-mental',
    },
    // {
    //   name: 'Flash cards',
    //   url: 'flash-cards',
    // },
  ]

  const setMiniWindow = () => (miniWindow = window.innerWidth < 720)
  const toggleDrawer = () => (active = !active)
  const increaseFontSize = () => fontSize.update((size) => size + 1)
  const decreaseFontSize = () => fontSize.update((size) => size - 1)

  function goTo(url) {
    navigate(url)
    active = false
  }

  onMount(setMiniWindow)

  $: isLoggedIn = $user.id !== 'guest'
</script>

<svelte:window on:resize="{setMiniWindow}" />

<!-- Navbars should not use list -->
<!--  https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/ -->
<nav role="navigation">
  <AppBar dense flat>
    <div slot="icon">
      <Button class='gidouille' on:click="{() => goTo('/')}" depressed>
        <Gidouille spinning={$waiting.length}/>
      </Button>
    </div>

    <span class="title" slot="title">{miniWindow ? '' : 'UbuMaths'}</span>

    {#if !miniWindow}
      <div class="links">
        <!-- <Link to="/">Home</Link> -->
        <!-- <Link to="about">About</Link> -->
        {#each links as link}
          <Link to="{link.url}">{link.name}</Link>
        {/each}
      </div>
    {/if}

    <div style="flex-grow:1"></div>

    <Button
      class="mr-1"
      on:click="{decreaseFontSize}"
      size="x-small"
      fab
      depressed
    >
      <Icon size="{20}" path="{mdiFormatFontSizeDecrease}" />
    </Button>

    <Button
      class="mr-2"
      on:click="{increaseFontSize}"
      size="x-small"
      fab
      depressed
    >
      <Icon size="{24}" path="{mdiFormatFontSizeIncrease}" />
    </Button>

    <AuthButton />

    {#if miniWindow}
      <Button class="mr-2" on:click="{toggleDrawer}" size="small" fab depressed>
        <Icon path="{mdiMenu}" />
      </Button>
    {/if}
  </AppBar>

  <NavigationDrawer
    index="{10}"
    style="position: absolute"
    active="{active && miniWindow}"
  >
    <List nav dense>
      <ListItemGroup>
        {#each links as link}
          <ListItem on:click="{() => goTo(link.url)}">
            {link.name}
          </ListItem>
        {/each}
      </ListItemGroup>
    </List>
  </NavigationDrawer>

  <Overlay
    active="{active && miniWindow}"
    absolute
    on:click="{toggleDrawer}"
    index="{2}"
  />
</nav>

<!--  https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/ -->
<style lang="scss">
  .title {
    margin-left: 10px;
    margin-right: 10px;
  }

  .brand {
    margin-left: 10px;
    margin-right: 10px;
  }

  .grow {
    flex-grow: 1;
  }

  // nav {
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  // }

  .link {
    margin-left: 10px;
    margin-right: 10px;
  }

  .links {
    // display: flex;
    // align-items: center;
  }

  .burger {
    margin-left: 10px;
    margin-right: 10px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .gidouille {
    animation: infinite 2s linear spin;
  }

</style>
