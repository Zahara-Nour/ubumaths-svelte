  import { writable } from 'svelte/store'
  export const collections = writable({})
  export const images = writable({})
  export const user = writable({id:'guest'})
  export const updateCardsList = writable(false)
  export const menuFontSize = writable(16)
  export const testFontSize = writable(20)
  export const classroomFontSize = writable(42)
  // menu, test, classroom
  export const mode = writable("menu")
