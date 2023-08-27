'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../../../lib/firebase'

function Form() {

  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '', email: '', number: '', message1: '', message2: '', message3: '', message4: '', image: ''
  })
  const [imageUpload, setImageUpload] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData( (prevFormData) => ({ ...prevFormData, [name]: value}))
  }

  const handleImgChange = (event) => {
    setImageUpload(event.target.files[0])
  }

  const uploadImage = () => {
    const storageRef = ref(storage, 'new-img')
    uploadBytes(storageRef, imageUpload).then(() => {
      alert('image uploaded')
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    uploadImg(formData.image)
    addDBData(formData)
    // setFormData({name: '', email: '', number: '', message1: '', message2: '', message3: '', message4: '', image: ''})
    // router.push('/')
    alert('Submitted')
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
          <input type="text" name='message1' value={formData.message1} onChange={handleChange} required className='text-black'></input>
        </div>
        <div>
          <label>Why do you want to be an EMT?</label>
          <textarea rows='4' cols='50' name='message2' value={formData.message2} onChange={handleChange} required className='text-black'></textarea>
        </div>
        <div>
          <label>How would this scholarship benefit you?</label>
          <textarea rows='4' cols='50' name='message3' value={formData.message3} onChange={handleChange} required className='text-black'></textarea>
        </div>
        <div>
          <label>Tell us about you last act of kindness or an incident where you helped someone when you didn't need to.</label>
          <textarea rows='4' cols='50' name='message4' value={formData.message4} onChange={handleChange} required className='text-black'></textarea>
        </div>
        <div>
          <label>Upload a file:</label>
          <input type='file' name='image' onChange={handleImgChange} className='mb-20'></input>
        </div>
        <button onClick={uploadImage}>Upload image</button>
        <button type="submit" className='mt-20 ml-20'>SUBMIT</button>
      </form>
    </div>
    
  )
}

export default Form

const addDBData = async (formData) => {
  await addDoc(collection(db, 'posts'), {
    ...formData,
    time: serverTimestamp()
  })
}

const uploadImg = (image) => {
  const storageRef = ref(storage, 'new-img')
  uploadBytes(storageRef, image).then( (snapshot) => {
    console.log("uploaded file")
  })
}