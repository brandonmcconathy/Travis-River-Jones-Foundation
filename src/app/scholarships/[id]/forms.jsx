'use client'

import { useState } from "react"
import { updateDoc, doc, arrayUnion } from "firebase/firestore"
import { db } from "../../../../lib/firebase"

export function Form1({pageId}) {

  const [formData, setFormData] = useState({
    name: '', email: '', number: '', answer1: '', answer2: '', answer3: '', answer4: ''
  })

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
    <div className='text-white'>
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