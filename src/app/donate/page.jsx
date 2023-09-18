import Link from "next/link"

export default function Donate() {
  return(
    <div>
      <h1 className="text-center text-6xl text-white mt-16 mb-24">Donate</h1>
      <div className="bg-amber-100 mx-auto text-center w-1/2 px-8 py-8 pb-12 rounded-xl box-pop">
        <p className="text-xl font-semibold mb-10">100% of your donation will go directly to our scholarship recipients. All administrative costs of the foundation are covered by the Jones family. The Travis River Jones Foundation is an approved 501(c)(3) organization, making your contributions eligible for tax deductions. You can conveniently contribute through Zeffy, or for alternative donation methods, please feel free to reach out to the foundation directly.</p>
        <div className="flex justify-center gap-5">
          <a href="https://www.zeffy.com/en-US/donation-form/ef2827da-6994-4429-b0e9-b4ca623cc1dd" target="_blank" className="bg-red-800 px-4 py-2 rounded-xl text-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Donate on Zeffy</a>
          <Link href={'/contact'} className="bg-red-800 px-4 py-2 rounded-xl text-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Contact us</Link>
        </div>
      </div>
    </div>
  )
}