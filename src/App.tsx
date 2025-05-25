import { RouterProvider } from "react-router-dom"
import router from "./Routes"
import { Toaster } from "react-hot-toast"


function App() {

  return (
    <main className="max-w-lg p-2 mx-auto ">
      <RouterProvider router={router}/>
      <Toaster />
     
    </main>
  )
}

export default App
