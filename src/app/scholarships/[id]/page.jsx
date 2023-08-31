import {Form1} from "./forms"

export default function Page({params}) {
  

  return(
    <div>
      <Form1 pageId={params.id}/>
    </div>
  )
}