'use client'

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"


export default function Emails() {

  const [emailList, setEmailList] = useState([])

  useEffect(() => {
    const getDBData = async () => {
      const docSnap = await getDoc(doc(db, 'email list', 'emails'))

      setEmailList(docSnap.data().emailList)
    }
    getDBData()
  }, [])

  const copyText = () => {
    const emails = document.getElementById('email-list').textContent
    navigator.clipboard.writeText(emails)
  }

  return(
    <div className="bg-amber-100 py-5 px-10">
      <h1 className="font-bold text-xl mb-10">Email List</h1>
      <div className="bg-white text-center w-1/2 mx-auto px-8 py-4 rounded-xl box-pop">
        <h1 id="email-list" className="text-lg font-semibold mb-5">{emailList.map((email, index) => <EmailDisplay email={email} key={index} />)}</h1>
        <button onClick={copyText} className="bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Copy List</button>
      </div>
    </div>
  )
}

const EmailDisplay = ({email}) => {
  return(
    <span>{`${email}, `}</span>
  )
}