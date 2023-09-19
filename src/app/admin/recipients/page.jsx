import Link from "next/link";

export default function Applicants() {

  return(
    <div className="bg-amber-100 py-10 px-10">
      <h1 className="font-bold text-2xl text-center mb-10">Manage Recipients</h1>
      <div className="flex gap-10 flex-wrap justify-center">
        <Link href='/admin/recipients/new' className="bg-cyan-900 text-amber-100 px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Add new recipient</Link>
        <Link href='/admin/recipients/view' className="bg-cyan-900 text-amber-100 px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">View recipients</Link>
        <Link href='/admin/recipients/delete' className="bg-cyan-900 text-amber-100 px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Delete recipient</Link>
      </div>
    </div>
  )
}