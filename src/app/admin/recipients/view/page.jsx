'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"

export default function ViewRecipients() {

  const [recipientData, setRecipientData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'recipients'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setRecipientData(tempData)
    }

    getDBData()
  }, [])

  console.log(recipientData)

  return(
    <div className="bg-cream py-5 px-10">
      <h1 className="font-bold text-xl mb-10">Viewing Recipients</h1>
      {recipientData.length !== 0 ?
        recipientData.map((recipient) => <ApplicantDisplay recipient={recipient} key={recipient.name} />) :
        <div>
          <h1 className="font-bold text-lg mb-1">No recipient data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
    </div>
  )
}

const ApplicantDisplay = ({recipient}) => {

  return(
    <div className="flex m-auto bg-white mb-10 px-8 py-6 rounded-xl w-1/2 box-pop">
      <img src={recipient.image} className="w-1/3 rounded-xl"></img>
      <div className="flex justify-center w-2/3">
        <h1 className="text-2xl font-bold">{recipient.name}</h1>
      </div>
    </div>
  )
}