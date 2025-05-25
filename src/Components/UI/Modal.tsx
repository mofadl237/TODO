import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode } from "react";

interface IProps {
  title: string;
  isOpen: boolean;
  children?: ReactNode;
}
const Modal = ({ isOpen, title, children }: IProps) => {
  return (
    <>
      <Dialog open={isOpen} onClose={() => !isOpen} className="relative  ">
        <div className="fixed w-full inset-0 flex  items-center justify-center p-3">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-3 rounded-md">
            <DialogTitle className="font-bold">{title}</DialogTitle>

            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Modal;
