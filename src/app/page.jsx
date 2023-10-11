'use client'

import Image from "next/image"
import Link from "next/link"
import SeeMore from "./components/seemore"
import { useState, useEffect } from "react"


export default function Homepage() {

  const [image, setImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      let nextImage = (image + 1) % 7
      document.getElementById(`homepage-${image}`).style.display = 'none'
      document.getElementById(`homepage-${nextImage}`).style.display = 'block'
      document.getElementById(`homepage-${image}`).classList.remove('gallery-fade')
      document.getElementById(`homepage-${nextImage}`).classList.add('gallery-fade')
      
      setImage((image) => {
        return (image + 1) % 7
      })
    }, 5000)
    return () => clearInterval(interval)
  },[image])

  return (
      <div className="-m-4">
        <section className="homepage-img relative select-none text-white">
          <Image src='/assets/hero-large.jpg' alt="hero image" fill priority className="img-fade-in hidden md:block" />
          <Image src='/assets/hero-small.jpg' alt="hero image" fill priority className="img-fade-in md:hidden" />
          <h1 className="opacity-0 text-5xl text-center absolute top-1/4 left-1/2 homepage-img-text fade-in font-semibold">Travis River Jones Foundation</h1>
          <SeeMore />
        </section>
        <div className="flex flex-col my-5 gap-5">
          <Link id='top-div' href="/about" className="bg-amber-100 py-12 px-10 box-pop text-center learn-more section-transition hover:py-24 hover:bg-amber-50">
            <section>
              <h1 className="text-3xl font-semibold mb-2">Our Mission</h1>
              <p className="text-xl mb-12">Empower positive change by promoting kindness, goodwill, and enriching the lives of others through our Kindness and EMT Scholarships.</p>
              <h2 className="opacity-0 text-xl -mb-16 font-semibold text-cyan-800 transition duration-1000">Learn more about us</h2>
            </section>
          </Link>
          <Link href="/scholarships" className="bg-amber-100 py-12 px-10 box-pop text-center learn-more section-transition hover:py-24 hover:bg-amber-50">
            <section>
              <h1 className="text-3xl font-semibold mb-2">Scholarships</h1>
              <p className="text-xl mb-12">We provide scholarships for EMT school to support aspiring EMTs and kindness scholarships for high school students.</p>
              <h2 className="opacity-0 text-xl -mb-16 font-semibold text-cyan-800 transition duration-1000">View our scholarships</h2>
            </section>
          </Link>
          <Link href="/recipients" className="bg-amber-100 py-12 px-10 box-pop text-center learn-more section-transition hover:py-24 hover:bg-amber-50">
            <section>
              <h1 className="text-3xl font-semibold mb-4">Recipients</h1>
              <p className="text-xl mb-12">We have successfully launched numerous EMT careers and enabled high school students to pursue college education through our scholarships.</p>
              <h2 className="opacity-0 text-xl -mb-16 font-semibold text-cyan-800 transition duration-1000">View all recipients</h2>
            </section>
          </Link>
        </div>
        <section className="mt-10">
          <div className="relative flex justify-center items-center picture-height w-auto mx-2">
            <Image id="homepage-0" src={'/assets/homepage-0.jpg'} alt={'homepage-0'} width={333} height={500} priority className="rounded-xl box-pop" />
            <Image id="homepage-1" src={'/assets/homepage-1.jpg'} alt={'homepage-1'} width={750} height={500} priority className="hidden rounded-xl box-pop" />
            <Image id="homepage-2" src={'/assets/homepage-2.jpg'} alt={'homepage-2'} width={333} height={500} priority className="hidden rounded-xl box-pop" />
            <Image id="homepage-3" src={'/assets/homepage-3.jpg'} alt={'homepage-3'} width={750} height={500} priority className="hidden rounded-xl box-pop" />
            <Image id="homepage-4" src={'/assets/homepage-4.jpg'} alt={'homepage-4'} width={888} height={500} priority className="hidden rounded-xl box-pop" />
            <Image id="homepage-5" src={'/assets/homepage-5.jpg'} alt={'homepage-5'} width={284} height={500} priority className="hidden rounded-xl box-pop" />
            <Image id="homepage-6" src={'/assets/homepage-6.jpg'} alt={'homepage-6'} width={750} height={500} priority className="hidden rounded-xl box-pop" />
          </div>
        </section>
        <hr className="my-10"></hr>
        <footer className="text-center text-lg text-white flex flex-col items-center mb-32 md:text-2xl">
          <Link href='/contact' className="hover:text-gray-400 transition duration-500 py-3 px-5 md:border-b">Feel free to contact us with any questions you may have.</Link>
          <Link href='/donate' className="hover:text-gray-400 transition duration-500 py-3 px-5">Please consider donating to help fund future scholarships.</Link>
        </footer>
      </div>
  )
}