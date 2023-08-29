import Timer from "./timer"

export default function ScholarshipDisplay({scholarshipData}) {

  const {title, description, expiration} = scholarshipData

  const currTime = new Date()
  const newExpiration = new Date(expiration)

  const difference = new Date((newExpiration - currTime))

  let timeRemaining = {}
  if (difference > 0) {
    timeRemaining = {
      days: Math.floor(difference / (1000*60*60*24)),
      hours:  Math.floor((difference / (1000*60*60)) % 24)
    }
  }

  return(
    <div className="bg-white m-10 p-4">
      <h1>{title}</h1>
      <h1>{description}</h1>
      <Timer scholarshipData={scholarshipData}/>      
    </div>
  )
}