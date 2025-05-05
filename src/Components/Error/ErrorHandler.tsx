import { Link, useLocation } from "react-router-dom";

interface IProps{
    statusCode?:number;
    title?:string;
}

const ErrorHandler = ({statusCode = 500 ,title='Server Error'}:IProps) => {
    const {pathname} =useLocation();
  return (
    <div className="border border-red-400   fixed inset-0 flex items-center justify-center p-5 w-full">
        <h2 className="mt-5 text-[36px] font-bold lg:text-[50px]">{statusCode} - {title}</h2>
        <p>Oops Something went wrong. Try to refresh this page or go to home</p>
        <div className="flex items-center justify-center space-x-4 my-10">
            <Link to={'/'} reloadDocument className="bg-indigo-900 text-white">Home</Link>
            <Link to={pathname} reloadDocument className="bg-indigo-900 text-white">Refresh</Link>
        </div>
    </div>
  )
}

export default ErrorHandler