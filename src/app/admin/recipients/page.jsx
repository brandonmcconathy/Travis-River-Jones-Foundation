import Link from "next/link";

export default function Applicants() {

  return(
    <div className="bg-cream py-5 px-10">
      <h1 className="font-bold text-xl">Manage recipients:</h1>
      <div className="flex gap-10 mt-5">
        <Link href='/admin/recipients/new' className="bg-cyan-900 text-cream px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Add new recipient</Link>
        <Link href='/admin/recipients/view' className="bg-cyan-900 text-cream px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">View recipients</Link>
        <Link href='/admin/recipients/delete' className="bg-cyan-900 text-cream px-4 py-2 rounded-lg font-bold text-lg hover:bg-cyan-800 hover:text-amber-200">Delete recipient</Link>
      </div>
    </div>
  )
}