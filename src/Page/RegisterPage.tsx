import ErrorMessage from "../Components/Error/ErrorMessage";
import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";
import { FormRegister } from "../data";

//React Hook
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../config/axios.config";
import { useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from './../interface/index';
import {  useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  //state
  const [isLoading, setIsLoading] = useState(false);
const navigate =useNavigate();
  //Fetch Data &Validation using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
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
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        //Code Toaster
        toast.success(" You Will navigate to The Login Page After 2 Second To Login!", {
          duration: 2000,
          position: "bottom-center",
        });

        //Navigate 
        setTimeout(()=>{
          navigate('/login')
        },1500)
      }

    } catch(error) {
      const errorObj =error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`,{
        duration: 1000,
        position: "bottom-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  //Render
  const renderRegisterForm = FormRegister.map(
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
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button isLoading={isLoading}>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
