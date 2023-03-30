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
    updateTodoRequest(state, action: PayloadAction<Todo>) {
      state.loading = true;
    },
    updateTodoSuccess(state, action: PayloadAction<Todo>) {
      state.loading = false;

      const { id, title, description, targetDate, completed } = action.payload;

      const existingTodo = state.todoList.find((todo) => todo.id === id);

      if (existingTodo != null) {
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.targetDate = targetDate;
        existingTodo.completed = completed;
        state.selectedTodo = existingTodo;
      }

      // if (state.selectedTodo != null) {
      //   state.selectedTodo.title = title;
      // }
    },
    updateTodoFailure(state, action: PayloadAction<unknown>) {
      state.loading = false;
      state.error = action.payload;
    },
    setTodoProperty(
      state,
      action: PayloadAction<{
        id: number;
        key: "title" | "description";
        value: string;
      }>
    ) {
      state.loading = false;

      const { id, key, value } = action.payload;

      const existingTodo = state.todoList.find((todo) => todo.id === id);

      if (existingTodo != null) {
        existingTodo[key] = value;
        state.selectedTodo = existingTodo;
      }
    },
    addTodoRequest(state, action: PayloadAction<Todo>) {
      state.loading = true;
      // state.todoList.push(action.payload);
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
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  setSelectedTodo,
  setTodoProperty,
} = todoSlice.actions;

const todoReducer = persistReducer(persistConfig, todoSlice.reducer);

export default todoReducer;
