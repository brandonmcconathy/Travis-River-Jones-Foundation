'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"
import Link from "next/link"
import timeConverter from "../../../../utils/timeconverter"
import checkExpired from "../../../../utils/checkexpired"

export default function AdminApplicants() {

  let [scholarshipData, setScholarshipData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'scholarships'), orderBy('timeExpired'))
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
    <div className="bg-amber-100 py-10 px-2">
      <h1 className="font-bold text-2xl text-center mb-10">Applications</h1>
      <h1 className="font-bold text-2xl text-center mb-10">Choose a scholarship</h1>
      <div className="w-[97] m-auto sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
      {scholarshipData.length !== 0 ? 
        scholarshipData.map( (scholarshipData) => <ScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />) : 
        <div className="text-center">
          <h1 className="font-bold text-lg mb-1">No scholarship data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
      </div>
    </div>
  )
}

const ScholarshipDisplay = ({scholarshipData}) => {

  const {title, description, id, createdAt, timeExpired} = scholarshipData

  const createdAtDate = timeConverter(createdAt.seconds)
  const expired = checkExpired(timeExpired)
  const expiredUnix = new Date(timeExpired)
  const expiredDate = timeConverter(expiredUnix/1000)

  return(
    <Link href={{pathname: `/admin/applications/${id}`}} className="flex flex-col m-auto bg-white mb-10 px-8 py-6 rounded-xl box-pop">
      <h1 className="font-bold text-3xl break-words text-clip mb-8">{title}</h1>
      <h1 className="text-lg break-words mb-8">{description}</h1>
      <div className="flex justify-between items-center text-sm font-semibold">
        <h1>Created on: {`${createdAtDate.month}/${createdAtDate.day}/${createdAtDate.year}`}</h1>
        {expired ?
        <h1>Expired on {`${expiredDate.month}/${expiredDate.day}/${expiredDate.year}`}</h1> :
        <h1>Active until {`${expiredDate.month}/${expiredDate.day}/${expiredDate.year}`}</h1>}
      </div>
    </Link>
    )
}