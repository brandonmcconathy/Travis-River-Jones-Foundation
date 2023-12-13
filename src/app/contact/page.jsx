import Link from "next/link"

export default function Contact() {
  return(
    <div>
      <h1 className="text-center text-6xl text-white mt-16 mb-24">Contact</h1>
      <div className="bg-amber-100 mx-auto w-[97%] p-4 rounded-xl text-center flex flex-col box-pop sm:w-11/12 md:w-2/3 xl:w-1/2">
        <h1 className="text-xl font-semibold mb-6 xl:text-2xl">Please contact us with any questions you may have. We will try our best to respond as soon as possible.</h1>
        <div className="bg-white mx-auto p-2 rounded-xl box-pop sm:px-4 xl:px-8 xl:py-4">
          <p className="font-bold mb-2 sm:text-lg lg:text-xl">(909)-908-7654</p>
          <p className="text-sm font-bold sm:text-lg xl:text-xl">travisriverjonesfoundation@gmail.com</p>
        </div>
        <div className="flex flex-col items-center justify-center py-5 font-semibold gap-4 sm:flex-row sm:gap-10">
          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <img src="/instagram.png" className="w-1/12" />
            <Link href='https://instagram.com/travisriverjonesfoundation' target="_blank">travisriverjonesfoundation</Link>
          </div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <img src="/facebook.png" className="w-1/12" />
            <Link href='https://www.facebook.com/travisriverjonesfoundation' target="_blank">travisriverjonesfoundation</Link>
          </div>
        </div>
      </div>
    </div>
  )
}