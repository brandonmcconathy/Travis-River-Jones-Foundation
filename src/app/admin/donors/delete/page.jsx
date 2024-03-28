'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { db, storage } from "../../../../../lib/firebase"
import { getDocs, collection, query, doc, deleteDoc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"

export default function DeleteDonor() {

  const [donorData, setDonorData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'donors'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setDonorData(tempData)
    }

    getDBData()
  }, [])

  return(
    <div className="bg-amber-100 py-10 px-2">
      <h1 className="font-bold text-2xl text-center mb-10">Delete Donors</h1>
      {donorData.length !== 0 ? 
        donorData.map((donor) => <DonorDisplay donor={donor} key={donor.id} />) : 
        <div>
          <h1 className="font-bold text-lg mb-1">No donor data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
    </div>
  )
}

const DonorDisplay = ({donor}) => {

  const { name, image, id } = donor

  const [showDelete, setShowDelete] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    await deleteDoc(doc(db, 'donors', id))
    if (image !== '') {
      await deleteObject(ref(storage, `donors/${name}`))
    }
    alert('donor deleted')
    router.back()
  }

  const changeDelete = () => {
    setShowDelete(true)
  }

  return(
    <div>
      {image == '' ? 
        <div className="m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-center text-2xl font-bold">{name}</h1>
            {!showDelete ? 
            <button onClick={changeDelete} id='confirm' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">DELETE</button> : 
            <button onClick={handleClick} id='delete' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">ARE YOU SURE?</button>}
          </div>
        </div> :
        <div className="flex gap-4 m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="w-1/3 flex justify-center items-center">
            <img src={image} className="rounded-xl box-pop"></img>
          </div>
          <div className="flex flex-col items-center justify-center w-2/3">
            <h1 className="text-center text-2xl font-bold sm:text-2xl">{name}</h1>
            {!showDelete ? 
            <button onClick={changeDelete} id='confirm' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">DELETE</button> : 
            <button onClick={handleClick} id='delete' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">ARE YOU SURE?</button>}
          </div>
        </div>}
    </div>
  )
}

