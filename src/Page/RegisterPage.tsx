import ErrorMessage from "../Components/Error/ErrorMessage";
import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";
import { FormRegister } from "../data";

//React Hook
import { useForm, SubmitHandler } from "react-hook-form";
import { registerSchema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  //Fetch Data &Validation using react hook form
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  //Render
  const renderRegisterForm = FormRegister.map(
    ({ type, placeholder, name ,validation}, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, {...validation})}
            autoComplete={name === "password" ? "current-password" : "on"}
          />
          {errors[name] &&  <ErrorMessage msg={errors[name].message} />}
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
        <Button className="w-full py-3 bg-indigo-700 text-white rounded-md">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
