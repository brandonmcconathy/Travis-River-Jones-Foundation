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
    <div className="bg-amber-100 py-10 px-2">
      {scholarshipData.length !== 0 ? 
        <DisplayData scholarshipData={scholarshipData}/> : 
        <div className="text-center">
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
      <h1 className="font-bold text-2xl text-center mb-10">Currently viewing: <span className="underline">{title}</span></h1>
      <div>
        {applicants.length !== 0 ?
          applicants.map((applicant, index) => <ApplicantDisplay applicantData={applicant} questions={scholarshipData.questions} key={index}/>) :
          <h1 className="font-bold text-xl text-center mt-20">No applicants</h1>}
      </div>
    </div>
  )
}

const ApplicantDisplay = ({applicantData, questions}) => {

  const {name, email, number, answers} = applicantData

  return(
    <div className="bg-white w-[97] m-auto flex flex-col px-4 py-4 rounded-2xl box-pop mt-6 sm:w-11/12 md:w-5/6 lg:px-8 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
      <h1 className="font-bold text-2xl mb-1 text-center">{name}</h1>
      <h3 className="text-gray-500 text-sm text-center sm:mb-2">{`${email} | ${number}`}</h3>
      <div>
        {questions.map((question, index) => 
        <div key={question}>
          <h1 className="mt-6 mb-1 text-gray-500 text-sm">{question}</h1>
          <h1 className="mx-2 lg:text-lg">{answers[index]}</h1>
        </div>)}
      </div>
    </div>
  )
}