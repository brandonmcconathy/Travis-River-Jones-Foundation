'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../../lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function Page({params}) {

  let [scholarshipData, setScholarshipData] = useState({})

  useEffect(() => {
    const getDBData = async () => {
      const docSnap = await getDoc(doc(db, 'scholarships', params.id))

      setScholarshipData(docSnap.data())
    }

    getDBData()
  }, [])

  console.log(scholarshipData)

  return(
    <div>

    </div>
  )
}