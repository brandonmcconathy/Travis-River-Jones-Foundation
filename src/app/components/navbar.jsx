import Link from "next/link"

export default function Navbar() {

  const navbarItems = ['Form', 'Scholarships', 'Contact', 'Admin']

  return(
    <nav className="flex items-center justify-between bg-gray-400 text-black font-bold h-20 px-16">
      <h1 className="text-2xl">
        <Link href="/">Title</Link>
      </h1>
      <ul className="flex gap-8 text-lg">
        {navbarItems.map((item) => <NavbarItem item={item} key={item} />)}
      </ul>
    </nav>
    
  )
}

function NavbarItem({item}) {
  return(
    <li>
      <Link href={`/${item.toLowerCase()}`}>{item}</Link>
    </li>
  )
}