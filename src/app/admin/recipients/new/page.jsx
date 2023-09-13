'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from "../../../../../lib/firebase"

export default function NewRecipient() {

  const [recipientData, setRecipientData] = useState({name: '', image: ''})
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
    console.log('starting upload to db')
    await addDoc(collection(db, 'recipients'), {
      ...recipientData,
      createdAt: serverTimestamp(),
    }).then((docRef) => {
      recipientRef = docRef
      updateDoc(docRef, {
        id: docRef.id
      })
      console.log('db upload complete')
    })

    console.log('started image upload')
    const storageRef = ref(storage, `recipients/${recipientData.name}`)
    await uploadBytes(storageRef, imageUpload).then((snapshot) => {
      console.log("upload comeplete")
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('got URL')
        updateDoc(recipientRef, {
          image: downloadURL
        })
      })
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData()
    alert('New recipient added')
    router.push('/admin/recipients')
  }

  return(
    <div className="bg-cream p-10">
      <h1 className="text-lg font-bold mb-6">Add new recipient:</h1>
      <div className="flex justify-around">
        <form autoComplete='off' onSubmit={handleSubmit} className="flex flex-col items-left w-1/2">
          <div className="mb-10 flex justify-between items-center">
            <label htmlFor="name" className="font-bold text-lg mr-10">Name:</label>
            <input type="text" name='name' id='name' value={recipientData.name} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 w-3/4 shadow-xl focus:ring focus:ring-gray-300"></input>
          </div>
          <div className="mb-10 flex justify-between items-center">
            <h1 className="font-bold text-lg mr-10">Upload Image:</h1>
            <input type="file" name="image" id="image" onChange={handleImgChange} className='w-3/4'></input>
          </div>
          <button id='submit' type="submit" className='font-bold text-cream text-xl bg-cyan-900 rounded-xl px-8 py-2 self-center'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}