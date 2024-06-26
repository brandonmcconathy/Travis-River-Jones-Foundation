'use client'

import { useState, useEffect } from "react"
import { db } from "../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"

export default function Donors() {

  const [donorData, setDonorData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'donors'), orderBy('name'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setDonorData(tempData)
      setLoading(false)
    }

    getDBData()
  }, [])

  return(
    <div className="mb-12">
      <h1 className="text-center text-6xl text-white mt-12 mb-12">Donors</h1>
      <h2 className="bg-amber-100 m-auto text-center text-xl font-semibold rounded-xl mb-16 px-4 py-4 w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">The Travis River Jones Foundation would like to give special thanks to the following donors for their continued support.</h2>
      {!loading ?
      donorData.length !== 0 ?
        donorData.map((donor) => <DonorDisplay donor={donor} key={donor.name} />) :
        <div>
          <h1 className="text-center mt-32 text-amber-100 text-3xl">No donors</h1>
        </div> :
        <h1 className="text-center mt-32 text-amber-100 text-3xl">Loading...</h1>}
    </div>
  )
}

const DonorDisplay = ({donor}) => {

  const { name, image } = donor

  return(
    <div>
      {image == '' ? 
        <div className="m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-center text-2xl font-bold">{name}</h1>
            {donor.link != '' && <a href={donor.link} target="_blank" className="mt-1 text-center text-lg font-semibold underline hover:text-gray-400  transition duration-300">{donor.linkName == '' ? 'Website' : donor.linkName}</a>}
          </div>
        </div> :
        <div className="flex gap-4 m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="w-1/3 flex justify-center items-center">
            <img src={image} className="rounded-xl box-pop"></img>
          </div>
          <div className="flex flex-col items-center justify-center w-2/3">
            <h1 className="text-center text-2xl font-bold sm:text-2xl">{name}</h1>
            {donor.link != '' && <a href={donor.link} target="_blank" className="mt-1 text-center text-lg font-semibold underline hover:text-gray-400  transition duration-300">{donor.linkName == '' ? 'Website' : donor.linkName}</a>}
          </div>
        </div>}
    </div>
  )
}