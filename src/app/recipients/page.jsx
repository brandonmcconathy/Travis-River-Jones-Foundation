'use client'

import { useState, useEffect } from "react"
import { db } from "../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"

export default function Recipients() {

  const [recipientData, setRecipientData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'recipients'), orderBy('year', 'desc'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setRecipientData(tempData)
      setLoading(false)
    }

    getDBData()
  }, [])

  return(
    <div>
      <h1 className="text-center text-6xl text-white mt-16 mb-24">Recipients</h1>
      {!loading ?
      recipientData.length !== 0 ?
        recipientData.map((recipient) => <RecipientDisplay recipient={recipient} key={recipient.name} />) :
        <div>
          <h1 className="text-center mt-32 text-amber-100 text-3xl">No recipients</h1>
        </div> :
        <h1 className="text-center mt-32 text-amber-100 text-3xl">Loading...</h1>}
    </div>
  )
}

const RecipientDisplay = ({recipient}) => {

  return(
    <div>
      {recipient.image == '' ? 
        <div className="m-auto bg-white mb-10 px-8 py-6 rounded-xl w-1/3 box-pop">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-center text-2xl font-bold mb-3">{recipient.name}</h1>
            <h1 className="text-center mb-1">{recipient.scholarship}</h1>
            <h1 className="text-center mb-1">{recipient.school}</h1>
            <h1 className="text-center">{recipient.year}</h1>
          </div>
        </div> :
        <div className="flex m-auto bg-white mb-10 px-8 py-6 rounded-xl w-1/3 box-pop">
          <img src={recipient.image} className="w-1/3 rounded-xl box-pop"></img>
          <div className="flex flex-col items-center justify-center w-2/3">
            <h1 className="text-center text-2xl font-bold mb-3">{recipient.name}</h1>
            <h1 className="text-center mb-1">{recipient.scholarship}</h1>
            <h1 className="text-center mb-1">{recipient.school}</h1>
            <h1 className="text-center">{recipient.year}</h1>
          </div>
        </div>}
    </div>
  )
}