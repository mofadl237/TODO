import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  kha?: null;
}

const TextArea = ({ ...rest }: IProps) => {
  return (
    <textarea
      rows={6}
      {...rest}
      className="border-[1px] border-gray-300 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent"
    ></textarea>
  );
};

export default TextArea;
