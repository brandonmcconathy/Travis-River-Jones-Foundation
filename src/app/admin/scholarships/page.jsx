import Link from "next/link";


export default function AdminScholarships() {

  return(
    <div className="bg-cream py-5 px-10">
      <h1 className="font-bold text-xl">Manage Scholarships:</h1>
      <div className="flex gap-10 mt-5">
        <Link href='/admin/scholarships/new' className="bg-cyan-900 text-cream px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Add new scholarship</Link>
        <Link href='/admin/scholarships/delete' className="bg-cyan-900 text-cream px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Delete scholarship</Link>
      </div>
    </div>
  )
}