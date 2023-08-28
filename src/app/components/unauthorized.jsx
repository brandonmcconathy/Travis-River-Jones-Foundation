import SignOut from "./signout"


export default function Unauthorized() {

  return(
    <>
      <h1>You do not have permission to view this page.</h1>
      <SignOut />
    </>
  )
}