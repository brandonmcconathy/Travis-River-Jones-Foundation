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
    document.getElementById('text-copy').style.visibility = 'visible'
  }

  return(
    <div className="bg-amber-100 py-10 px-2">
      <h1 className="font-bold text-2xl text-center mb-10">Email List</h1>
      <div className="bg-white text-center mx-auto px-4 py-4 rounded-xl box-pop sm:w-5/6 md:w-3/4 xl:w-1/2">
        <h1 id="email-list" className="text-sm font-semibold mb-5 md:text-lg">{emailList.map((email, index) => <EmailDisplay email={email} key={index} />)}</h1>
        <button onClick={copyText} className="bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Copy List</button>
        <h1 id='text-copy' className="invisible text-sm text-center text-gray-700 mt-1">Copied to clipboard</h1>
      </div>
    </div>
  )
}

const EmailDisplay = ({email}) => {
  return(
    <span>{`${email}, `}</span>
  )
}