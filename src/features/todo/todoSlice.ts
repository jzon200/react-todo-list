import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TodoState = {
  todoList: Todo[];
};

const initialState: TodoState = {
  todoList: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<Todo[]>) {
      state.todoList = action.payload;
    },
  },
});

export const { setTodoList } = todoSlice.actions;

const todoReducer = todoSlice.reducer;

export default todoReducer;
