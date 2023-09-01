'use client'

import { useState } from "react"
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from "../../../../../lib/firebase"

export default function NewScholarship() {

  const [scholarshipData, setScholarshipData] = useState({title: '', description: '', expiration: '', applicants: []})

  const handleChange = (event) => {
    const { name, value } = event.target
    setScholarshipData( (prevFormData) => ({ ...prevFormData, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData(scholarshipData)
    setScholarshipData({title: '', description: '', expiration: '', applicants: []})
    alert('Submitted')
  }

  return(
    <div className="bg-blue-200 p-10">
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name='title' id='title' value={scholarshipData.title} onChange={handleChange} required></input>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea rows='3' cols='50' name='description' id='description' value={scholarshipData.description} onChange={handleChange} required></textarea>
        </div>
        <div>
          <label htmlFor="expiration">Expiration Time:</label>
          <input type="datetime-local" name='expiration' id='expiration' value={scholarshipData.expiration} onChange={handleChange} required></input>
        </div>
        <button type="submit" className='m-5'>SUBMIT</button>
      </form>
    </div>
  )
}

const addDBData = async (formData) => {
  await addDoc(collection(db, 'scholarships'), {
    ...formData,
    time: serverTimestamp()
  }).then((docRef) => {
    updateDoc(docRef, {
      id: docRef.id
    })
  })
}

