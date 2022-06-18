import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  completeCount: 0,
  remaningTodo: 0,
};

const updateStorage = (state) => {
  localStorage.setItem(
    "todo-manager",
    JSON.stringify({
      todos: state.todos,
      completeCount: state.completeCount,
      remaningTodo: state.remaningTodo,
    })
  );
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
      state.remaningTodo += 1;

      updateStorage(state);
    },
    removeTodo: (state, action) => {
      const id = action.payload.id;
      const todos = state.todos.filter((todo) => todo.id !== id);
      state.todos = todos;
      action.payload.status === "NOT_COMPLETE"
        ? (state.remaningTodo -= 1)
        : (state.completeCount -= 1);
      updateStorage(state);
    },
    markAsComplete: (state, action) => {
      const id = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      state.todos[todoIndex].status = "COMPLETE";
      state.completeCount += 1;
      state.remaningTodo -= 1;
      updateStorage(state);
    },
    loadAllTodos: (state, action) => {
      let todos = localStorage.getItem("todo-manager");
      if (!todos) {
        return updateStorage(state);
      }
      todos = JSON.parse(todos);
      state.todos = todos.todos;
      state.completeCount = todos.completeCount;
      state.remaningTodo = todos.remaningTodo;
    },
    clearAllTodos: (state) => {
      state.todos = [];
      state.completeCount = 0;
      state.remaningTodo = 0;
      updateStorage(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  removeTodo,
  loadAllTodos,
  clearAllTodos,
  markAsComplete,
} = todoSlice.actions;

export default todoSlice.reducer;
