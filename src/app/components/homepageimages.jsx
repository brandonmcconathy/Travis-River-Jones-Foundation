'use client'

import Image from "next/image"
import { useState, useEffect } from "react"

export default function HomepageImages() {

  const [image, setImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      let nextImage = (image + 1) % 11
      document.getElementById(`homepage-${image}`).style.display = 'none'
      document.getElementById(`homepage-${nextImage}`).style.display = 'block'
      document.getElementById(`homepage-${image}`).classList.remove('gallery-fade')
      document.getElementById(`homepage-${nextImage}`).classList.add('gallery-fade')
      
      setImage((image) => {
        return (image + 1) % 11
      })
    }, 5000)
    return () => clearInterval(interval)
  },[image])

  return(
    <section className="mt-10">
      <div className="relative flex justify-center items-center picture-height w-auto mx-2">
        <Image id="homepage-0" src={'/assets/homepage-0.jpg'} alt={'homepage-0'} width={750} height={500} priority className="rounded-xl box-pop" />
        <Image id="homepage-1" src={'/assets/homepage-1.jpg'} alt={'homepage-1'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-2" src={'/assets/homepage-2.jpg'} alt={'homepage-2'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-3" src={'/assets/homepage-3.jpg'} alt={'homepage-3'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-4" src={'/assets/homepage-4.jpg'} alt={'homepage-4'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-5" src={'/assets/homepage-5.jpg'} alt={'homepage-5'} width={667} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-6" src={'/assets/homepage-6.jpg'} alt={'homepage-6'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-7" src={'/assets/homepage-7.jpg'} alt={'homepage-7'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-8" src={'/assets/homepage-8.jpg'} alt={'homepage-8'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-9" src={'/assets/homepage-9.jpg'} alt={'homepage-9'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
        <Image id="homepage-10" src={'/assets/homepage-10.jpg'} alt={'homepage-10'} width={375} height={500} priority className="hidden rounded-xl box-pop" />
      </div>
    </section>
  )
}