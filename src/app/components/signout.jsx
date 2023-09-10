import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin')
  }

  return(
    <button onClick={handleLogout}>Sign Out</button>
  )
}