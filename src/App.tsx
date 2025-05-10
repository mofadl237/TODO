import { RouterProvider } from "react-router-dom"
import router from "./Routes"
import { Toaster } from "react-hot-toast"


function App() {

  return (
    <main className="w-1/2 mx-auto ">
      <RouterProvider router={router}/>
      <Toaster />
     
    </main>
  )
}

export default App
