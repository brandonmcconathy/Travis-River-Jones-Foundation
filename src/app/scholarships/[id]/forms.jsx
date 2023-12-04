'use client'

import { useState, useEffect } from "react"
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import timeConverter from "../../../../utils/timeconverter"
import FormSubmitted from "./formsubmitted"

export function Form1({pageId}) {

  const [formData, setFormData] = useState({
    name: '', email: '', number: '', answer1: '', answer2: '', answer3: '', answer4: ''
  })
  const [scholarshipData, setScholarshipData] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [review, setReview] = useState(false)

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
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      date: Date.now()
    })
    setSubmitted(true)
  }

  const handleReview = (event) => {
    event.preventDefault
    setReview(true)
  }

  const handleReturn = () => {
    setReview(false)
  }

  const addDBData = async (formData) => {
    await updateDoc(doc(db, 'scholarships', pageId), {
      applicants: arrayUnion(formData)
    })
  }

  if (submitted) {
    return(<FormSubmitted />)
  } else if (review) {
    const questions = scholarshipData.questions
    const answers = [formData.answer1, formData.answer2, formData.answer3, formData.answer4]
    return(
      <div className="bg-white w-[97] m-auto flex flex-col px-4 py-4 rounded-2xl box-pop mt-16 sm:w-11/12 md:w-5/6 lg:px-8 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
        <h1 className="font-bold text-2xl mb-1 text-center">{formData.name}</h1>
        <h3 className="text-gray-500 text-sm text-center sm:mb-2">{`${formData.email} | ${formData.number}`}</h3>
        <div>
          {questions.map((question, index) => 
          <div key={question}>
            <h1 className="mt-6 mb-1 text-gray-500 text-sm">{question}</h1>
            <h1 className="mx-2 lg:text-lg">{answers[index]}</h1>
          </div>)}
        </div>
        <div className="mx-auto flex gap-8 mt-10">
          <button onClick={handleSubmit} className="mx-auto bg-red-800 px-4 py-2 rounded-xl font-semibold text-white box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">SUBMIT</button>
          <button onClick={handleReturn} className="mx-auto bg-red-800 px-4 py-2 rounded-xl font-semibold text-white box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">BACK</button>
        </div>
      </div>
    )
  } else {
    return(
      <div className='w-[97] bg-amber-100 font-semibold m-auto my-10 py-5 px-4 rounded-2xl box-pop sm:w-5/6 md:my-12 md:px-8 lg:w-3/4 xl:my-20 xl:w-2/3'>
        <h1 className="text-center text-3xl font-bold mb-8">{scholarshipData.title}</h1>
        <section>
          <p className="text-lg text-center">Thank you for your interest in the {scholarshipData.title}. This is a reimbursement scholarship. Please read through the scholarship rules before you apply.</p>
          <ul className=" mx-4 list-disc flex flex-col gap-3 mt-8 mb-12 md:mx-10 lg:mx-16">
            <li>You must  successfully complete an EMT program with American EMT Academy or Chaffey Community College within 180 days of receiving the scholarship. Please notify us of your course dates.</li>
            <div className="flex flex-col text-center bg-white mx-auto my-2 px-6 py-4 rounded-xl box-pop underline">
              <a href="https://www.americanemtacademy.com" target="_blank" className="hover:text-gray-400  transition duration-300">American EMT Academy</a>
              <a href="https://www.chaffey.edu/acc/pcs/pcs-academic/emt.php" target="_blank" className="hover:text-gray-400  transition duration-300">Chaffey College</a>
            </div>
            <li>Scholarship is on a reimbursement basis. You will be required to pay for your course and meet all minimum requirements through American EMT Academy or Chaffey College. When you receive your course completion certificate  you will be eligible for reimbursement. </li>
            <li>Current reimbursement is limited to a maximum of $1,150 ($1000 tuition and $150 for textbook).</li>
            <li>Current applications are being accepted through <Deadline timeExpired={scholarshipData.timeExpired}/>.</li>
            <li>Successful recipient(s) of the TRJ Foundation scholarship will be notified by <AfterDeadline timeExpired={scholarshipData.timeExpired}/> and will have 72 hours to respond.</li>
          </ul>
          <p className="text-center mb-4">Please contact Heather or Michael Jones with any questions at travisriverjonesfoundation@gmail.com</p>
          <p className="text-center">Please only apply if you have read, understand and agree to all rules and are ready to begin an EMT program.</p>
        </section>
  
        <hr className="border-black my-8"></hr>
  
        <form autoComplete='off' onSubmit={handleReview} className="flex flex-col sm:mx-4 md:mx-8 lg:mx-16 2xl:mx-48">
          <div className="mb-8 flex flex-col mx-2 md:w-3/4 lg:w-2/3">
            <label htmlFor='name' className="font-bold text-lg">Name</label>
            <input type="text" id='name' name='name' value={formData.name} onChange={handleChange} required 
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-8 flex flex-col mx-2 md:w-3/4 lg:w-2/3">
            <label htmlFor='email' className="font-bold text-lg">Email</label>
            <input type="email" id='email' name='email' value={formData.email} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-8 flex flex-col mx-2 md:w-3/4 lg:w-2/3">
            <label htmlFor='number' className="font-bold text-lg">Best Contact Number</label>
            <input type="tel" id='number' name='number' value={formData.number} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-8 flex flex-col mx-2">
            <label htmlFor='answer1' className="font-bold text-lg leading-snug">How did you hear about this scholarship?</label>
            <input type="text" id='answer1' name='answer1' value={formData.answer1} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-8 flex flex-col mx-2">
            <label htmlFor="answer2" className="font-bold text-lg leading-snug">Why do you want to be an EMT and what are your career goals?</label>
            <textarea rows='4' id='answer2' name='answer2' value={formData.answer2} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></textarea>
          </div>
          <div className="mb-10 flex flex-col mx-2">
            <label htmlFor="answer3" className="font-bold text-lg leading-snug">How would this scholarship benefit you?</label>
            <textarea rows='4' id="answer3" name='answer3' value={formData.answer3} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></textarea>
          </div>
          <div className="mb-10 flex flex-col mx-2">
            <label htmlFor="answer4" className="font-bold text-lg leading-snug">Tell us about you last act of kindness or an incident where you helped someone when you didn't need to.</label>
            <textarea rows='4' id="answer4" name='answer4' value={formData.answer4} onChange={handleChange} required className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></textarea>
          </div>
          <div className="mb-10 mx-auto w-11/12 flex gap-4 items-center md:w-3/4">
            <input type="checkbox" onChange={checkChange} className="w-1/6"></input>
            <label className="font-bold text-sm">I have read and agree to the rules and understand the requirements/process.</label>
          </div>
          <p id="warning" className="text-sm text-center text-gray-700 mx-6 mb-1">Please agree to the terms before continuing.</p>
          <button type="submit" id="submit" disabled className="mx-auto bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">REVIEW</button>
        </form>
      </div> 
    )
  }

  
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
    <span>{`${expiredDate.hour}:${expiredDate.min} ${expiredDate.time} ${expiredDate.month} ${expiredDate.day}, ${expiredDate.year}`}</span>
  )
}

const AfterDeadline = ({timeExpired}) => {
  const expiredUnix = new Date(timeExpired)
  const expiredDate = timeConverter(expiredUnix/1000 + 172800)

  return(
    <span>{`${expiredDate.month} ${expiredDate.day}, ${expiredDate.year}`}</span>
  )
}