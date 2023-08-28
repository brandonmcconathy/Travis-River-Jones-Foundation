import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function GoogleSignIn() {

  const provider = new GoogleAuthProvider()

  const handleClick = () => {
    signInWithPopup(auth, provider)
    .catch((error) => {
      
    })
  }

  return(
    <button onClick={handleClick}>Sign in with Google</button>
  )
}