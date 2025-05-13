import { useQuery } from "@tanstack/react-query"
import { AxiosRequestConfig } from "axios";
import axiosInstance from "../config/axios.config";
interface IProps{
    url:string;
    queryKey:string[];
    config?:AxiosRequestConfig;
}

const useAuthenticatedQuery = ({config,url,queryKey}:IProps) => {
  return useQuery({
    queryKey,
    queryFn:async ()=>{
        const {data:res} = await axiosInstance.get(url , config);
        return res ;
    }
    
  }) 
}

export default useAuthenticatedQuery