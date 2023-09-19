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
    <div className="bg-amber-100 py-10 px-4">
      <h1 className="font-bold text-2xl text-center mb-10">Add new scholarship</h1>
      <div className="mx-auto sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3">
        <form autoComplete='off' onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-10 flex flex-col">
            <label htmlFor="title" className="font-bold text-lg">Title:</label>
            <input type="text" name='title' id='title' value={scholarshipData.title} onChange={handleChange} required 
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-10 flex flex-col">
            <label htmlFor="description" className="font-bold text-lg">Description:</label>
            <textarea rows='4' name='description' id='description' value={scholarshipData.description} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></textarea>
          </div>
          <div className="mb-10 flex flex-col">
            <label htmlFor="timeExpired" className="font-bold text-lg">Expiration Time:</label>
            <input type="datetime-local" name='timeExpired' id='timeExpired' value={scholarshipData.timeExpired} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-14 flex flex-col">
            <label className="font-bold text-lg">Choose Questions:</label>
            <div className="flex justify-between flex-wrap gap-y-10">
              {formQuestions.map((questions, index) => 
              <button type="button" id={`questions${index}`} onClick={handleClick} title={index} key={index} className="flex flex-col flex-wrap bg-white px-5 py-4 rounded-xl shadow-xl transition duration-300">
                {questions.map((question) => 
                <h1 title={index} key={question} className="py-3 text-center">{question}</h1>)}
              </button>)}
            </div>
          </div>
          <button id='submit' disabled type="submit" className='font-bold text-amber-100 text-xl bg-cyan-900 rounded-xl px-8 py-2 self-center hover:bg-cyan-600 hover:text-amber-200 transition duration-300'>SUBMIT</button>
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
