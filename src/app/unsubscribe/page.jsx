export default function Unsubscribe() {

  return(
    <div className="flex flex-col items-center bg-amber-100 mt-24 px-4 py-6 rounded-xl box-pop w-[80%] m-auto sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
      <h1 className="text-center font-semibold text-xl mb-5">Enter your email to unsubscribe from our email list</h1>
      <form className="flex flex-col items-center gap-5">
        <input placeholder="Email" type="email" required className="w-full box-pop px-4 py-2 rounded-xl font-semibold outline-none focus:ring focus:ring-gray-300 transition duration-300"></input>
        <button className="bg-red-800 px-4 py-2 rounded-xl font-semibold text-amber-100 box-pop hover:bg-red-900 hover:text-amber-50 transition duration-300">Unsubscribe</button>
      </form>
    </div>
    
  )
}