import React, { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { removeTodo, markAsComplete } from "../app/todoSlice";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(todo.status === "COMPLETE");

  const deleteTodo = () => {
    dispatch(removeTodo(todo));
  };
  const handleMarkComplete = (e) => {
    if (isCompleted) return;
    setIsCompleted(true);
    dispatch(markAsComplete(todo.id));
  };
  return (
    <div className="flex items-center bg-todo-bg my-3 rounded-lg px-2 py-4 justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          className={`h-4 w-4 flex-shrink-0 ${
            isCompleted ? "accent-gray-400" : "accent-todo-purple"
          }`}
          onChange={handleMarkComplete}
          checked={isCompleted}
        />
        <p
          className={`text-white mx-5 turncate-line text ${
            isCompleted && "line-through text-gray-400"
          }`}
        >
          {todo.todo}
        </p>
      </div>
      <BiTrash
        className="flex-shrink-0 text-red-500 text-2xl cursor-pointer transition ease-in-out delay-150 hover:scale-125"
        onClick={deleteTodo}
      />
    </div>
  );
};

export default Todo;
