'use client'

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../../lib/firebase"
import {Form1} from "./forms"

export default function Page({params}) {

  const [questionForm, setQuestionForm] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDBData = async () => {
      const docSnap = await getDoc(doc(db, 'scholarships', params.id))

      setQuestionForm(docSnap.data().questionForm)
      setLoading(false)
    }
    getDBData()
  }, [])

  if (loading) {
    return(<h1>Loading...</h1>)
  } else {
    if (questionForm == 1) {
      return(<Form1 pageId={params.id}/>)
    }
  }
}