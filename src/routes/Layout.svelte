<script>
  import NavBar from '../components/NavBar.svelte'
  import Drawer, { Content, Scrim, AppContent } from '@smui/drawer'
  import List, { Item, Text } from '@smui/list'
  import { onMount } from 'svelte'

  let miniWindow = false
  let drawerOpen = false
  let mainContent

  const links = [
    {
      label: 'lien1',
      href: '',
    },
    {
      label: 'lien2',
      href: 'toto',
    },
  ]

  function setMiniWindow() {
    miniWindow = window.innerWidth < 720
  }

  const toggleDrawer = () => {
    console.log('toggleDrawer')
    drawerOpen = !drawerOpen
  }

  onMount(setMiniWindow)
</script>

<svelte:window on:resize="{setMiniWindow}" />
<NavBar {toggleDrawer} {links} />

<div class="drawer-container">
  <Drawer
    variant="{miniWindow ? 'modal' : null}"
    bind:open="{drawerOpen}"
    class="demo-drawer mdc-theme--secondary-bg {miniWindow ? 'demo-drawer-adjust' : ''}"
  >
    <Content>
      <List>
        {#each links as link (link.label)}
          <Item
            bind:this="{link.component}"
            href="{link.href}"
            on:click="{() => (drawerOpen = false)}"
            title="{link.lavel}"
          >
            <Text class="mdc-theme--on-secondary">{link.label}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Drawer>

  {#if miniWindow}
  <Scrim />
{/if}

  <AppContent class="demo-app-content">
    <main class="demo-main-content" bind:this="{mainContent}">
      <slot />
    </main>
  </AppContent>
</div>

<style type="text/scss">
// We need the theming variables for the following styles.
//
// This adds classes like "mdc-theme--primary-bg".


  .demo-app-content {
    flex: auto;
    position: relative;
    width: 0;
    flex-grow: 1;
  }

  .demo-main-content {
    overflow: auto;
    display: flex;
  }

  .drawer-container {
    flex-grow: 1;
    height: 0;
    display: flex;
  }

  .demo-drawer {
    overflow: auto;
    height: 100%;
  }

  @import '@material/top-app-bar/variables';
  .demo-drawer.demo-drawer-adjust {
    padding-bottom: $mdc-top-app-bar-row-height;
  }
</style>
