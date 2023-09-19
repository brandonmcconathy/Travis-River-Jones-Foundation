import Link from "next/link"

export default function Donate() {
  return(
    <div>
      <h1 className="text-center text-6xl text-white my-12">Donate</h1>
      <div className="bg-amber-100 mx-auto mb-10 text-center w-[97%] p-4 pb-10 rounded-xl box-pop md:w-3/4 md:py-6 md:px-8 lg:w-2/3 xl:w-1/2">
        <p className="text-lg font-semibold mb-6">100% of your donation will go directly to our scholarship recipients. All administrative costs of the foundation are covered by the Jones family. The Travis River Jones Foundation is an approved 501(c)(3) organization, making your contributions eligible for tax deductions. You can conveniently contribute through Zeffy, or for alternative donation methods, please feel free to reach out to us directly.</p>
        <div className="flex justify-center gap-5">
          <a href="https://www.zeffy.com/en-US/donation-form/ef2827da-6994-4429-b0e9-b4ca623cc1dd" target="_blank" className="bg-red-800 px-4 py-2 rounded-xl text-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Donate on Zeffy</a>
          <Link href={'/contact'} className="bg-red-800 px-4 py-2 rounded-xl text-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Contact us</Link>
        </div>
      </div>
    </div>
  )
}