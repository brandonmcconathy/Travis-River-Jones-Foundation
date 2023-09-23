import Image from "next/image"
import Link from "next/link"
import SeeMore from "./components/seemore"

export default function Homepage() {
  return (
      <div className="-m-4">
        <section className="homepage-img relative select-none text-white">
          <Image src='/assets/test-hero-img.jpg' alt="hero image" fill priority className="img-fade-in"></Image>
          <h1 className="opacity-0 text-5xl absolute top-1/4 left-1/2 homepage-img-text fade-in font-semibold">Travis River Jones Foundation</h1>
          <SeeMore />
        </section>
        <div className="flex flex-col my-10 gap-5">
          <Link id='top-div' href="/about" className="bg-amber-100 py-12 px-10 box-pop text-center learn-more section-transition hover:py-24 hover:bg-amber-50">
            <section>
              <h1 className="text-3xl font-semibold mb-2">Our Mission</h1>
              <p className="text-xl mb-12">Empower positive change by promoting kindness, goodwill, and enriching the lives of others through our Kindness and EMT Scholarships.</p>
              <h2 className="opacity-0 -mb-16 font-semibold text-cyan-800 transition duration-1000">Learn more about us</h2>
            </section>
          </Link>
          <Link href="/scholarships" className="bg-amber-100 py-12 px-10 box-pop text-center learn-more section-transition hover:py-24 hover:bg-amber-50">
            <section>
              <h1 className="text-3xl font-semibold mb-2">Scholarships</h1>
              <p className="text-xl mb-12">We provide scholarships for EMT school to support aspiring EMTs and kindness scholarships for high school students.</p>
              <h2 className="opacity-0 -mb-16 font-semibold text-cyan-800 transition duration-1000">View our scholarships</h2>
            </section>
          </Link>
          <Link href="/recipients" className="bg-amber-100 py-12 px-10 box-pop text-center learn-more section-transition hover:py-24 hover:bg-amber-50">
            <section>
              <h1 className="text-3xl font-semibold mb-4">Recipients</h1>
              <p className="text-xl mb-12">We have successfully launched numerous EMT careers and enabled high school students to pursue college education through our scholarships.</p>
              <h2 className="opacity-0 -mb-16 font-semibold text-cyan-800 transition duration-1000">View all recipients</h2>
            </section>
          </Link>
        </div>
        <h1 className="mb-96">Test</h1>
        <h1 className="mb-96">Test</h1>
        <h1 className="mb-96">Test</h1>
        <h1 className="mb-96">Test</h1>
        <h1 className="mb-96">Test</h1>
      </div>
  )
}