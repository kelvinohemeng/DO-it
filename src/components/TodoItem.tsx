import Todo from "../util/types";

type ItemProps = {
  todo: Todo;
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Item = ({ todo, setTodo }: ItemProps) => {
  //   const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleted = () => {
    setTodo((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.uid === todo.uid
          ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
          : prevTodo
      )
    );
    console.log("clicked");
  };

  const handleDelete = () => {
    setTodo((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.uid !== todo.uid)
    );
  };

  return (
    <div
      className={` flex items-center justify-between w-full p-2 ${
        todo.isCompleted ? "bg-green-400" : "bg-slate-200"
      }`}
    >
      <p className="max-w-[250px]">{todo.message}</p>
      <div className=" flex gap-3 items-center">
        <div onClick={handleDelete} className=" cursor-pointer">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
        </div>
        <div onClick={handleCompleted} className=" cursor-pointer">
          {todo.isCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};
