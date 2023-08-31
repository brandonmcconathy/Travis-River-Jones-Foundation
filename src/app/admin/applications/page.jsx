'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"
import AdminScholarshipDisplay from "./adminscholarshipdisplay"

export default function AdminApplicants() {

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
        scholarshipData.map( (scholarshipData) => <AdminScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />) : 
        <h1>No submission data</h1>}
    </div>
  )
}