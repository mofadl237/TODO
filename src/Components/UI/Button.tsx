import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
children:ReactNode;
isLoading?:boolean;
};
const Button = ({children,isLoading,...rest}:IProps) => {
  return (
    <button {...rest} className="w-full py-3 bg-indigo-700 text-white rounded-md disabled:bg-indigo-400 disabled:cursor-not-allowed" disabled={isLoading}>
        {isLoading ? 'Loading ...' : children} 
    </button>
  )
}

export default Button