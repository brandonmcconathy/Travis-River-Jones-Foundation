'use client'

import { getDocs, collection } from "firebase/firestore"
import { getDownloadURL, ref } from "firebase/storage"
import { db, auth, storage } from "../../../lib/firebase"
import UserDisplay from "./userdisplay"
import { useEffect, useState } from "react"
import { signOut } from "firebase/auth"


export default function AdminPanel() {

  let [submissionData, setSubmissionData] = useState([])
  let [imageDown, setImageDown] = useState(null)

  useEffect( () => {
    const getDBData = async () => {
      const postsRef = collection(db, 'posts')
      const querySnapshot = await getDocs(postsRef)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      const imageRef = ref(storage, 'new-img')
      getDownloadURL(imageRef).then((url) => {
        setImageDown(url)
      })

      setSubmissionData(tempData)
    }

    getDBData()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
  }

  return(
    <div>
      {submissionData ? 
      submissionData.map( (userData) => <UserDisplay userData={userData} key={userData.name} />) : 
      <h1>No submission data</h1>}
      <button onClick={handleLogout}>Sign out</button>
      <img src={imageDown}/>
    </div>
  )
}
