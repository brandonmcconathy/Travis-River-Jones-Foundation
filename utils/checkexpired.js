export default function checkExpired(timeExpired) {
  const currTime = new Date()
  const newExpiration = new Date(timeExpired)

  const difference = new Date((newExpiration - currTime))

  if (difference < 0) {
    return 1
  } else {
    return 0
  }
}