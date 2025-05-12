import { useEffect, useState } from "react";
import Button from "./UI/Button";
import axiosInstance from "../config/axios.config";

const userDataString = localStorage.getItem("loggedUser");
const userData = userDataString ? JSON.parse(userDataString) : null;

const TodoList = () => {
  //state
  const [todos, setToDos] = useState([]);
  // render data

  useEffect(() => {
    console.log("Fetching todos...");
   try {
     axiosInstance.get("/users/me?populate=todos", {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    }).then((res) => setToDos(res.data.todos)).catch(err => console.log(`Hy ${err}`))
    ;
    
   } catch (error) {
    console.log(error)
   }
  }, [userData.jwt]);
  // Handler
  return (
    todos.map(
        (todo)=>(
            <div key={todo.id} className="space-y-1">
      <div className="flex items-center justify-between hover:gb-gray-700 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{todo.title}</p>
        <div className="flex justify-end items-center w-full space-x-2">
          <Button className="py-2 w-1/2">Edit</Button>
          <Button className="bg-red-700 py-2 w-1/4">remove</Button>
        </div>
      </div>
    </div>
        )
    )
  );
};

export default TodoList;
