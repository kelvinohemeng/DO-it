import React, { useState, useEffect } from "react";
import "./App.css";
import Todo from "./util/types";
import { Item } from "./components/TodoItem";

function App() {
  const storedTodos = localStorage.getItem("todos");
  const initialTodos: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

  const [value, setValue] = useState<Todo>({
    uid: 0,
    message: "",
    isCompleted: false,
  });
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  useEffect(() => {
    console.log(initialTodos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue((prevValue) => ({
      ...prevValue,
      message: e.target.value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setTodos((prevTodos) => [...prevTodos, value]);
    setValue({ uid: value.uid + 1, message: "", isCompleted: false });
    // console.log(todos);
  };

  const isMaxLength = value.message.length === 100;

  return (
    <div className=" container mx-auto flex items-center px-5 min-h-screen">
      <div className=" w-full flex flex-col items-center">
        <div className=" py-3">
          <h2 className=" text-2xl">DO-it </h2>
        </div>
        <div className="max-w-full flex flex-col gap-4 relative  ">
          <form onSubmit={handleSubmit} className="w-full flex space-x-2">
            <input
              type="text"
              placeholder="what do you have planned..."
              value={value.message}
              onChange={handleChange}
              className={`w-full p-2 border ${
                isMaxLength ? "border-red-500" : "border-gray-300"
              } focus:outline-none forcus:border-blue-500`}
              maxLength={100}
            />
            <button
              type="submit"
              className=" px-4 bg-blue-500 text-white min-h-full"
            >
              post
            </button>
          </form>
          <div
            className={`w-full transition-all ease-out duration-300 mr-4  bg-red-100 p-2 ${
              isMaxLength ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className=" text-sm">
              sorry you can only have 100 character consider shortening your
              text
            </p>
          </div>
          <div className=" mt-[.2rem] min-h-[20rem]">
            <div className="flex flex-col w-full gap-2">
              {todos.map((item) => (
                <Item key={item.uid} todo={item} setTodo={setTodos} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
