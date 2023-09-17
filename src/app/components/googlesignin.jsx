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
    <div className="flex justify-center mt-20">
      <button onClick={handleClick} className="bg-amber-100 px-4 py-2 rounded-lg font-bold">Sign in with Google</button>
    </div>
  )
}