'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"

export default function ViewDonor() {

  const [donorData, setDonorData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'donors'), orderBy('name'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach((doc) => {
        tempData.push(doc.data())
      })

      setDonorData(tempData)
    }

    getDBData()
  }, [])

  return(
    <div className="bg-amber-100 py-10 px-2">
      <h1 className="font-bold text-2xl text-center mb-10">Viewing Donors</h1>
      {donorData.length !== 0 ?
        donorData.map((donor) => <DonorDisplay donor={donor} key={donor.name} />) :
        <div>
          <h1 className="font-bold text-lg mb-1">No donor data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
    </div>
  )
}

const DonorDisplay = ({donor}) => {

  return(
    <div>
      {donor.image == '' ? 
        <div className="m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-center text-2xl font-bold">{donor.name}</h1>
            {donor.link != '' && <a href={donor.link} target="_blank" className="mt-1 text-center text-lg font-semibold underline hover:text-gray-400  transition duration-300">{donor.linkName == '' ? 'Website' : donor.linkName}</a>}
          </div>
        </div> :
        <div className="flex gap-4 m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="w-1/3 flex justify-center items-center">
            <img src={donor.image} className="rounded-xl box-pop"></img>
          </div>
          <div className="flex flex-col items-center justify-center w-2/3">
            <h1 className="text-center text-2xl font-bold sm:text-2xl">{donor.name}</h1>
            {donor.link != '' && <a href={donor.link} target="_blank" className="mt-1 text-center text-lg font-semibold underline hover:text-gray-400  transition duration-300">{donor.linkName == '' ? 'Website' : donor.linkName}</a>}
          </div>
        </div>}
    </div>
  )
}