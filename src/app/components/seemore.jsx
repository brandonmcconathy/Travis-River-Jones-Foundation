'use client'

import { AiOutlineDown } from "react-icons/ai"

export default function SeeMore() {
  
  const handleScroll = () => {
    document.getElementById('top-div').scrollIntoView({behavior: 'smooth'})
  }
  
  return(
    <div onClick={handleScroll} className="absolute left-1/2 bottom-10 text-2xl flex flex-col items-center homepage-img-text bounce font-semibold opacity-0">
      <p>See more</p>
      <AiOutlineDown />
    </div> 
  )
}