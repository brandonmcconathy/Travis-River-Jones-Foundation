import Link from "next/link"

export default function Admin() {

  return(
    <div className="bg-cream p-10 flex gap-10 text-cream">
      <div className="flex bg-cyan-900 flex-col px-4 py-2 rounded-xl">
        <Link href='/admin/scholarships' className="font text-xl font-bold mb-4 hover:text-amber-300">Manage Scholarships</Link>
        <Link href='/admin/scholarships/new' className="mb-1 hover:text-amber-300">New scholarship</Link>
        <Link href='/admin/scholarships/delete' className="hover:text-amber-300">Delete scholarship</Link>
      </div>
      <div className="bg-cyan-900 flex flex-col px-4 py-2 rounded-xl">
        <Link href='/admin/applications' className="font text-xl font-bold mb-4 hover:text-amber-300">Applications</Link>
        <Link href='/admin/applications' className="hover:text-amber-300">View applications</Link>
      </div>
    </div>
  )
}
