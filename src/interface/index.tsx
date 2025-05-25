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
export interface IErrorResponse{
    error:{
        details?:{
            errors:{
                message:string;
            }[];
        }
        message?:string;
    }
}

export interface ITodo{
    documentId?:string;
    id:number;
    title:string;
    description:string;
}