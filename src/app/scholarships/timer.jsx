

export default function Timer({scholarshipData}) {

  const {timeExpired} = scholarshipData

  const currTime = new Date()
  const newExpiration = new Date(timeExpired)

  const difference = new Date((newExpiration - currTime))

  let timeRemaining = {}
  if (difference > 0) {
    timeRemaining = {
      days: Math.floor(difference / (1000*60*60*24)),
      hours:  Math.floor((difference / (1000*60*60)) % 24)
    }
  }

  if (Object.keys(timeRemaining).length == 0) {
    return <h1>Expired</h1>
  } else {
    return(
      <div>
        <h1>Time Remaining:</h1>
        <h1>Days: {timeRemaining.days} Hours: {timeRemaining.hours}</h1>
      </div>
    )
  }
}