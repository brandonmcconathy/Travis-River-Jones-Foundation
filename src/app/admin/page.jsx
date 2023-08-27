'use client'

import AdminPanel from "./adminpanel"
import GoogleSignIn from "./googlesignin";
import { useContext } from "react";
import { AuthContext } from "../../../lib/context";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";


export default function Admin() {

  const user = useContext(AuthContext)

  const handleLogout = async () => {
    signOut(auth)
  }

  if (!user) {
    return <GoogleSignIn />
  } else if (user.uid == 'rjZZ5Hw7peT3yIu5LJgDwjovCR73') {
    return <AdminPanel />
  } else {
    return(
      <div>
        <h1>You do not have permission to access this page</h1>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    )
  }
}





