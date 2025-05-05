import Button from "../Components/UI/Button"
import Input from "../Components/UI/Input"
import { FormRegister } from "../data"

const RegisterPage = () => {

    //Render
    const renderRegisterForm =FormRegister.map(({type,placeholder,name},idx)=>{
        return(
            <div key={idx}>
                <Input type={type} name={name}placeholder={placeholder}/>
            </div>
        )
    })
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Register to get access!
      </h2>
      <form className="space-y-4">
        {renderRegisterForm}
        <Button className="w-full py-3 bg-indigo-700 text-white rounded-md" >
          Register
        </Button>
      </form>
    </div>
  )
}

export default RegisterPage