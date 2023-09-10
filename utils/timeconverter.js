export default function timeConverter(unixTime) {
  let time = {
    year: null,
    month: null,
    day: null,
    hour: null,
    min: null,
    sec: null,
  }
  const a = new Date(unixTime * 1000)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  time.year = a.getFullYear()
  time.month = months[a.getMonth()]
  time.day = a.getDate()
  time.hour = a.getHours()
  time.min = a.getMinutes()
  time.sec = a.getSeconds()
  return time
}