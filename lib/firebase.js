import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCw4SNvVTfFakire1NS5JMbZPlcNEO4w0Q",
  authDomain: "practice-page-b33d3.firebaseapp.com",
  projectId: "practice-page-b33d3",
  storageBucket: "practice-page-b33d3.appspot.com",
  messagingSenderId: "701510749705",
  appId: "1:701510749705:web:d0444c5b5b491d8c9a32d8"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)

export {app, auth, db, storage}