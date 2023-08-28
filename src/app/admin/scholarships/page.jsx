'use client'

import { useContext } from "react";
import { AuthContext } from "../../../../lib/context";
import { auth } from "../../../../lib/firebase";
import { adminKeys } from "../../../../lib/firebase.config";
import Link from "next/link";
import AdminScholarships from "./adminscholarships";


export default function ScholarshipsPage() {

  const user = useContext(AuthContext)

  if (!user) {
    return(
      <>
        <h1>You do not have permission to access this page</h1>
        <Link href='/'>Home</Link>
      </>
    )
  } else if (adminKeys.includes(user.uid)) {
    return <AdminScholarships />
  } else {
    return(
      <>
        <h1>You do not have permission to access this page</h1>
        <Link href='/'>Home</Link>
      </>
    )
  }
}