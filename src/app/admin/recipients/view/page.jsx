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
      {recipient.image == '' ? 
        <img src="/noimg.jpg" className="w-1/3 rounded-xl"></img> :
        <img src={recipient.image} className="w-1/3 rounded-xl box-pop"></img>}
      <div className="flex flex-col items-center justify-center w-2/3">
        <h1 className="text-center text-2xl font-bold mb-3">{recipient.name}</h1>
        <h1 className="text-center mb-1">{recipient.scholarship}</h1>
        <h1 className="text-center mb-1">{recipient.school}</h1>
        <h1 className="text-center">{recipient.year}</h1>
      </div>
    </div>
  )
}