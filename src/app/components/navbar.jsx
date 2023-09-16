import Link from "next/link"
import { lora } from "../../../utils/fonts"

export default function Navbar() {

  const navbarItems = ['About', 'Scholarships', 'Contact', 'Donate']

  return(
    <nav className={`${lora.className} flex items-center justify-between text-white font-semibold h-20 px-16 border-b border-white`}>
      <h1 className="text-2xl">
        <Link href="/">Travis River Jones Foundation</Link>
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