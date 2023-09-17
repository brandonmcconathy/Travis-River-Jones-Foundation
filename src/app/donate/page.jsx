export default function Donate() {
  return(
    <div>
      <h1 className="text-center text-6xl text-white mt-16 mb-24">Donate</h1>
      <div className="bg-amber-100 mx-auto text-center w-1/2 px-8 py-8 pb-12 rounded-xl">
        <p className="text-xl font-semibold mb-10">100% of your donation will go directly to our scholarship recipients. All admin costs of the foundation are covered by the Jones family. The Travis River Jones Foundation is an approved 501c3 organization and your donations can be tax deductible. We currently accept donations through Zeffy or you can contact the foundation directly for alternate ways to donate.</p>
        <a href="https://www.zeffy.com/en-US/donation-form/ef2827da-6994-4429-b0e9-b4ca623cc1dd" target="_blank" className="bg-red-800 px-4 py-2 rounded-xl text-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50">Donate on Zeffy</a>
      </div>
    </div>
  )
}