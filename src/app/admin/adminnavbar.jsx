import Link from "next/link"

export default function AdminNavbar() {

  const navbarItems = ['Scholarships', 'Posts', 'Contact', 'Admin']

  return(
    <div className="flex items-center justify-between bg-slate-300 text-slate-800 font-bold h-20 px-16">
      <h1 className="text-2xl">
        <Link href="/admin">Admin</Link>
      </h1>
      <ul className="flex gap-8 text-lg">
        {navbarItems.map((item, index) => <NavbarItem item={item} key={index} />)}
      </ul>
    </div>
  )
}

function NavbarItem({item}) {
  return(
    <li>
      <Link href={`/admin/${item.toLowerCase()}`}>{`${item}`}</Link>
    </li>
  )
}