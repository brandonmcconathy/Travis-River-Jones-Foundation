'use client'

import { getDocs, collection, query, orderBy, updateDoc, doc, arrayUnion } from "firebase/firestore"
import { db } from "../../../lib/firebase"
import { useEffect, useState } from "react"
import Link from "next/link"
import timer from "../../../utils/timer"

export default function Scholarships() {

  const [scholarshipData, setScholarshipData] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const getDBData = async () => {
      const q = query(collection(db, 'scholarships'), orderBy('timeExpired'))
      const querySnapshot = await getDocs(q)
    
      let tempData = []
    
      querySnapshot.forEach( (doc) => {
        tempData.push(doc.data())
      })

      setScholarshipData(tempData)
      setLoading(false)
    }

    getDBData()
  }, [])

  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData(email)
    setEmail('')
    document.getElementById('email-text').textContent = 'Your email has been added to our mailing list'
    document.getElementById('email-form').style.visibility = 'hidden'
  }

  const addDBData = async (formData) => {
    await updateDoc(doc(db, 'email list', 'emails'), {
      emailList: arrayUnion(formData)
    })
  }

  return(
    <div>
      <h1 className="text-center text-6xl text-white my-16">Scholarships</h1>
      {!loading ?
      <div className="w-3/4 m-auto">
        {scholarshipData.length !== 0 ? 
        <div>
          {scholarshipData.map((scholarshipData) => <ScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />)}
        </div> : 
          <div className="text-center mt-32">
            <h1 className="text-amber-100 font-bold text-2xl mb-1">There are currently no active scholarships</h1>
            <h2 className="text-gray-300 text-lg">Please check back later</h2>
          </div>}
          <div className="bg-white w-2/5 mx-auto px-8 py-4 rounded-xl mt-16 text-center mb-20">
            <h1 id="email-text" className="font-bold text-lg mb-6">Enter your email to be notified about new scholarships</h1>
            <form id='email-form' onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full">
              <input type="email" onChange={handleChange} placeholder='Email' required className="bg-amber-100 w-3/4 box-pop px-4 py-2 rounded-xl font-semibold outline-none focus:ring focus:ring-gray-300 transition duration-300"></input>
              <button type="submit" className="bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">SUBMIT</button>
            </form>
          </div>
      </div> :
      <h1 className="text-center mt-32 text-amber-100 text-3xl">Loading...</h1>}
    </div>
  )
}

const ScholarshipDisplay = ({scholarshipData}) => {

  const {title, description, timeExpired, id} = scholarshipData

  const timeRemaining = timer(timeExpired)

  if (Object.keys(timeRemaining).length !== 0) {
    return(
      <div href={{pathname: `/scholarships/${id}`}} className="flex flex-col m-auto bg-amber-100 mb-10 px-8 py-6 rounded-xl w-3/4 box-pop">
          <h1 className="font-bold text-3xl break-words text-clip mb-8">{title}</h1>
          <h1 className="text-lg break-words mb-8 px-4">{description}</h1>
          <div className="flex px-4 justify-between">
            <h1 className="font-semibold">{timeRemaining.days} days {timeRemaining.hours} hours remaining</h1>
            <Link href={{pathname: `/scholarships/${id}`}} className="bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Apply Now</Link>
          </div>
      </div>
    )
  }
}