

import Timer from "./timer"
import Link from "next/link"

export default function ScholarshipDisplay({scholarshipData}) {

  const {title, description} = scholarshipData

  return(
    <Link href={{
      pathname: `/scholarships/${scholarshipData.id}`,
      query: scholarshipData
      }}>
      <div className="bg-white m-10 p-4">
        <h1>{title}</h1>
        <h1>{description}</h1>
        <Timer scholarshipData={scholarshipData}/>      
      </div>
    </Link>
  )
}