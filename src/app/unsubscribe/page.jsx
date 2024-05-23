export default function Unsubscribe() {

  return(
    <div className="flex flex-col items-center bg-amber-100 mb-10 px-4 py-4 rounded-xl box-pop w-[80%] m-auto sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
      <h1>Enter your email to unsubscribe from our email list</h1>
      <form className="flex flex-col">
        <input placeholder="Email" type="email"></input>
        <button>Unsubscribe</button>
      </form>
    </div>
    
  )
}