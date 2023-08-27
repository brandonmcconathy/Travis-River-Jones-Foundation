'use client'

import { AuthContext } from "../../lib/context"
import { useState, useEffect } from "react"
import { auth } from "../../lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export function Providers({ children }) {

  const [user, setUser] = useState(null)

  useEffect( () => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [])

  return(
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  )
}