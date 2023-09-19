'use client'

import { useState } from "react"
import Link from "next/link"
import SignOut from "../components/signout"
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'

export default function AdminNavbar() {

  const navbarItems = ['Scholarships', 'Applications', 'Recipients', 'Emails']
  const navMenuItems = ['Home', 'Scholarships', 'Applications', 'Recipients', 'Emails']
  const [adminNavState, setAdminNavState] = useState(false)

  const handleClick = () => {
    const navMenu = document.getElementById('admin-nav-menu')
    if (!adminNavState) {
      navMenu.style.width = '66.66%'
      navMenu.classList.add('nav-change')
    } else {
      navMenu.classList.remove('nav-change')
      navMenu.style.width = '0'
    }
    setAdminNavState(!adminNavState)
  }

  function NavMenuDisplay({item}) {
    if (item == 'Home') {
      return(
        <li className="w-full px-5">
          <Link href='/' onClick={handleClick} className="px-4 py-3">{item}</Link>
          <hr className="my-4"></hr>
        </li>
      )
    }
    return(
      <li className="w-full px-5">
        <Link href={`/${item.toLowerCase()}`} onClick={handleClick} className="px-4 py-3">{item}</Link>
        <hr className="my-4"></hr>
      </li>
    )
  }

  return(
    <>
      <nav className='hidden lg:flex bg-cyan-900 items-center justify-between text-white font-semibold h-20 px-16'>
        <h1 className="text-2xl">
          <Link href="/admin">Admin</Link>
        </h1>
        <ul className="flex gap-8 text-lg">
          {navbarItems.map((item) => <NavbarItem item={item} key={item} />)}
        </ul>
      </nav>
      <nav className="bg-cyan-900 h-12 flex items-center justify-between px-5 text-white lg:hidden">
        <GiHamburgerMenu onClick={handleClick} style={{fontSize: '1.4rem'}} />
        <Link href="/admin" className="text-xl font-bold">Admin</Link>
        <h1 className="invisible"></h1>
        <div id='admin-nav-menu' className="fixed z-10 top-0 left-0 h-full w-0 bg-red-theme text-white flex flex-col duration-500 overflow-x-hidden">
          <AiOutlineClose onClick={handleClick} style={{color: 'white', fontSize: '1.6rem', alignSelf: 'end', marginRight: '1rem', marginTop: '1rem'}} />
          <h1 className="text-center text-3xl mt-6">Admin</h1>
          <ul className="flex flex-col just-center items-center text-xl text-center mt-12">
            {navMenuItems.map((item, index) => <NavMenuDisplay item={item} handleClick={handleClick} key={index}/>)}
          </ul>
        </div>
      </nav>
    </>
  )
}


function NavbarItem({item}) {
  return(
    <li>
      <Link href={`/admin/${item.toLowerCase()}`}>{item}</Link>
    </li>
  )
}