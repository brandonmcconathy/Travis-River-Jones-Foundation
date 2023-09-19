'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import timeConverter from "../../../../utils/timeconverter"

export function Form1({pageId}) {

  const [formData, setFormData] = useState({
    name: '', email: '', number: '', answer1: '', answer2: '', answer3: '', answer4: ''
  })
  const [scholarshipData, setScholarshipData] = useState({})
  const router = useRouter()

  useEffect(() => {
    const getDBData = async () => {
      const docSnap = await getDoc(doc(db, 'scholarships', pageId))

      setScholarshipData(docSnap.data())
    }
    getDBData()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData( (prevFormData) => ({ ...prevFormData, [name]: value}))
  }

  const checkChange = () => {
    const buttonRef = document.getElementById('submit')
    const warningRef = document.getElementById('warning')
    buttonRef.disabled ? buttonRef.disabled = false : buttonRef.disabled = true
    buttonRef.disabled ? warningRef.style.visibility = 'visible' : warningRef.style.visibility = 'hidden'
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData({
      name: formData.name,
      email: formData.email,
      number: formData.number,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4]
    })
    alert('Application sucessfully submitted!')
    router.back()
  }

  const addDBData = async (formData) => {
    await updateDoc(doc(db, 'scholarships', pageId), {
      applicants: arrayUnion(formData)
    })
  }

  return(
    <div className='w-[97] bg-amber-100 font-semibold m-auto mt-10 py-5 px-4 rounded-2xl box-pop'>
      <h1 className="text-center text-3xl font-bold mb-8">{scholarshipData.title}</h1>
      <div>
        <p className="text-lg text-center">Thank you for your interest in the Travis River Jones Foundation EMT reimbursement scholarship program. Please read through the scholarship rules before you apply.</p>
        <ul className=" mx-4 list-disc flex flex-col gap-3 mt-8 mb-12">
          <li>You must  successfully complete an EMT program with American EMT Academy or Chaffey Community College within 180 days of receiving the scholarship. Please notify us of your course dates.</li>
          <div className="flex flex-col text-center bg-white mx-auto my-2 px-6 py-4 rounded-xl box-pop underline">
            <a href="https://www.americanemtacademy.com" target="_blank" className="hover:text-gray-400  transition duration-300">American EMT Academy</a>
            <a href="https://www.chaffey.edu/acc/pcs/pcs-academic/emt.php" target="_blank" className="hover:text-gray-400  transition duration-300">Chaffey College</a>
          </div>
          <li>Scholarship is on a reimbursement basis. You will be required to pay for your course and meet all minimum requirements through American EMT Academy or Chaffey College. When you receive your course completion certificate  you will be eligible for reimbursement. </li>
          <li>Current reimbursement is limited to a maximum of $1,150 ($1000 tuition and $150 for textbook). Receipt and course completion certificate must be submitted within the 180 day threshold.</li>
          <li>Current applications are being accepted through <Deadline timeExpired={scholarshipData.timeExpired}/>.</li>
          <li>Successful recipient(s) of the TRJ Foundation scholarship will be notified via email and one phone attempt by <AfterDeadline timeExpired={scholarshipData.timeExpired}/> and will have 72 hours to respond.</li>
        </ul>
        <p className="text-center mb-4">Please contact Heather or Michael Jones with any questions at travisriverjonesfoundation@gmail.com</p>
        <p className="text-center">Please only apply if you have read, understand and agree to all rules and are ready to begin an EMT program.</p>
      </div>

      <hr className="border-black my-8"></hr>

      <form autoComplete='off' onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-8 flex flex-col mx-2">
          <label className="font-bold text-lg">Name</label>
          <input type="text" name='name' value={formData.name} onChange={handleChange} required 
          className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
        </div>
        <div className="mb-8 flex flex-col mx-2">
          <label className="font-bold text-lg">Email</label>
          <input type="email" name='email' value={formData.email} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
        </div>
        <div className="mb-8 flex flex-col mx-2">
          <label className="font-bold text-lg">Best Contact Number</label>
          <input type="tel" name='number' value={formData.number} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
        </div>
        <div className="mb-8 flex flex-col mx-2">
          <label className="font-bold text-lg leading-snug">How did you hear about this scholarship?</label>
          <input type="text" name='answer1' value={formData.answer1} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
        </div>
        <div className="mb-10 flex flex-col mx-auto w-3/4">
          <label className="font-bold text-lg mr-10 self-start">Why do you want to be an EMT?</label>
          <textarea rows='4' cols='50' name='answer2' value={formData.answer2} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 w-full shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></textarea>
        </div>
        <div className="mb-10 flex flex-col mx-auto w-3/4">
          <label className="font-bold text-lg mr-10 self-start">How would this scholarship benefit you?</label>
          <textarea rows='4' cols='50' name='answer3' value={formData.answer3} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 w-full shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></textarea>
        </div>
        <div className="mb-10 flex flex-col mx-auto w-3/4">
          <label className="font-bold leading-snug text-lg mr-10 self-start">Tell us about you last act of kindness or an incident where you helped someone when you didn't need to.</label>
          <textarea rows='4' cols='50' name='answer4' value={formData.answer4} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 w-full shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></textarea>
        </div>
        <div className="mb-10 mx-auto w-3/4 flex gap-4">
          <input type="checkbox" onChange={checkChange}></input>
          <label className="font-bold">I acknowledge that I have read and agree to the rules and understand the requirements/process.</label>
        </div>
        <p id="warning" className="text-center text-gray-700">Please acknowledge the terms before submitting.</p>
        <button type="submit" id="submit" disabled className="mx-auto bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">SUBMIT</button>
      </form>
    </div> 
  )
}

const Deadline = ({timeExpired}) => {
  const expiredUnix = new Date(timeExpired)
  const expiredDate = timeConverter(expiredUnix/1000)

  if (expiredDate.hour > 12){
    expiredDate.time = 'p.m.'
    expiredDate.hour -= 12
  } else {
    expiredDate.time = 'a.m.'
  }

  return(
    <span>{`${expiredDate.hour}:${expiredDate.min} ${expiredDate.time} ${expiredDate.month}, ${expiredDate.day}, ${expiredDate.year}`}</span>
  )
}

const AfterDeadline = ({timeExpired}) => {
  const expiredUnix = new Date(timeExpired)
  const expiredDate = timeConverter(expiredUnix/1000 + 172800)

  return(
    <span>{`${expiredDate.month}, ${expiredDate.day}, ${expiredDate.year}`}</span>
  )
}