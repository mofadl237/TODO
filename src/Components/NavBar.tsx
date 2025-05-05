import { Link } from "react-router-dom"


const NavBar = () => {
  return (
   <nav className="bg-indigo-600 text-white max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md">
    <ul className="flex items-center justify-between">
        <li  className=" duration-200 font-semibold text-lg">
            <Link to='/'>Home</Link>
        </li>

        <div className="flex items-center space-x-3">
            <li className=" duration-200 font-semibold text-lg">
                <Link to='register'>Register</Link>
            </li>
            <li className=" duration-200 font-semibold text-lg">
                <Link to='login'>Login</Link>
            </li>
        </div>
    </ul>
   </nav>
  )
}

export default NavBar