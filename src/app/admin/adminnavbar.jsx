import Link from "next/link"
import { signOut } from "firebase/auth"
import { auth } from "../../../lib/firebase"
import SignOut from "../components/signout"

export default function AdminNavbar() {

  const navbarItems = ['Scholarships', 'Applications']

  return(
    <div className="flex items-center justify-between bg-gray-400 text-slate-800 font-bold h-20 px-16">
      <h1 className="text-2xl">
        <Link href="/admin">Admin</Link>
      </h1>
      <ul className="flex gap-8 text-lg">
        {navbarItems.map((item, index) => <NavbarItem item={item} key={index} />)}
        <li>
          <SignOut />
        </li>
      </ul>
    </div>
  )
}

function NavbarItem({item}) {
  return(
    <li>
      <Link href={`/admin/${item.toLowerCase()}`}>{item}</Link>
    </li>
  )
}