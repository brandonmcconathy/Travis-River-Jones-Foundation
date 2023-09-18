'use client'

import Link from "next/link"
import { useState } from "react"
import { lora } from "../../../utils/fonts"
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'

export default function Navbar() {

  const navbarItems = ['About', 'Scholarships', 'Recipients', 'Contact', 'Donate']
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

  return(
    <>
      <nav className={`${lora.className} hidden lg:bg-amber-100 lg:flex lg:items-center lg:justify-between lg:text-black lg:font-semibold lg:h-20 lg:px-16`}>
        <h1 className="text-2xl">
          <Link href="/">Travis River Jones Foundation</Link>
        </h1>
        <ul className="flex gap-8 text-lg">
          {navbarItems.map((item) => <NavbarItem item={item} key={item} />)}
        </ul>
      </nav>
      <nav className="bg-amber-100 h-12 flex items-center justify-between px-5">
        <GiHamburgerMenu onClick={handleClick} style={{fontSize: '1.4rem'}} />
        <h1 className="text-xl font-bold">Travis River Jones Foundation</h1>
        <h1 className="invisible"></h1>
        <div id='nav-menu' className="fixed z-10 top-0 left-0 h-full w-0 bg-red-theme text-white flex flex-col duration-500 overflow-x-hidden">
          <AiOutlineClose onClick={handleClick} style={{color: 'white', fontSize: '1.6rem', alignSelf: 'end', marginRight: '1rem', marginTop: '1rem'}} />
          <ul className="flex flex-col just-center items-center text-xl text-center mt-16">
            {navbarItems.map((item, index) => <NavMenuItems item={item} key={index}/>)}
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

function NavMenuItems({item}) {
  return(
    <li className="w-full px-5">
      <Link href={`/${item.toLowerCase()}`} className="px-4 py-3">{item}</Link>
      <hr className="my-4"></hr>
    </li>
  )
}