<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
  import { user } from '../app/stores'
  import Fab, { Icon } from '@smui/fab'
  import { onDestroy } from 'svelte'

  // Keep track of script status ("idle", "loading", "ready", "error")
  let status = 'loading'
  $: loaded = status === 'ready'
  $: if (loaded) initAuth()

  function loadScript(src) {
    console.log('loading script')
    // Fetch existing script element by src
    // It may have been added by another intance of this hook
    let script = document.querySelector(`script[src="${src}"]`)

    if (!script) {
      // Create script
      script = document.createElement('script')
      script.src = src
      script.async = true
      script.setAttribute('data-status', 'loading')
      // Add script to document body
      document.body.appendChild(script)

      // Store status in attribute on script
      const setAttributeFromEvent = (event) => {
        console.log('event', event.type)
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
    console.log('user updated', user)
  })
  const removeScriptListeners = loadScript('https://apis.google.com/js/api.js')

  onDestroy(() => {
    removeScriptListeners()
    unsubscribeUser()
  })

  const loginSuccess = (googleUser) => {
    console.log('Google Auth Response', googleUser)
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const profile = googleUser.getBasicProfile()
    const authResponse = googleUser.getAuthResponse()

    if (
      !profile.getEmail().includes('@voltairedoha.com') &&
      profile.getEmail() !== 'zahara.alnour@gmail.com'
    ) {
      console.log(
        "Erreur connexion avec un mail n'appartenant pas au domaine voltairedoha.com",
      )
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
              console.error('error while authenticating in Firebase', error)
            })
        } else {
          console.log('User already signed-in Firebase.')
        }
      })

    const userProfile = {
      id: profile.getEmail(),
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
    console.log('user', userProfile)
    user.set(userProfile)
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
    console.log('logout success')
    user.set({ id: 'guest' })
  }

  function loginFailure(err) {
    console.log('error while login', err)
  }

  function logoutFailure(err) {
    console.log('error while logout', err)
  }

 

  function onSignIn() {
    const options = {
      prompt: '',
    }
    auth2.signIn(options).then(loginSuccess).catch(loginFailure)
  }

  function onSignOut() {
    auth2.signOut().then(logoutSuccess).catch(logoutFailure)
    firebase
      .auth()
      .signOut()
      .then(logoutSuccess)
      .catch(logoutFailure)
  }
</script>

{#if auth2}
  {#if isLoggedIn}
    <Fab mini on:click="{onSignOut}">
      <Icon class="material-icons">face</Icon>
    </Fab>
  {:else}
    <Fab mini on:click="{onSignIn}">
      <Icon class="material-icons">login</Icon>
    </Fab>
  {/if}
{/if}
