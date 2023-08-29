'use client'

import { getDocs, collection } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { useEffect, useState } from "react"
import ScholarshipDisplay from "./scholarshipdisplay"

export default function Scholarships() {

  let [scholarshipData, setScholarshipData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const querySnapshot = await getDocs(collection(db, 'scholarships'))
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setScholarshipData(tempData)
    }

    getDBData()
  }, [])

  return(
    <div>
      {scholarshipData.length !== 0 ? 
        scholarshipData.map( (scholarshipData) => <ScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />) : 
        <h1>No submission data</h1>}
    </div>
  )
}