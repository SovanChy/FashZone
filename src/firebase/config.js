import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/auth"
import 'firebase/storage'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "majorproject1-375bd.firebaseapp.com",
  projectId: "majorproject1-375bd",
  storageBucket: "majorproject1-375bd.appspot.com",
  messagingSenderId: "200745316561",
  appId: "1:200745316561:web:470befce0974517ce195f0"
};

  firebase.initializeApp(firebaseConfig)

  //making it into object

  const projectFirebase = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()
  const timestamp = firebase.firestore.Timestamp

  export {projectFirebase, projectAuth, projectStorage, timestamp, firebase}