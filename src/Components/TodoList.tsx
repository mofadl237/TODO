import React, { useState } from "react";
import Button from "./UI/Button";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import ErrorHandler from "./Error/ErrorHandler";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import TextArea from "./UI/TextArea";
import { ITodo } from "../interface";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import TodoSkelton from "./TodoSkelton";
// import { faker } from "@faker-js/faker";

const userDataString = localStorage.getItem("loggedUser");
const userData = userDataString ? JSON.parse(userDataString) : null;

const TodoList = () => {
  //state
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);

  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "t",
    description: "d",
  });
  const [todoToAdd, setTodoToAdd] = useState({
    title: "",
    description: "",
  });

  //  const [todo , setTodo] =useState([]);
  // render data
  const queryClient = useQueryClient(); //دا عشان اما احدث الداتا دي من غير ريفريش
  const { data, error, isLoading } = useAuthenticatedQuery({
    queryKey: ["TodoList", `${isLoadingSpinner}`],
    url: "/users/me?populate=todos",
    config: { headers: { Authorization: `Bearer ${userData.jwt}` } },
  });

  // Handler
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoToEdit((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const onChangeHandlerAdd = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTodoToAdd((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //1- Modal
  const openEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenEditModal(true);
  };
  const closeEditModal = () => {
    setTodoToEdit({ id: 0, title: "", description: "" });
    setIsOpenEditModal(false);
  };
  const openAddModal = () => {
    setIsOpenAddModal(true);
  };
  const closeAddModal = () => {
    setTodoToAdd({ title: "", description: "" });
    setIsOpenAddModal(false);
  };
  const openRemoveModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenRemoveModal(true);
  };
  const closeRemoveModal = () => {
    setTodoToEdit({ title: "", description: "", id: 0 });
    setIsOpenRemoveModal(false);
  };
  const submitHandlerRemove = async () => {
    setIsLoadingSpinner(true);
    try {
      const { status } = await axiosInstance.delete(
        `/todos/${todoToEdit.documentId}`,
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        }
      );

      if (status === 200) {
        queryClient.invalidateQueries({ queryKey: ["TodoList"] });
        toast.success("Remove This Todo");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSpinner(false);
      closeRemoveModal();
    }
  };
  const submitHandlerEdit = async () => {
    const { documentId, description, title } = todoToEdit;
    setIsLoadingSpinner(true);
    try {
      const { status } = await axiosInstance.put(
        `/todos/${documentId}`,
        { data: { title, description } },
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      );
      if (status == 200) {
        queryClient.invalidateQueries({ queryKey: ["TodoList"] });
        toast.success("Updated This Todo Success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenEditModal(false);
      setIsLoadingSpinner(false);
    }
  };
  const submitHandlerAdd = async () => {
    const { description, title } = todoToAdd;
    setIsLoadingSpinner(true);
    try {
      const { status } = await axiosInstance.post(
        `/todos`,
        { data: { title, description, user: userData.user.id } },
        { headers: { Authorization: `Bearer ${userData.jwt}` } }
      );
      if (status == 201) {
        queryClient.invalidateQueries({ queryKey: ["TodoList"] });
        toast.success("Add This Todo Success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTodoToAdd({ title: "", description: "" });
      setIsOpenAddModal(false);
      setIsLoadingSpinner(false);
    }
  };
  // const onGenerateFakeData = async () => {
  //   for (let i = 0; i < 100; i++) {
  //     try {
  //       const { status } = await axiosInstance.post(
  //         "/todos",
  //         {
  //           data: {
  //             title: faker.word.adjective(5),
  //             description: faker.lorem.paragraph(2),
  //             user: [userData.user.id],
  //           },
  //         },
  //         { headers: { Authorization: `Bearer ${userData.jwt}` } }
  //       );
  //       if (status == 201) {
  //         queryClient.invalidateQueries({ queryKey: ["TodoList"] });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  //2-
  if (error) return <ErrorHandler />;
  if (isLoading)
    return (
      <div>
        {Array.from({ length: 3 }, (_, i) => (
          <TodoSkelton key={i} />
        ))}
      </div>
    );

  /** 3- Render */
  return (
    <div className="space-y-1 ">
      <div className="flex items-center space-x-2 mb-4">
        <Button
          type="button"
          className="bg-indigo-700 text-white mx-auto justify-center"
          onClick={() => {
            openAddModal();
          }}
        >
          Add New Todo
        </Button>
      </div>
      {data.todos.length ? (
        <>
          {data.todos.map((todo: ITodo) => {
            return (
              <div
                key={todo.id}
                className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
              >
                <p className=" w-full font-semibold">{todo.title}</p>
                <div className="flex justify-end items-center w-full  space-x-2">
                  <Button
                    className="bg-indigo-700 text-white"
                    onClick={() => {
                      openEditModal(todo);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-red-700 text-white"
                    onClick={() => {
                      openRemoveModal(todo);
                    }}
                  >
                    remove
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <h1 className="bg-gray-800 text-white rounded-md text-center py-3 ">
          No Found Todo Yet!!
        </h1>
      )}
      <Modal isOpen={isOpenEditModal} title="Edit ToDo">
        <Input
          type="text"
          name="title"
          value={todoToEdit.title}
          onChange={onChangeHandler}
        />
        <TextArea
          name="description"
          value={todoToEdit.description}
          onChange={onChangeHandler}
        />
        <div className="flex w-full space-x-2">
          <Button
            onClick={submitHandlerEdit}
            isLoading={isLoadingSpinner}
            className="bg-indigo-700 text-white"
          >
            Update
          </Button>
          <Button
            type="button"
            onClick={closeEditModal}
            className="bg-gray-200 text-black hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal isOpen={isOpenAddModal} title="Add ToDo">
        <Input
          type="text"
          name="title"
          value={todoToAdd.title}
          onChange={onChangeHandlerAdd}
        />
        <TextArea
          name="description"
          value={todoToAdd.description}
          onChange={onChangeHandlerAdd}
        />
        <div className="flex w-full space-x-2">
          <Button
            onClick={submitHandlerAdd}
            isLoading={isLoadingSpinner}
            className="bg-indigo-700 text-white"
          >
            Add
          </Button>
          <Button
            type="button"
            onClick={closeAddModal}
            className="bg-gray-200 text-black hover:bg-gray-400"
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <Modal isOpen={isOpenRemoveModal} title="Are you Sure Delete This Todo?">
        <div className="py-4 space-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
            officia, blanditiis delectus corporis nisi iure! Facilis ducimus
            molestiae adipisci quod.
          </p>
          <div className="flex w-full space-x-2">
            <Button
              onClick={submitHandlerRemove}
              isLoading={isLoadingSpinner}
              className="bg-red-600 text-white"
            >
              Remove{" "}
            </Button>
            <Button
              type="button"
              onClick={closeRemoveModal}
              className="bg-gray-200 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;
