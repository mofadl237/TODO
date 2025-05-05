import { forwardRef, InputHTMLAttributes,Ref } from "react";


interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    msg?:unknown;//Kana we kha
}

const Input = forwardRef(({ ...rest }: IProps , ref:Ref<HTMLInputElement>) => {
  return (
    <input
    ref={ref}
      {...rest}
      className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
    />
  );
});

export default Input;
