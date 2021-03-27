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
  import { mdiMenu } from '@mdi/js'

  let links = [
    {
      name: 'Calcul mental',
      url: 'calcul-mental',
    },
    {
      name: 'Flash cards',
      url: 'flash-cards',
    },
  ]

  let miniWindow = false
  let active = false

  onMount(setMiniWindow)

  function setMiniWindow() {
    miniWindow = window.innerWidth < 720
  }

  const toggleDrawer = () => {
    active = !active
  }

  function goTo(url) {
    navigate(url)
    active= false
  }
</script>

<svelte:window on:resize="{setMiniWindow}" />
<!-- Navbars should not use list -->
<!--  https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/ -->
<nav role="navigation">
  <AppBar dense flat>
    <div slot="icon">
      <Button on:click={()=>goTo('/')} depressed>
        <Gidouille />
      </Button>
    </div>
    <span class="title" slot="title">UbuMaths</span>
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
    <AuthButton/>
    {#if miniWindow}
      <Button class="mr-2" on:click="{toggleDrawer}" size="small" fab depressed>
        <Icon path="{mdiMenu}" />
      </Button>
    {/if}
  </AppBar>
  <NavigationDrawer index={10} style="position: absolute" active="{active && miniWindow}">
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
</style>
