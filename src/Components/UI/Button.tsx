import { ButtonHTMLAttributes, ReactNode } from "react"

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement>{
children:ReactNode;
isLoading?:boolean;
className?:string;
};
const Button = ({children,isLoading,className,...rest}:IProps) => {
  return (
    <button {...rest} className= {`w-full py-3  hover:opacity-90  rounded-md disabled:opacity-30 disabled:cursor-not-allowed ${className} `} disabled={isLoading}>
        {isLoading ? 'Loading ...' : children} 
    </button>
  )
}

export default Button