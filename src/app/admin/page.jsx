import Link from "next/link"

export default function Admin() {

  return(
    <>
      <div className="bg-amber-100 flex py-10 px-4 gap-8 text-amber-100 flex-wrap justify-center text-center">
        <div className="flex bg-cyan-900 flex-col px-6 py-4 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <Link href='/admin/scholarships' className="text-2xl font-bold mb-4 hover:text-amber-300 transition duration-300">Manage Scholarships</Link>
          <Link href='/admin/scholarships/new' className="text-lg mb-1 hover:text-amber-300 transition duration-300">New scholarship</Link>
          <Link href='/admin/scholarships/view' className="text-lg mb-1 hover:text-amber-300 transition duration-300">View scholarships</Link>
          <Link href='/admin/scholarships/delete' className="text-lg hover:text-amber-300 transition duration-300">Delete scholarship</Link>
        </div>
        <div className="bg-cyan-900 flex flex-col px-6 py-4 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <Link href='/admin/applications' className="text-2xl font-bold mb-4 hover:text-amber-300 transition duration-300">Applications</Link>
          <Link href='/admin/applications' className="text-lg mb-1 hover:text-amber-300 transition duration-300">View applications</Link>
        </div>
        <div className="bg-cyan-900 flex flex-col px-6 py-4 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <Link href='/admin/recipients' className="text-2xl font-bold mb-4 hover:text-amber-300 transition duration-300">Recipients</Link>
          <Link href='/admin/recipients/new' className="text-lg mb-1 hover:text-amber-300 transition duration-300">New recipient</Link>
          <Link href='/admin/recipients/view' className="text-lg mb-1 hover:text-amber-300 transition duration-300">View recipients</Link>
          <Link href='/admin/recipients/delete' className="text-lg mb-1 hover:text-amber-300 transition duration-300">Delete recipients</Link>
        </div>
        <div className="bg-cyan-900 flex flex-col px-6 py-4 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <Link href='/admin/donors' className="text-2xl font-bold mb-4 hover:text-amber-300 transition duration-300">Donors</Link>
          <Link href='/admin/donors/new' className="text-lg mb-1 hover:text-amber-300 transition duration-300">New donor</Link>
          <Link href='/admin/donors/view' className="text-lg mb-1 hover:text-amber-300 transition duration-300">View donors</Link>
          <Link href='/admin/donors/delete' className="text-lg mb-1 hover:text-amber-300 transition duration-300">Delete donors</Link>
        </div>
        <div className="bg-cyan-900 flex flex-col px-6 py-4 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <Link href='/admin/emails' className="text-2xl font-bold mb-4 hover:text-amber-300 transition duration-300">Emails</Link>
          <Link href='/admin/emails' className="text-lg mb-1 hover:text-amber-300 transition duration-300">View email list</Link>
        </div>
      </div>
      <h1 className="text-amber-100 text-center text-xl my-3">Hit me up if you need help with anything! -Brandon</h1>
    </>
  )
}
