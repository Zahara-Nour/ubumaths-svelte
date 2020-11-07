import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { getLogger } from './utils'


const firebaseConfig = {
  apiKey: 'AIzaSyAMnIlAk2yqGItw5EfTCLqj2SdJF6Q5620',
  authDomain: 'mathereal-1586176000451.firebaseapp.com',
  databaseURL: 'https://mathereal-1586176000451.firebaseio.com',
  projectId: 'mathereal-1586176000451',
  storageBucket: 'mathereal-1586176000451.appspot.com',
  messagingSenderId: '702572178697',
  appId: '1:702572178697:web:cb14e184230ff9ca8277d8',
}

firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()
const storage = firebase.storage().ref()

function fetchCollection({ path, filters }) {
  const { error, info, trace } = getLogger('fetchCollection', 'trace')
  trace(`  fetching ${path} with filters :`, filters)
 

  const pathArray = path.split('/')
  let documents = []
  let collectionRef = db.collection(pathArray.shift())
  while (pathArray.length > 0) {
    collectionRef = collectionRef
      .doc(pathArray.shift())
      .collection(pathArray.shift())
  }

  filters.forEach((filter) => {
  
    const name = Object.getOwnPropertyNames(filter)[0]
    const value = filter[name]
    if (value) collectionRef = collectionRef.where(name, '==', value)
  })

  return collectionRef
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
    
        documents.push({ ...doc.data(), id: doc.id })
      })
      trace(`  fetched ${path} :`, documents)
      return documents
    })
    .catch((err) => console.log(err))
}


function saveDocument({ path, document }) {
  console.log('saving doc :', document)
  const pathArray = path.split('/')
  let collectionRef = db.collection(pathArray.shift())
  while (pathArray.length > 0) {
    collectionRef = collectionRef
      .doc(pathArray.shift())
      .collection(pathArray.shift())
  }

  const { id, ...rest } = document

  if (id) {
    
    // just upfdate document
    return collectionRef
      .doc(id)
      .update(rest)
      .then(() => {
        console.log(
          `Document ${id} successfully updated in collection ${path}`,
          rest,
        )

        // document is returned to sync store
        return document
      }
      )
      .catch((error) =>
        console.error(
          `Error while saving document ${id} in collection ${path}`,
          error,
        ),
      )
  } else {
    // we need to create a new document
    const doc = collectionRef.doc()
    return doc
      .set(document)
      .then(() => {
        console.log(
          `Document ${doc.id} successfully added in collection ${path}`,
          document,
        )
        // the new document  is returned  with his id to sync store
        return {...document, id:doc.id}
      }
      )
      .catch((error) =>
        console.error(
          `Error while adding document ${doc.id} in collection ${path}`,
          error,
        ),
      )
  }
}


export { fetchCollection, storage, db, saveDocument }
