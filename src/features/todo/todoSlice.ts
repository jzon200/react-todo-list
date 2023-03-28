import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistConfig from "../../util/persistConfig";

type TodoState = {
  todoList: Todo[];
  loading: boolean;
  error: unknown;
  selectedTodo: Todo | null;
};

const initialState: TodoState = {
  todoList: [],
  loading: false,
  error: null,
  selectedTodo: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<Todo[]>) {
      state.todoList = action.payload;
    },
    setSelectedTodo(state, action: PayloadAction<Todo | null>) {
      state.selectedTodo = action.payload;
    },
    setTodoProperty(
      state,
      action: PayloadAction<{
        id: number;
        key: "title" | "description";
        value: string;
      }>
    ) {
      const existingTodo = state.todoList.find(
        (todo) => todo.id === action.payload.id
      );

      if (existingTodo != null) {
        existingTodo.title = action.payload.value;
        state.selectedTodo = existingTodo;
      }
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

export const {
  setTodoList,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  setSelectedTodo,
  setTodoProperty,
} = todoSlice.actions;

const todoReducer = persistReducer(persistConfig, todoSlice.reducer);

export default todoReducer;
