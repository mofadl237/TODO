import Input from "../Components/UI/Input";
import { FormLogin } from "../data";
import Button from "./../Components/UI/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../config/axios.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "./../interface/index";
import ErrorMessage from "../Components/Error/ErrorMessage";


interface IFormInput {
  identifier: string;
  password: string;
}
const LoginPAge = () => {
  //State
  const [isLoading, setIsLoading] = useState(false);
  // Handler

  //Fetch Data &Validation using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    /**
     * 1-Pending
     * 2-Fulfilled
     * 3-Rejected
     */
    setIsLoading(true);
    try {
      //Fulfilled
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );

      if (status === 200) {
        //Code Toaster
        toast.success(" You Will navigate to The Home Page After 2 Second", {
          duration: 2000,
          position: "bottom-center",
        });

        localStorage.setItem("loggedUser", JSON.stringify(resData));

        setTimeout(() => {
         location.replace('/')
        }, 1000);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`, {
        duration: 1000,
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //Render

  const renderLoginForm = FormLogin.map(
    ({ type, placeholder, name, validation }, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, { ...validation })}
            autoComplete={name === "password" ? "current-password" : "on"}
          />
          {errors[name] && <ErrorMessage msg={errors[name].message} />}
          {/* {errors[name] && errors[name].type === 'required' && <ErrorMessage msg={`${name} Is Required Input`} />}
          {errors[name] && errors[name].type === 'minLength' && <ErrorMessage msg={`minLength Not Enough`} />}
          {errors[name] && errors[name].type === 'pattern' && <ErrorMessage msg={`Enter Valid Pattern`} />} 
          Replace register Schema in React Hook Form
          */}
        </div>
      );
    }
  );

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}

        <Button isLoading={isLoading}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPAge;
