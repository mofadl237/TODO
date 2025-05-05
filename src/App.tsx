import { RouterProvider } from "react-router-dom"
import router from "./Routes"


function App() {

  return (
    <main className="w-1/2 mx-auto ">
      <RouterProvider router={router}/>
     
    </main>
  )
}

export default App
