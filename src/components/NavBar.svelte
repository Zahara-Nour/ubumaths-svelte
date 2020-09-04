<script>
  import Gidouille from './Gidouille.svelte'
  import IconButton from '@smui/icon-button'
  import { onMount } from 'svelte'

  export let links
  export let toggleDrawer

  //   let mediaListener
  let miniWindow = false

  //   const mediaQueryHandler = (e) => {
  //       if (!e.matches) {
  //         showMobileMenu = false
  //       }
  //     //
  //   }

  onMount(() => {
      setMiniWindow()
    // mediaListener = window.matchMedia('(max-width: 767px)')
    // mediaQueryHandler(mediaListener)
    // mediaListener.addEventListener('change', mediaQueryHandler)
  })

  function setMiniWindow() {
    miniWindow = window.innerWidth < 720
  }
</script>

<svelte:window on:resize="{setMiniWindow}" />
<!-- Navbars should not use list -->
<!--  https://css-tricks.com/navigation-in-lists-to-be-or-not-to-be/ -->
<nav role="navigation">

  <span class="brand">
    <Gidouille />
  </span>
  {#if !miniWindow}
    <div class="links">
      {#each links as link}
        <a class="link" href="{link.href}">{link.label}</a>
      {/each}
    </div>
  {/if}
  <span class="grow"></span>
  {#if miniWindow}
    <span class="burger">
      <IconButton class="material-icons" on:click="{toggleDrawer}">
        menu
      </IconButton>
    </span>
  {/if}

</nav>

<style lang="scss">
  .brand {
    margin-left: 10px;
    margin-right: 10px;
  }

  .grow {
    flex-grow: 1;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link {
    margin-left: 10px;
    margin-right: 10px;
  }

  .links {
    display: flex;
    align-items: center;
  }

  .burger {
    margin-left: 10px;
    margin-right: 10px;
  }

  //   @media only screen and (max-width: 767px) {
  //     .links {
  //         display:none
  //     }

  //     .burger {
  //         display:unset
  //     }
  //   }
</style>
