'use client'

import { useState } from "react"
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from "../../../../../lib/firebase"
import { formQuestions }  from "../../../../../lib/formquestions"

export default function NewScholarship() {

  const [scholarshipData, setScholarshipData] = useState({title: '', description: '', timeExpired: '', questions: [], applicants: []})

  const handleChange = (event) => {
    const { name, value } = event.target
    setScholarshipData( (prevFormData) => ({ ...prevFormData, [name]: value}))
  }

  const handleClick = (event) => {
    console.log(event)
    const { name, value } = event.target
    console.log(name)
    setScholarshipData( (prevFormData) => ({ ...prevFormData, [name]: value}))
    console.log(scholarshipData)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData(scholarshipData)
    setScholarshipData({title: '', description: '', timeExpired: '', questions: [], applicants: []})
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
          <textarea rows='4' cols='50' name='description' id='description' value={scholarshipData.description} onChange={handleChange} required
          className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></textarea>
        </div>
        <div className="mb-10 flex justify-between items-center">
          <label htmlFor="timeExpired" className="font-bold text-lg mr-10">Expiration Time:</label>
          <input type="datetime-local" name='timeExpired' id='timeExpired' value={scholarshipData.timeExpired} onChange={handleChange} required
          className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
        </div>
        <div className="mb-10 flex justify-between items-center">
          <label className="font-bold text-lg mr-10">Choose Questions:</label>
          <div className="w-3/4">
            {/* {formQuestions.map((questions) => <QuestionsDisplay questions={questions} key={questions[0]}/>)} */}
            {formQuestions.map((questions) => <button type="button" onClick={handleClick} name="questions" value={questions} className="flex flex-col bg-white px-6 py-4 rounded-xl shadow-xl w-1/2">{questions.map((question) => <h1>{question}</h1>)}</button>)}
          </div>
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

const QuestionsDisplay = ({questions}) => {

  return(
    <button type="button" name="questions" value={questions} className="flex flex-col bg-white px-6 py-4 rounded-xl shadow-xl w-1/2">
      {questions.map((question) => <h1 className="text-sm mb-2">{question}</h1>)}
    </button>
  )
}