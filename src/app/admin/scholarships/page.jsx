import Link from "next/link";


export default function AdminScholarships() {

  return(
    <div className="bg-blue-200 p-10">
      <h1>Manage Scholarships:</h1>
      <Link href='/admin/scholarships/new' className="font-bold">Add new scholarship</Link>
      <Link href='/admin/scholarships/delete' className="font-bold">Delete scholarship</Link>
    </div>
  )
}