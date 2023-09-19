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
      <h1 className="text-center text-5xl text-white my-12 sm:text-6xl">Scholarships</h1>
      {!loading ?
      <div className="w-[80%] m-auto sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        {scholarshipData.length !== 0 ? 
        <div>
          {scholarshipData.map((scholarshipData) => <ScholarshipDisplay scholarshipData={scholarshipData} key={scholarshipData.id} />)}
        </div> : 
          <div className="text-center mt-32">
            <h1 className="text-amber-100 font-bold text-2xl mb-1">There are currently no active scholarships</h1>
            <h2 className="text-gray-300 text-lg">Please check back later</h2>
          </div>}
          <div className="bg-white w-[97] mx-auto p-4 rounded-xl mt-16 text-center mb-20 sm:w-5/6 md:w-9/12 lg:w-2/3">
            <h1 id="email-text" className="font-bold text-lg mb-6">Enter your email to be notified about new scholarships</h1>
            <form id='email-form' onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
              <input type="email" onChange={handleChange} placeholder='Email' required className="bg-amber-100 w-11/12 box-pop px-4 py-2 rounded-xl font-semibold outline-none focus:ring focus:ring-gray-300 transition duration-300 sm:w-5/6 lg:w-9/12"></input>
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
      <div href={{pathname: `/scholarships/${id}`}} className="flex flex-col m-auto bg-amber-100 mb-10 px-4 py-4 rounded-xl w-full box-pop">
          <h1 className="font-bold text-2xl break-words text-clip mb-3 text-center sm:text-3xl">{title}</h1>
          <h1 className="break-words mb-4 mx-2 sm:text-lg sm:mx-4 lg:mx-8">{description}</h1>
          <div className="flex justify-between gap-3 mx-4 lg:mx-8">
            <h1 className="font-semibold text-center">{timeRemaining.days} days {timeRemaining.hours} hours remaining</h1>
            <Link href={{pathname: `/scholarships/${id}`}} className="bg-red-800 px-4 py-2 rounded-xl text-center font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Apply Now</Link>
          </div>
      </div>
    )
  }
}