'use client'

import { useState, useEffect } from "react"
import { db } from "../../../../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"

export default function ViewRecipients() {

  const [recipientData, setRecipientData] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'recipients'), orderBy('dateAwarded', 'desc'))
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
    <div>

    </div>
  )
}