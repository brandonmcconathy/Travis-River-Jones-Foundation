'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from "../../../../../lib/firebase"
import { formQuestions }  from "../../../../../lib/formquestions"

export default function NewScholarship() {

  const [scholarshipData, setScholarshipData] = useState({title: '', description: '', timeExpired: '', questions: [], questionForm: null})
  const router = useRouter()

  const handleChange = (event) => {
    const { name, value } = event.target
    setScholarshipData( (prevFormData) => ({ ...prevFormData, [name]: value}))
  }

  const handleClick = (event) => {
    const { title } = event.target
    setScholarshipData( (prevFormData) => ({ ...prevFormData, questions: formQuestions[title], questionForm: parseInt(title) + 1}))
    document.getElementById(`questions${title}`).classList.add('ring-4')
    document.getElementById(`questions${title}`).classList.add('ring-gray-300')
    document.getElementById('submit').disabled = false
    formQuestions.map((questions, index) => {
      if (parseInt(title) !== index) {
        document.getElementById(`questions${index}`).classList.remove('ring-4')
        document.getElementById(`questions${index}`).classList.remove('ring-gray-300')
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData(scholarshipData)
    router.push('/admin/scholarships')
    alert('New scholarship added')
  }

  return(
    <div className="bg-amber-100 p-10">
      <h1 className="text-lg font-bold mb-6">Add new scholarship:</h1>
      <div className="flex justify-around">
        <form autoComplete='off' onSubmit={handleSubmit} className="flex flex-col items-left w-1/2">
          <div className="mb-10 flex justify-between items-center">
            <label htmlFor="title" className="font-bold text-lg mr-10">Title:</label>
            <input type="text" name='title' id='title' value={scholarshipData.title} onChange={handleChange} required 
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
          </div>
          <div className="mb-10 flex justify-between">
            <label htmlFor="description" className="font-bold text-lg mr-10">Description:</label>
            <textarea rows='4' cols='50' name='description' id='description' value={scholarshipData.description} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></textarea>
          </div>
          <div className="mb-10 flex justify-between items-center">
            <label htmlFor="timeExpired" className="font-bold text-lg mr-10">Expiration Time:</label>
            <input type="datetime-local" name='timeExpired' id='timeExpired' value={scholarshipData.timeExpired} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
          </div>
          <div className="mb-14 flex justify-between">
            <label className="font-bold text-lg mr-10">Choose Questions:</label>
            <div className="w-3/4 flex justify-between flex-wrap gap-y-10">
              {formQuestions.map((questions, index) => 
              <button type="button" id={`questions${index}`} onClick={handleClick} title={index} key={index} className="flex flex-col bg-white px-6 py-4 rounded-xl shadow-xl width-48">
                {questions.map((question) => 
                <h1 title={index} key={question} className="py-4 text-center w-full">{question}</h1>)}
              </button>)}
            </div>
          </div>
          <button id='submit' disabled type="submit" className='font-bold text-amber-100 text-xl bg-cyan-900 rounded-xl px-8 py-2 self-center'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}

const addDBData = async (formData) => {
  await addDoc(collection(db, 'scholarships'), {
    ...formData,
    createdAt: serverTimestamp(),
    applicants: []
  }).then((docRef) => {
    updateDoc(docRef, {
      id: docRef.id
    })
  })
}
