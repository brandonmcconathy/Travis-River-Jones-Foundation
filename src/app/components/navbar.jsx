'use client'

import Link from "next/link"
import { useState } from "react"
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'

export default function Navbar() {

  const navbarItems = ['About', 'Scholarships', 'Recipients', 'Donors', 'Contact', 'Donate']
  const navMenuItems = ['Home', 'About', 'Scholarships', 'Recipients', 'Donors', 'Contact', 'Donate']
  const [navState, setNavState] = useState(false)

  const handleClick = () => {
    const navMenu = document.getElementById('nav-menu')
    if (!navState) {
      navMenu.style.width = '66.66%'
      navMenu.classList.add('nav-change')
    } else {
      navMenu.classList.remove('nav-change')
      navMenu.style.width = '0'
    }
    setNavState(!navState)
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
      <nav className={'hidden lg:flex bg-amber-100 items-center justify-between font-semibold h-20 px-16'}>
        <h1 className="text-2xl text-center">
          <Link href="/">Travis River Jones Foundation</Link>
        </h1>
        <ul className="flex gap-8 text-lg">
          {navbarItems.map((item) => <NavbarItem item={item} key={item} />)}
        </ul>
      </nav>
      <nav className="bg-amber-100 h-12 flex items-center justify-between px-5 lg:hidden">
        <GiHamburgerMenu onClick={handleClick} style={{fontSize: '1.4rem'}} />
        <Link href="/" className="text-xl font-bold text-center">Travis River Jones Foundation</Link>
        <h1 className="invisible"></h1>
        <div id='nav-menu' className="fixed z-10 top-0 left-0 h-full w-0 bg-red-theme text-white flex flex-col duration-500 overflow-x-hidden">
          <AiOutlineClose onClick={handleClick} style={{color: 'white', fontSize: '1.6rem', alignSelf: 'end', marginRight: '1rem', marginTop: '1rem'}} />
          <ul className="flex flex-col just-center items-center text-xl text-center mt-16">
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
      <Link href={`/${item.toLowerCase()}`}>{item}</Link>
    </li>
  )
}

