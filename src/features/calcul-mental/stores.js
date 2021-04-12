import { writable } from 'svelte/store'
export const generateds = writable(0)
export const calculMentalAssessment = writable()
export const waiting = writable([])
// console.log("generateds", $generateds)
let waitId = 0
export function addWaiting() {
    waiting.set(queue => queue.concat([++waitId]))
    return waitId
}
export function removeWaiting(id) {
    waiting.set(queue => {
        const q = [...queue]
        q.splice(q.indexOf(id), 1)
        return q
    })
}




