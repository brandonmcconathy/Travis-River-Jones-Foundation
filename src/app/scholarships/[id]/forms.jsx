'use client'

import { useState, useEffect } from "react"
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"

export function Form1({pageId}) {

  const [formData, setFormData] = useState({
    name: '', email: '', number: '', answer1: '', answer2: '', answer3: '', answer4: ''
  })
  const [scholarshipData, setScholarshipData] = useState({})

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

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData({
      name: formData.name,
      email: formData.email,
      number: formData.number,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4]
    })
    setFormData({name: '', email: '', number: '', answer1: '', answer2: '', answer3: '', answer4: ''})
  }

  const addDBData = async (formData) => {
    await updateDoc(doc(db, 'scholarships', pageId), {
      applicants: arrayUnion(formData)
    })
  }

  return(
    <div className='w-3/4 bg-amber-100 font-semibold m-auto mt-10 py-10 px-10 rounded-2xl box-pop'>
      <h1 className="text-center text-3xl mb-10">{scholarshipData.title}</h1>

      <p>Thank you for your interest in the Travis River Jones Foundation EMT reimbursement scholarship program.  Please read through the scholarship rules before you apply.</p>
      <p>Scholarship Rules (If you are selected):</p>
      <ol>
        <li>1. You must  successfully complete an EMT program with American EMT Academy or Chaffey Community College within 180 days of receiving the scholarship. Please notify us of your course dates.</li>
        <li>2. Scholarship is on a reimbursement basis. You will be required to pay for your course and meet all minimum requirements through American EMT Academy or Chaffey College. When you receive your course completion certificate  you will be eligible for reimbursement. </li>
        <li>3.  Current reimbursement is limited to a maximum of $1,150 ($1000 tuition and $150 for textbook). Receipt and course completion certificate must be submitted within the 180 day threshold.</li>
        <li>4. Current applications are being accepted through 6:00 p.m. August 25th,  2023</li>
        <li>5.  Successful recipient(s) of the TRJ Foundation scholarship will be notified via email and one phone attempt by August 27th, 2023 and will have 72 hours to respond.</li>
      </ol>
      <p>Please contact Heather or Michael Jones with any questions at travisriverjonesfoundation@gmail.com</p>
      <p>Please only apply if you have read, understand and agree to all rules and are ready to begin an EMT program.</p>

      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label>Your Name</label>
          <input type="text" name='name' value={formData.name} onChange={handleChange} required 
          className='text-black'></input>
        </div>
        <div>
          <label>Your Email</label>
          <input type="email" name='email' value={formData.email} onChange={handleChange} required className='text-black'></input>
        </div>
        <div>
          <label>Best Contact Number</label>
          <input type="tel" name='number' value={formData.number} onChange={handleChange} required className='text-black'></input>
        </div>
        <div>
          <label>How did you hear about this scholarship?</label>
          <input type="text" name='answer1' value={formData.answer1} onChange={handleChange} required className='text-black'></input>
        </div>
        <div>
          <label>Why do you want to be an EMT?</label>
          <textarea rows='4' cols='50' name='answer2' value={formData.answer2} onChange={handleChange} required className='text-black'></textarea>
        </div>
        <div>
          <label>How would this scholarship benefit you?</label>
          <textarea rows='4' cols='50' name='answer3' value={formData.answer3} onChange={handleChange} required className='text-black'></textarea>
        </div>
        <div>
          <label>Tell us about you last act of kindness or an incident where you helped someone when you didn't need to.</label>
          <textarea rows='4' cols='50' name='answer4' value={formData.answer4} onChange={handleChange} required className='text-black'></textarea>
        </div>
        <button type="submit" className='mt-20 ml-20'>SUBMIT</button>
      </form>
    </div> 
  )
}