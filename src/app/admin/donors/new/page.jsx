'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from "../../../../../lib/firebase"

export default function NewDonor() {

  const [donorData, setDonorData] = useState({name: '', scholarship: '', year: '', school: '', image: ''})
  const [imageUpload, setImageUpload] = useState(null)
  const router = useRouter()

  const handleChange = (event) => {
    const { name, value } = event.target
    setDonorData((prevFormData) => ({...prevFormData, [name]: value}))
  }

  const handleImgChange = (event) => {
    setImageUpload(event.target.files[0])
  }

  const addDBData = async () => {
    let donorRef = ''
    await addDoc(collection(db, 'donors'), {
      ...donorData,
      createdAt: serverTimestamp(),
    }).then((docRef) => {
      donorRef = docRef
      updateDoc(docRef, {
        id: docRef.id
      })
    })

    if (imageUpload) {
      const storageRef = ref(storage, `donors/${donorData.name}`)
      await uploadBytes(storageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          updateDoc(donorRef, {
            image: downloadURL
          })
        })
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addDBData()
    alert('New donor added')
    router.push('/admin/donors')
  }

  return(
    <div className="bg-amber-100 py-10 px-2">
      <h1 className="font-bold text-2xl text-center mb-10">Add new donor</h1>
      <div className="mx-auto sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3">
        <form autoComplete='off' onSubmit={handleSubmit} className="flex flex-col">
          <div className="mb-10 flex flex-col">
            <label htmlFor="name" className="font-bold text-lg">Name:</label>
            <input type="text" name='name' id='name' value={donorData.name} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-10 flex flex-col">
            <label htmlFor="scholarship" className="font-bold text-lg">Scholarship:</label>
            <input type="text" name='scholarship' id='scholarship' value={donorData.scholarship} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-10 flex flex-col">
            <label htmlFor="year" className="font-bold text-lg">Year:</label>
            <input type="text" name='year' id='year' value={donorData.year} onChange={handleChange} required
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-10 flex flex-col">
            <label htmlFor="school" className="font-bold text-lg">School: <span className="text-gray-700 text-sm">(optional)</span></label>
            <input type="text" name='school' id='school' value={donorData.school} onChange={handleChange}
            className="outline-none rounded-xl px-4 py-2 shadow-xl focus:ring focus:ring-gray-300 transition duration-300"></input>
          </div>
          <div className="mb-10 flex flex-col">
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">Upload Image: <span className="text-gray-700 text-sm">(optional) (only square photos)</span></h1>
            </div>
            <input type="file" name="image" id="image" onChange={handleImgChange} className='mt-2'></input>
          </div>
          <button id='submit' type="submit" className='font-bold text-amber-100 text-xl bg-cyan-900 rounded-xl px-8 py-2 self-center hover:bg-cyan-600 hover:text-amber-200 transition duration-300'>SUBMIT</button>
        </form>
      </div>
    </div>
  )
}