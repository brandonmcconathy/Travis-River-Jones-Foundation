
export default function UserDisplay({userData}) {

  const {name, email, number, message1, message2, message3, message4, time} = userData

  return(
    <div className="bg-white m-10 p-4">
      <h1>{name}</h1>
      <h4>{email} | {number}</h4>
      <div>
        <h2>How did you hear about this scholarship?</h2>
        <h3>{message1}</h3>
        <h2>Why do you want to be an EMT?</h2>
        <h3>{message2}</h3>
        <h2>How would this scholarship benefit you?</h2>
        <h3>{message3}</h3>
        <h2>Tell us about you last act of kindness or an incident where you helped someone when you didn't need to.</h2>
        <h3>{message4}</h3>
      </div>
    </div>
  )
}