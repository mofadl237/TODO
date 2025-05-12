import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom"

const userDataString = localStorage.getItem("loggedUser");
const userData = userDataString ?JSON.parse(userDataString) :null;
const NavBar = () => {
    const {pathname} =useLocation();
//Function Logout 

const onLogout=()=>{
    localStorage.removeItem("loggedUser");
    toast.success('Success Logout After 1s');
    setTimeout(()=>{
        location.replace(pathname);
    },1000)

}

  return (
   <nav className="bg-indigo-600 text-white max-w-lg mx-auto mt-7 mb-20 px-3 py-5 rounded-md">
    <ul className="flex items-center justify-between">
        <li  className=" duration-200 font-semibold text-lg">
            <Link to='/'>Home</Link>
        </li>
{
    userData?.jwt  ? (<div className="flex items-center space-x-3" >
        <span  className="text-white">{userData.user.username}</span>
        <span className="text-white cursor-pointer  " onClick={onLogout}>Logout</span>
    </div>):(<div className="flex items-center space-x-3">
            <li className=" duration-200 font-semibold text-lg">
                <Link to='register'>Register</Link>
            </li>
            <li className=" duration-200 font-semibold text-lg">
                <Link to='login'>Login</Link>
            </li>
        </div>)
}
        
    </ul>
   </nav>
  )
}

export default NavBar