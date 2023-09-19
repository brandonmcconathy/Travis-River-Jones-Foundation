'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"

export default function ViewRecipients() {

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
      <h1 className="font-bold text-xl mb-10">Viewing Recipients</h1>
      {recipientData.length !== 0 ?
        recipientData.map((recipient) => <RecipientDisplay recipient={recipient} key={recipient.name} />) :
        <div>
          <h1 className="font-bold text-lg mb-1">No recipient data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
    </div>
  )
}

const RecipientDisplay = ({recipient}) => {

  return(
    <div>
      {recipient.image == '' ? 
        <div className="m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-center text-2xl font-bold mb-3">{recipient.name}</h1>
            <h1 className="text-center mb-2">{recipient.scholarship}</h1>
            <h1 className="text-center">{recipient.school}</h1>
            <h1 className="text-center">{recipient.year}</h1>
          </div>
        </div> :
        <div className="flex gap-4 m-auto bg-white mb-8 px-4 py-4 rounded-xl w-[97] box-pop sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-5/12 2xl:w-1/3">
          <div className="w-1/3 flex justify-center items-center">
            <img src={recipient.image} className="rounded-xl box-pop"></img>
          </div>
          <div className="flex flex-col items-center justify-center w-2/3">
            <h1 className="text-center text-2xl font-bold mb-3 sm:text-2xl">{recipient.name}</h1>
            <h1 className="text-center mb-2">{recipient.scholarship}</h1>
            <h1 className="text-center">{recipient.school}</h1>
            <h1 className="text-center">{recipient.year}</h1>
          </div>
        </div>}
    </div>
  )
}