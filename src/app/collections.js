import { collections } from './stores'
import { get } from 'svelte/store'
import { fetchCollection } from './db'
import { getPropertyName } from './utils'



  export async function getCollection({collectionPath, filters=[], extract}) {
    //  check in store
    const store = get(collections)
   
    let values = store[collectionPath]
    let promise

    for (let i = 0; values && i < filters.length; i++) {
      const filter = filters[i]
      const filterName = getPropertyName(filter)
      const filterValue = filter[filterName]
      values = values[filterValue]
    }

    if (values && values.collection) {
      console.log('collection found in store', values.collection)
      promise=Promise.resolve(values.collection)
    }

    // else fetch
    else promise =  fetchCollection({
      path: collectionPath,
      filters,
    }).then((documents) => {
     
        if (extract) documents = documents.map((value) => value[extract])
      // updating store
      collections.update((store) => {
        if (!store[collectionPath]) {
          store[collectionPath] = {}
        }
        let nested = store[collectionPath]

        filters.forEach((filter) => {
          const filterName = getPropertyName(filter)
          const filterValue = filter[filterName]
          if (!nested[filterValue]) nested[filterValue] = {}
          nested = nested[filterValue]
        })
        
        
        nested.collection = documents
        return store
      })
      return documents

    })



    return promise
  }