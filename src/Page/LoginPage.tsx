import Input from "../Components/UI/Input";
import { FormLogin } from "../data"
import Button from './../Components/UI/Button';


const LoginPAge = () => {
    //State 

    // Handler

    //Render

    const renderLoginForm=FormLogin.map((input,idx)=>{
        return(
            <div key={idx}>
                <Input type={input.type} placeholder={input.placeholder} name={input.name}/>
            </div>
        )
    })

  return (
    <div className="max-w-md mx-auto">
    <h2 className="text-center mb-4 text-3xl font-semibold">
      Login to get access!
    </h2>
    <form className="space-y-4" >
      {renderLoginForm}

      <Button className="w-full py-3 bg-indigo-700 text-white rounded-md">
        Login
      </Button>
    </form>
  </div>
  )
}

export default LoginPAge