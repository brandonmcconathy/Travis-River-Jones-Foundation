'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from "../../../../../lib/firebase"

export default function NewRecipient() {

  const [recipientData, setRecipientData] = useState({name: '', scholarship: '', year: '', school: '', image: ''})
  const [imageUpload, setImageUpload] = useState(null)
  const router = useRouter()

  const handleChange = (event) => {
    const { name, value } = event.target
    setRecipientData((prevFormData) => ({...prevFormData, [name]: value}))
  }

  const handleImgChange = (event) => {
    setImageUpload(event.target.files[0])
  }

  const addDBData = async () => {
    let recipientRef = ''
    await addDoc(collection(db, 'recipients'), {
      ...recipientData,
      createdAt: serverTimestamp(),
    }).then((docRef) => {
      recipientRef = docRef
      updateDoc(docRef, {
        id: docRef.id
      })
    })

    if (imageUpload) {
      const storageRef = ref(storage, `recipients/${recipientData.name}`)
      await uploadBytes(storageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          updateDoc(recipientRef, {
            image: downloadURL
          })
        })
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData()
    alert('New recipient added')
    router.push('/admin/recipients')
  }

  return(
    <div className="bg-amber-100 p-10">
      <h1 className="text-lg font-bold mb-6">Add new recipient:</h1>
      <div className="flex justify-around">
        <form autoComplete='off' onSubmit={handleSubmit} className="flex flex-col items-left w-1/2">
          <div className="mb-10 flex justify-between items-center">
            <label htmlFor="name" className="font-bold text-lg mr-10">Name:</label>
            <input type="text" name='name' id='name' value={recipientData.name} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
          </div>
          <div className="mb-10 flex justify-between items-center">
            <label htmlFor="scholarship" className="font-bold text-lg mr-10">Scholarship:</label>
            <input type="text" name='scholarship' id='scholarship' value={recipientData.scholarship} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
          </div>
          <div className="mb-10 flex justify-between items-center">
            <label htmlFor="year" className="font-bold text-lg mr-10">Year:</label>
            <input type="text" name='year' id='year' value={recipientData.year} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
          </div>
          <div className="mb-10 flex justify-between items-center">
            <label htmlFor="school" className="font-bold text-lg mr-10">School: <span className="text-gray-700 text-sm">(optional)</span></label>
            <input type="text" name='school' id='school' value={recipientData.school} onChange={handleChange}
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
          </div>
          <div className="mb-10 flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg mr-10">Upload Image:</h1>
              <h2 className="text-gray-700 text-sm">(optional)</h2>
              <h2 className="text-gray-700 text-sm">(Only upload square photos)</h2>
            </div>
            <input type="file" name="image" id="image" onChange={handleImgChange} className='w-3/4'></input>
          </div>
          <button id='submit' type="submit" className='font-bold text-amber-100 text-xl bg-cyan-900 rounded-xl px-8 py-2 self-center'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}