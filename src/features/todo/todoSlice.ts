import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistConfig from "../../util/persistConfig";

type TodoState = {
  todoList: Todo[];
  loading: boolean;
  error: unknown;
};

const initialState: TodoState = {
  todoList: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<Todo[]>) {
      state.todoList = action.payload;
    },
    addTodoRequest(state, action: PayloadAction<Todo>) {
      state.loading = true;
      state.todoList.push(action.payload);
    },
    addTodoSuccess(state, action: PayloadAction<Todo>) {
      state.loading = false;
      state.todoList.push(action.payload);
    },
    addTodoFailure(state, action: PayloadAction<unknown>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setTodoList, addTodoRequest, addTodoSuccess, addTodoFailure } =
  todoSlice.actions;

const todoReducer = persistReducer(persistConfig, todoSlice.reducer);

export default todoReducer;
