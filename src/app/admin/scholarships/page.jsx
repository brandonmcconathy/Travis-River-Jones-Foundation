import Link from "next/link";

export default function AdminScholarships() {

  return(
    <div className="bg-amber-100 py-5 px-10">
      <h1 className="font-bold text-2xl text-center mb-10">Manage Scholarships</h1>
      <div className="flex gap-10 flex-wrap justify-center">
        <Link href='/admin/scholarships/new' className="bg-cyan-900 text-amber-100 px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Add new scholarship</Link>
        <Link href='/admin/scholarships/view' className="bg-cyan-900 text-amber-100 px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">View scholarships</Link>
        <Link href='/admin/scholarships/delete' className="bg-cyan-900 text-amber-100 px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Delete scholarship</Link>
      </div>
    </div>
  )
}