import { useState, useEffect } from "react";
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

  return (
    <div className=" container mx-auto flex items-center px-5 min-h-screen">
      <div className=" w-full flex flex-col items-center">
        <div className=" py-3">
          <h2 className=" text-2xl">DO-it </h2>
        </div>
        <div className="max-w-[400px] flex flex-col gap-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="what do you have planned..."
              value={value.message}
              onChange={handleChange}
              className="w-[300px] border-2 border-1 p-2"
            />
            <button
              type="submit"
              className=" px-4 bg-blue-500 text-white min-h-full"
            >
              post
            </button>
          </form>
          <div className=" min-h-[20rem]">
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
