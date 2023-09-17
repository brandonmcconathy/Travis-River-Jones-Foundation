import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";


export default function Unauthorized() {

  const handleLogout = async () => {
    await signOut(auth)
  }

  return(
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-amber-100 font-bold mb-5">You do not have permission to view this page.</h1>
      <button onClick={handleLogout} className="bg-amber-100 px-3 py-1 rounded-lg font-bold">Sign Out</button>
    </div>
  )
}