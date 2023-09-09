import Link from "next/link"

export default function Admin() {

  return(
    <div className="bg-blue-200 p-10 flex gap-10">
      <div className="bg-red-900 text-white flex flex-col p-4">
        <Link href='/admin/scholarships' className="font text-xl font-bold mb-4">Manage Scholarships</Link>
        <Link href='/admin/scholarships/new'>New scholarship</Link>
        <Link href='/admin/scholarships/delete'>Delete scholarship</Link>
      </div>
      <div className="bg-red-900 text-white flex flex-col p-4">
        <Link href='/admin/applications' className="font text-xl font-bold mb-4">Applications</Link>
        <Link href='/admin/applications'>View applications</Link>
      </div>
    </div>
  )
}





