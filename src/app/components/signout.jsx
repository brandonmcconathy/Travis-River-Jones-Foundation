import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export default function SignOut() {
  
  const handleLogout = async () => {
    await signOut(auth)
  }

  return(
    <button onClick={handleLogout}>Sign Out</button>
  )
}