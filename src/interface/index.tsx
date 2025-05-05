export interface IFormRegister{
    name:'username'|'email'|'password';
    placeholder:string;
    type:'text'|'email'|'password';
    validation:{
        required?:boolean;
        minLength?: number;
        pattern ?:RegExp;
    }
}
export interface IFormLogin{
    name:'identifier'|'password';
    type:'email'|'password';
    placeholder:string;
    validation:{
        pattern ?:RegExp;
        minLength ?:number;
        required?:boolean;
    }
}