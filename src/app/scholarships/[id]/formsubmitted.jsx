import Link from "next/link"

export default function FormSubmitted() {
  return(
    <>
      <div className="text-center text-white mt-16 text-2xl mb-10">
        <h1 className="mb-4">Your application has been submitted</h1>
        <h1>Thank you for applying</h1>
        <p className="mt-10 text-lg">Feel free to send an email to travisriverjonesfoundation@gmail.com to confirm we have recieved your application.</p>
      </div>
      <div className="text-center text-lg flex flex-col gap-5">
        <Link href='/scholarships' className="mx-auto bg-amber-100 px-4 py-2 rounded-xl font-semibold box-pop hover:bg-amber-50 hover:text-gray-800 transition duration-300">View more scholarships</Link>
        <Link href='/recipients' className="mx-auto bg-amber-100 px-4 py-2 rounded-xl font-semibold box-pop hover:bg-amber-50 hover:text-gray-800 transition duration-300">View past recipients</Link>
        <Link href='/' className="mx-auto bg-amber-100 px-4 py-2 rounded-xl font-semibold box-pop hover:bg-amber-50 hover:text-gray-800 transition duration-300">Home</Link>
      </div>
    </>
  )
}