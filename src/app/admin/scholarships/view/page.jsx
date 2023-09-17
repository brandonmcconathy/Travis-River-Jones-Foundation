'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"
import timeConverter from '../../../../../utils/timeconverter'
import checkExpired from "../../../../../utils/checkexpired"

export default function DeleteScholarship() {

  const [scholarshipData, setScholarshipData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'scholarships'), orderBy('timeExpired', 'desc'))
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
    <div className="bg-amber-100 py-5 px-10">
      <h1 className="font-bold text-xl mb-10">Viewing Scholarships</h1>
      {scholarshipData.length !== 0 ? 
        scholarshipData.map( (scholarshipData) => <ScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />) : 
        <div>
          <h1 className="font-bold text-lg mb-1">No scholarship data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
    </div>
  )
}

const ScholarshipDisplay = ({scholarshipData}) => {

  const {title, description, createdAt, timeExpired} = scholarshipData

  const createdAtDate = timeConverter(createdAt.seconds)
  const expired = checkExpired(timeExpired)
  const expiredUnix = new Date(timeExpired)
  const expiredDate = timeConverter(expiredUnix/1000)

  return(
    <div className="flex flex-col m-auto bg-white mb-10 px-8 py-6 rounded-xl w-1/2 box-pop">
        <h1 className="font-bold text-3xl break-words text-clip mb-8">{title}</h1>
        <h1 className="text-lg break-words mb-8">{description}</h1>
        <div className="flex justify-between items-center">
          <h1 className="text-sm mb-2">Created on: {`${createdAtDate.month}/${createdAtDate.day}/${createdAtDate.year}`}</h1>
          {expired ?
          <h1 className="text-sm">Expired on {`${expiredDate.month}/${expiredDate.day}/${expiredDate.year}`}</h1> :
          <h1 className="text-sm">Active until {`${expiredDate.month}/${expiredDate.day}/${expiredDate.year}`}</h1>}
        </div>
    </div>
    )
}