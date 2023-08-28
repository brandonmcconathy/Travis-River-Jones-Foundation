'use client'

import AdminNavbar from "./adminnavbar"
import Unauthorized from "../components/unauthorized";
import GoogleSignIn from "../components/googlesignin";
import { useContext } from "react";
import { AuthContext } from "../../../lib/context";
import { adminKeys } from "../../../lib/firebase.config";

export default function AdminLayout({ children }) {
  
  const user = useContext(AuthContext)

  if (!user) {
    return <GoogleSignIn />
  } else if (adminKeys.includes(user.uid)) {
    return(
      <>
        <AdminNavbar />
        {children}
      </>
    )
  } else {
    return <Unauthorized />
  }
}