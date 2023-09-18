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
    <div className="bg-amber-100 py-5 px-10">
      <h1 className="font-bold text-xl mb-10">Choose a recipient to delete:</h1>
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

  const [showDelete, setShowDelete] = useState(0)
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
    setShowDelete(1)
  }

  return(
    <div className="flex m-auto bg-white mb-10 px-8 py-6 rounded-xl w-5/12 box-pop">
      {image == '' ? 
        <img src="/noimg.jpg" className="w-1/3"></img> :
        <img src={image} className="w-1/3 rounded-3xl box-pop"></img>}
      <div className="flex flex-col items-center justify-center w-2/3">
        <h1 className="text-center text-2xl font-bold mb-3">{name}</h1>
        <h1 className="text-center mb-1">{scholarship}</h1>
        <h1 className="text-center mb-1">{school}</h1>
        <h1 className="text-center">{year}</h1>
        {!showDelete ? 
          <button onClick={changeDelete} id='confirm' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">DELETE</button> : 
          <button onClick={handleClick} id='delete' className="font-bold bg-red-600 px-4 py-2 rounded-xl self-end">ARE YOU SURE?</button>}  
      </div>
    </div>
  )
}