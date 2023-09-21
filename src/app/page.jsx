'use client'

import { useState, useEffect } from "react"
import { db } from "../../lib/firebase"
import { getDocs, collection, query, orderBy } from "firebase/firestore"
import Image from "next/image"
import { AiOutlineDown } from "react-icons/ai"


export default function Homepage() {

  const [recipientData, setRecipientData] = useState({})

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'recipients'), orderBy('year', 'desc'))
      const querySnapshot = await getDocs(q)

      let tempData = []

      querySnapshot.forEach((doc) => {
        tempData.push(doc.data())
      })

      setRecipientData(tempData)
    }
    getDBData()
  }, [])

  return (
      <>
        <div className="homepage-img relative -m-4 mb-0">
          <Image src='/assets/test-hero-img.jpg' alt="hero image" fill priority></Image>
          <h1 className="text-5xl absolute top-1/4 left-1/2 homepage-img-text fade-in font-semibold">Travis River Jones Foundation</h1>
          <div className="text-white absolute bottom-0 left-1/2 text-2xl flex flex-col items-center homepage-img-text bounce font-semibold">
            <p>See more</p>
            <AiOutlineDown />
          </div>
          
        </div> 
        <h1 className="mb-96">Test</h1>
      </>
  )
}