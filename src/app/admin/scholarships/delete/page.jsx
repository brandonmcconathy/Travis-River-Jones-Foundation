'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { db } from "../../../../../lib/firebase"
import { getDocs, collection, query, orderBy, doc, deleteDoc } from "firebase/firestore"

export default function DeleteScholarship() {

  let [scholarshipData, setScholarshipData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'scholarships'), orderBy('expiration'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setScholarshipData(tempData)
    }

    getDBData()
  }, [])

  return(
    <div className="bg-blue-200 p-10">
      <h1>Choose a scholarship:</h1>
      {scholarshipData.length !== 0 ? 
        scholarshipData.map( (scholarshipData) => <ScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />) : 
        <h1>No submission data</h1>}
    </div>
  )
}

const ScholarshipDisplay = ({scholarshipData}) => {

  const {title, description, id} = scholarshipData
  const router = useRouter()

  const handleClick = async () => {
    await deleteDoc(doc(db, 'scholarships', id))
    alert('scholarship deleted')
    router.back()
  }

  return(
    <div className="bg-white m-10 p-4">
        <h1>{title}</h1>
        <h1>{description}</h1>
        <button onClick={handleClick}>DELETE</button>
    </div>
    )
}