import { IFormLogin, IFormRegister } from "../interface";

export const FormRegister:IFormRegister[]=[
    {
        name:'username',
        type:'text',
        placeholder:'User Name',
        validation:{
            minLength:5,
            required:true,
        }
    },
    {
        name:'email',
        type:'email',
        placeholder:'example@gmail.com',
        validation:{
            pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required:true,
        }
    },
    {
        name:'password',
        type:'password',
        placeholder:'Password',
        validation:{
            minLength:5,
            required:true,
        }
    }
]

export const FormLogin :IFormLogin[]=[
    {
        name:'identifier',
        type:'email',
        placeholder:'Email',
        validation:{
            pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            required:true,
        }
    },
    {
        name:'password',
        type:'password',
        placeholder:'Password',
        validation:{
            required:true,
            minLength:5,
        }
    }
]