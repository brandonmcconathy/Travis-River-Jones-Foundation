'use client'

import { useState } from "react"
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from "../../../../../lib/firebase"

export default function NewScholarship() {

  const [scholarshipData, setScholarshipData] = useState({title: '', description: '', timeExpired: '', applicants: []})

  const handleChange = (event) => {
    const { name, value } = event.target
    setScholarshipData( (prevFormData) => ({ ...prevFormData, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData(scholarshipData)
    setScholarshipData({title: '', description: '', timeExpired: '', applicants: []})
    alert('Submitted')
  }

  return(
    <div className="bg-cream p-10 flex justify-around">
      <form autoComplete='off' onSubmit={handleSubmit} className="flex flex-col items-left w-1/2">
        <div className="mb-10 flex justify-between items-center">
          <label htmlFor="title" className="font-bold text-lg mr-10">Title:</label>
          <input type="text" name='title' id='title' value={scholarshipData.title} onChange={handleChange} required 
          className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
        </div>
        <div className="mb-10 flex justify-between">
          <label htmlFor="description" className="font-bold text-lg mr-10">Description:</label>
          <textarea rows='3' cols='50' name='description' id='description' value={scholarshipData.description} onChange={handleChange} required
          className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></textarea>
        </div>
        <div className="mb-10 flex justify-between items-center">
          <label htmlFor="timeExpired" className="font-bold text-lg mr-10">Expiration Time:</label>
          <input type="datetime-local" name='timeExpired' id='timeExpired' value={scholarshipData.timeExpired} onChange={handleChange} required
          className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
        </div>
        <button type="submit" className='font-bold text-cream text-xl bg-cyan-900 rounded-xl px-8 py-2 self-center'>SUBMIT</button>
      </form>
    </div>
  )
}

const addDBData = async (formData) => {
  await addDoc(collection(db, 'scholarships'), {
    ...formData,
    createdAt: serverTimestamp()
  }).then((docRef) => {
    updateDoc(docRef, {
      id: docRef.id
    })
  })
}

