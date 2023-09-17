export default function timer(timeExpired) {
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
  return timeRemaining
}