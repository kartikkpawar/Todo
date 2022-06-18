import React, { useEffect, useState } from "react";
import { AiOutlineEnter } from "react-icons/ai";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, clearAllTodos, loadAllTodos } from "./app/todoSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllTodos());
  }, [dispatch]);
  const todos = useSelector((state) => state.todo.todos);
  const completeCount = useSelector((state) => state.todo.completeCount);
  const remaningTodo = useSelector((state) => state.todo.remaningTodo);

  const [todoInput, setTodoInput] = useState("");

  const handleAddTodo = (e) => {
    if (e.key !== "Enter") return;
    if (todoInput === "") return alert("Enter todo");

    const todo = {
      id: nanoid(),
      todo: todoInput,
      status: "NOT_COMPLETE",
    };
    dispatch(addTodo(todo));
    setTodoInput("");
  };

  return (
    <div className="bg-main-bg w-full h-screen hide-scrollbar">
      <div className="max-w-[1600px] h-full flex flex-col items-center mx-auto p-3">
        <div className="flex flex-col w-full items-center h-1/4">
          <span className="text-white text-4xl mb-8">Todo Manager</span>
          <div className="w-full flex justify-center">
            <div className="flex border-2 p-2 rounded-full w-2/4 items-center ">
              <input
                type="text"
                className="bg-transparent focus:outline-none w-full px-2 text-lg text-white "
                placeholder="Todo"
                onKeyUp={handleAddTodo}
                onChange={(e) => setTodoInput(e.target.value)}
                value={todoInput}
              />
              <AiOutlineEnter className="text-white ml-2 text-xl mr-3" />
            </div>
            <button
              className="text-white ml-8 text-xs md:text-lg bg-red-600 px-9 py-1 rounded-full"
              onClick={() => dispatch(clearAllTodos())}
            >
              Clear all todo's
            </button>
          </div>{" "}
        </div>
        <div className="h-3/4 w-full flex flex-col md:flex-row justify-between mt-5">
          <div className="bg-todo-purple w-full mt-10 md:w-[45%] md:mt-0 h-full rounded-t-xl flex flex-col items-center ">
            <span className="text-white my-3 text-xl">Todos</span>
            <div className="flex flex-col hide-scrollbar bg-main-bg w-full h-full">
              {remaningTodo === 0 ? (
                <div className="h-full w-full flex items-center justify-center text-white text-xl">
                  All todo's completed 😀😀
                </div>
              ) : (
                <>
                  {" "}
                  {todos.map(
                    (todo, idx) =>
                      todo.status === "NOT_COMPLETE" && (
                        <Todo todo={todo} key={todo.id} />
                      )
                  )}
                </>
              )}
            </div>
          </div>
          <div className="bg-todo-green w-full mt-10 md:w-[45%] md:mt-0 h-full rounded-t-xl flex flex-col items-center ">
            <span className="text-white my-3 text-xl">Completed Todo</span>
            <div className="flex flex-col hide-scrollbar bg-main-bg w-full h-full">
              {completeCount === 0 ? (
                <div className="h-full w-full flex items-center justify-center text-white text-xl">
                  Mark todo complete 😌😌
                </div>
              ) : (
                <>
                  {" "}
                  {todos.map(
                    (todo, idx) =>
                      todo.status === "COMPLETE" && (
                        <Todo todo={todo} key={todo.id} />
                      )
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
