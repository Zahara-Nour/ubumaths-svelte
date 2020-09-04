  import { writable } from 'svelte/store'
  export const collections = writable({})
  export const images = writable({})
  export const user = writable({id:'guest'})
  export const updateCardsList = writable(false)
