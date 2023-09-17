'use client'

import { getDocs, collection } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { useEffect, useState } from "react"
import Link from "next/link"
import timer from "../../../utils/timer"

export default function Scholarships() {

  const [scholarshipData, setScholarshipData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDBData = async () => {
      const querySnapshot = await getDocs(collection(db, 'scholarships'))
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setScholarshipData(tempData)
      setLoading(false)
    }

    getDBData()
  }, [])

  return(
    <div>
      <h1 className={"text-center text-6xl text-white my-16"}>Scholarships</h1>
      {!loading ?
      <div className="w-3/4 m-auto">
        {scholarshipData.length !== 0 ? 
        <div>
          {scholarshipData.map((scholarshipData) => <ScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />)}
        </div> : 
          <div className="text-center mt-32">
            <h1 className="text-amber-100 font-bold text-2xl mb-1">There are currently no active scholarships</h1>
            <h2 className="text-gray-300 text-lg">Please check back later</h2>
          </div>}
      </div> :
      <h1 className="text-center mt-32 text-amber-100 text-3xl">Loading...</h1>}
    </div>
  )
}

const ScholarshipDisplay = ({scholarshipData}) => {

  const {title, description, timeExpired, id} = scholarshipData

  const timeRemaining = timer(timeExpired)

  if (Object.keys(timeRemaining).length !== 0) {
    return(
      <div href={{pathname: `/scholarships/${id}`}} className="flex flex-col m-auto bg-amber-100 mb-10 px-8 py-6 rounded-xl w-3/4 box-pop">
          <h1 className="font-bold text-3xl break-words text-clip mb-8">{title}</h1>
          <h1 className="text-lg break-words mb-8 px-4">{description}</h1>
          <div className="flex px-4 justify-between">
            <h1 className="font-semibold">{timeRemaining.days} days {timeRemaining.hours} hours remaining</h1>
            <Link href={{pathname: `/scholarships/${id}`}} className="bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop">Apply Now</Link>
          </div>
      </div>
    )
  }
}