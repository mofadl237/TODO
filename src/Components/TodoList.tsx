import { useEffect, useState } from "react";
import Button from "./UI/Button";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import ErrorHandler from "./Error/ErrorHandler";

const userDataString = localStorage.getItem("loggedUser");
const userData = userDataString ? JSON.parse(userDataString) : null;

const TodoList = () => {
  //state

  // render data
  const {data,error,isLoading} = useAuthenticatedQuery({url:'/users/me?populate=todos' , queryKey:['todos'] ,config:{headers:{Authorization:`Bearer ${userData.jwt}`}} })

  // /users/me?populate=todos
  // const { isLoading, data } = useQuery({
  //   queryKey: ["Todos"],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get("/users/me?populate=todos", {
  //       headers: {
  //         Authorization: `Bearer ${userData.jwt}`,
  //       },
  //     });
  //     return data.todos;
  //   },
  // });
  // Handler
  if(error) return <ErrorHandler/>
  if (isLoading === true) return <h3>Loading ....</h3>;
console.log(data)
  return (
    <div className="space-y-1">
      {data.todos.map( (todo) => { 
        
        return (<div className="flex items-center justify-between hover:gb-gray-700 duration-300 p-3 rounded-md even:bg-gray-100">
          <p className="w-full font-semibold">{todo.title}</p>
          <div className="flex justify-end items-center w-1/2 space-x-2">
            <Button >Edit</Button>
            <Button className="bg-red-700 ">remove</Button>
          </div>
        </div>);
        
      })}
    </div>
  );
};

export default TodoList;
