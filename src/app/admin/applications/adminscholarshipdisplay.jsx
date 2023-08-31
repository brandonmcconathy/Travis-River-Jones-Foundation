import Link from "next/link"

export default function AdminScholarshipDisplay({scholarshipData}) {

  const {title, description, id} = scholarshipData

  return(
    <Link href={{
      pathname: `/admin/applications/${id}`,
      }}>
      <div className="bg-white m-10 p-4">
        <h1>{title}</h1>
        <h1>{description}</h1>
      </div>
    </Link> 
  )
}