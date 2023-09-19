'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { db, storage } from "../../../../../lib/firebase"
import { getDocs, collection, query, orderBy, doc, deleteDoc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"

export default function DeleteRecipient() {

  const [recipientData, setRecipientData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'recipients'), orderBy('year', 'desc'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setRecipientData(tempData)
    }

    getDBData()
  }, [])

  return(
    <div className="bg-amber-100 py-10 px-2">
      <h1 className="font-bold text-2xl text-center mb-10">Delete Recipients</h1>
      {recipientData.length !== 0 ? 
        recipientData.map((recipient) => <RecipientDisplay recipient={recipient} key={recipient.id} />) : 
        <div>
          <h1 className="font-bold text-lg mb-1">No recipient data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
    </div>
  )
}

const RecipientDisplay = ({recipient}) => {

  const { name, scholarship, school, year, image, id } = recipient

  const [showDelete, setShowDelete] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    await deleteDoc(doc(db, 'recipients', id))
    if (image !== '') {
      await deleteObject(ref(storage, `recipients/${name}`))
    }
    alert('recipient deleted')
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
            <h1 className="text-center text-2xl font-bold mb-3">{name}</h1>
            <h1 className="text-center mb-2">{scholarship}</h1>
            <h1 className="text-center">{school}</h1>
            <h1 className="text-center mb-2">{year}</h1>
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
            <h1 className="text-center text-2xl font-bold mb-3 sm:text-2xl">{name}</h1>
            <h1 className="text-center mb-2">{scholarship}</h1>
            <h1 className="text-center">{school}</h1>
            <h1 className="text-center mb-2">{year}</h1>
            {!showDelete ? 
            <button onClick={changeDelete} id='confirm' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">DELETE</button> : 
            <button onClick={handleClick} id='delete' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">ARE YOU SURE?</button>}
          </div>
        </div>}
    </div>
  )
}

