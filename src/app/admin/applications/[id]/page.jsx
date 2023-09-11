'use client'

import { useState, useEffect } from "react"
import { app, db } from "../../../../../lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export default function Page({params}) {

  let [scholarshipData, setScholarshipData] = useState({})

  useEffect(() => {
    const getDBData = async () => {
      const docSnap = await getDoc(doc(db, 'scholarships', params.id))

      setScholarshipData(docSnap.data())
    }

    getDBData()
  }, [])


  return(
    <div className="bg-cream py-5 px-10">
      {scholarshipData.length !== 0 ? 
        <DisplayData scholarshipData={scholarshipData}/> : 
        <div>
          <h1 className="font-bold text-lg mb-1">No scholarship data.</h1>
          <h2 className="text-sm text-gray-700">(Allow some time for data to load)</h2>
        </div>}
    </div>
  )
}

const DisplayData = ({scholarshipData}) => {

  const {title} = scholarshipData
  let {applicants} = scholarshipData

  if (applicants == undefined) {
    applicants = []
  }

  return(
    <div>
      <h1 className="font-bold text-xl mb-10">Currently viewing: <span className="underline">{title}</span></h1>
      <div className="flex flex-wrap gap-y-10">
        {applicants.length !== 0 ?
          applicants.map((applicant) => <ApplicantDisplay applicantData={applicant} questions={scholarshipData.questions} key={applicant.name}/>) :
          <h1 className="ml-10 font-bold text-lg">No applicants</h1>}
      </div>
    </div>
  )
}

const ApplicantDisplay = ({applicantData, questions}) => {

  const {name, email, number, answers} = applicantData

  return(
    <div className="bg-white w-3/4 m-auto flex flex-col px-8 py-4 rounded-2xl">
      <h1 className="font-bold text-2xl mb-1">{name}</h1>
      <h3 className="text-gray-500 text-sm mb-3">{`${email} | ${number}`}</h3>
      <div>
        {questions.map((question, index) => 
        <div key={question}>
          <h1 className="mt-6 mb-1 text-gray-500 text-sm">{question}</h1>
          <h1 className="ml-4 text-lg">{answers[index]}</h1>
        </div>)}
      </div>
    </div>
  )
}