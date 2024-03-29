<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import { user } from '../app/stores'
  import { onMount, onDestroy } from 'svelte'
  import { Button, Icon } from 'svelte-materialify/src'
  import { mdiLogin, mdiLogout } from '@mdi/js'
  import { getCollection } from '../app/collections'
  import { db, supabase } from '../app/db'
  import { navigate } from 'svelte-routing'
  import { getLogger } from '../app/utils'

  // Keep track of script status ("idle", "loading", "ready", "error")
  let { info, fail } = getLogger('Auth', 'info')
  let status = 'idle'
  let connecting = false
  $: loaded = status === 'ready'
  $: if (loaded) initAuth()

  function loadScript(src) {
    // console.log('loading script')
    // Fetch existing script element by src
    let script = document.querySelector(`script[src="${src}"]`)

    if (!script) {
      // Create script
      script = document.createElement('script')
      script.src = src
      script.async = true
      script.setAttribute('data-status', 'loading')
      status = 'loading'
      // Add script to document body
      document.body.appendChild(script)

      // Store status in attribute on script
      const setAttributeFromEvent = (event) => {
        // console.log('event', event.type)
        script.setAttribute(
          'data-status',
          event.type === 'load' ? 'ready' : 'error',
        )
      }

      script.addEventListener('load', setAttributeFromEvent)
      script.addEventListener('error', setAttributeFromEvent)
    } else {
      // Grab existing script status from attribute and set to state.
      status = script.getAttribute('data-status')
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance.
    const setStateFromEvent = (event) => {
      status = event.type === 'load' ? 'ready' : 'error'
    }

    // Add event listeners
    script.addEventListener('load', setStateFromEvent)
    script.addEventListener('error', setStateFromEvent)

    // Remove event listeners on cleanup
    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent)
        script.removeEventListener('error', setStateFromEvent)
      }
    }
  }

  let auth2
  const ClientId =
    '702572178697-3pdjj0caro5u0ttpft17ppc0fnlmol1p.apps.googleusercontent.com'
  let isLoggedIn
  const unsubscribeUser = user.subscribe((user) => {
    isLoggedIn = user.id !== 'guest'
    // console.log('user updated', user)
  })
  const removeScriptListeners = loadScript('https://apis.google.com/js/api.js')

  onDestroy(() => {
    removeScriptListeners()
    unsubscribeUser()
  })

  const loginSuccess = async (googleUser) => {
    // console.log('Google Auth Response', googleUser)
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const profile = googleUser.getBasicProfile()
    const authResponse = googleUser.getAuthResponse()

    if (
      !profile.getEmail().includes('@voltairedoha.com') &&
      profile.getEmail() !== 'zahara.alnour@gmail.com'
    ) {
      fail("email doesn't belon to domain voltairedoha.com")
      return
    }

    // Now sign-in in firebase
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe()
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            authResponse.id_token,
          )
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .catch(function (error) {
              // Handle Errors here.
              // var errorCode = error.code
              // var errorMessage = error.message
              // // The email of the user's account used.
              // var email = error.email
              // // The firebase.auth.AuthCredential type that was used.
              // var credential = error.credential
              // ...
              fail('error while authenticating in Firebase', error)
            })
        } else {
          // console.log('User already signed-in Firebase.')
        }
      })

    const googleProfile = {
      googleId: profile.getId(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      name: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      tokenObj: authResponse,
      tokenId: authResponse.id_token,
      accessToken: authResponse.access_token,
    }


    let { data, error } = await supabase
      .from('users')
      .select(`*, schools(city,country, name)`)
      .eq('email', googleProfile.email)
      .single()

    if (error) {
      fail(error)
    } else if (!data) {
      fail(`no user ${googleProfile.email} in db`)
    } else {
      data.classes.push('Autres')
      user.set({ ...googleProfile, ...data, ...data.schools })
      info(`user ${$user.email} successfully logged in`, $user)
    }

    connecting = false
  }

  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true
        }
      }
    }
    return false
  }

  function initAuth() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: ClientId,
        })
        .then((auth) => {
          auth2 = auth
          if (auth2.isSignedIn.get()) {
            loginSuccess(auth2.currentUser.get())
          }
        })
    })
  }

  function logoutSuccess() {
    const id = $user.id
    user.set({ id: 'guest' })
    connecting = false
    info(`user ${$user.id} successfuly logged out`, $user)
    navigate('/')
   
  }

  function loginFailure(err) {
    fail('error while login', err)
    connecting = false
  }

  function logoutFailure(err) {
    fail('error while logout', err)
    connecting = false
  }

  function onSignIn() {
    connecting = true
    const options = {
      prompt: '',
    }
    auth2.signIn(options).then(loginSuccess).catch(loginFailure)
  }

  function onSignOut() {
    connecting = true
    auth2.signOut().then(logoutSuccess).catch(logoutFailure)
    firebase.auth().signOut().then(logoutSuccess).catch(logoutFailure)
  }

 
</script>

{#if auth2}
  {#if isLoggedIn}
    <Button
      disabled="{connecting}"
      fab
      size="small"
      class="green white-text"
      on:click="{onSignOut}"
    >
      <Icon path=" {mdiLogout}" />
    </Button>
  {:else}
    <Button
      disabled="{connecting}"
      fab
      size="small"
      class="red white-text"
      on:click="{onSignIn}"
    >
      <Icon path=" {mdiLogin}" />
    </Button>
  {/if}
{/if}
