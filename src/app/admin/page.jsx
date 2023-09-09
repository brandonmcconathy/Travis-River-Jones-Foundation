import Link from "next/link"

export default function Admin() {

  return(
    <div className="bg-cream p-10 flex gap-10 text-cream">
      <div className="bg-blue flex flex-col p-4 rounded-xl">
        <Link href='/admin/scholarships' className="font text-xl font-bold mb-4">Manage Scholarships</Link>
        <Link href='/admin/scholarships/new' className="mb-1">New scholarship</Link>
        <Link href='/admin/scholarships/delete'>Delete scholarship</Link>
      </div>
      <div className="bg-blue flex flex-col p-4 rounded-xl">
        <Link href='/admin/applications' className="font text-xl font-bold mb-4">Applications</Link>
        <Link href='/admin/applications'>View applications</Link>
      </div>
    </div>
  )
}





