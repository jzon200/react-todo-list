import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistConfig from "../../util/persistConfig";

type TodoState = {
  todoList: Todo[];
  loading: boolean;
  error: unknown;
  selectedTodo: Todo | null;
  sortedBy?: "title" | "targetDate";
  page: number;
  hasMore: boolean;
};

const initialState: TodoState = {
  todoList: [],
  loading: false,
  hasMore: true,
  error: null,
  selectedTodo: null,
  page: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodoList(state, action: PayloadAction<Todo[]>) {
      state.todoList = action.payload;
    },
    getTodoListRequest(
      state,
      action: PayloadAction<{
        sortBy: typeof initialState.sortedBy;
        page: number;
      }>
    ) {
      state.loading = true;
      state.sortedBy = action.payload.sortBy;
      state.page = action.payload.page;
    },
    getTodoListSuccess(state, action: PayloadAction<Todo[]>) {
      state.loading = false;
      if (action.payload.length === 0) {
        state.hasMore = false;
      } else {
        state.todoList = [...state.todoList, ...action.payload];
        state.page += 1;
        state.error = null;
        state.hasMore = true;
      }
    },
    getTodoListFailure(state, action: PayloadAction<unknown>) {
      state.loading = false;
      state.error = action.payload;
    },
    getMoreTodoList(state, action: PayloadAction<Todo[]>) {
      state.loading = false;
      state.todoList = state.todoList.concat(action.payload);
      state.page += 1;
      state.error = null;
    },
    setSelectedTodo(state, action: PayloadAction<Todo | null>) {
      state.selectedTodo = action.payload;
    },
    updateTodoRequest(state, action: PayloadAction<Todo>) {
      // state.loading = true;
    },
    updateTodoSuccess(state, action: PayloadAction<Todo>) {
      // state.loading = false;

      const { id, title, description, targetDate, completed } = action.payload;

      const existingTodo = state.todoList.find((todo) => todo.id === id);

      if (existingTodo != null) {
        existingTodo.title = title;
        existingTodo.description = description;
        existingTodo.targetDate = targetDate;
        existingTodo.completed = completed;
        state.selectedTodo = existingTodo;
      }
    },
    updateTodoFailure(state, action: PayloadAction<unknown>) {
      // state.loading = false;
      state.error = action.payload;
    },
    deleteTodoRequest(state, action: PayloadAction<Todo>) {
      // state.loading = true;
    },
    deleteTodoSuccess(state, action: PayloadAction<Todo>) {
      // state.loading = false;
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
      state.selectedTodo = null;
    },
    deleteTodoFailure(state, action: PayloadAction<unknown>) {
      state.error = action.payload;
    },
    addTodoRequest(state, action: PayloadAction<Todo>) {
      // state.loading = true;
      // state.todoList.push(action.payload);
    },
    addTodoSuccess(state, action: PayloadAction<Todo>) {
      // state.loading = false;
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
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  setSelectedTodo,
  getTodoListRequest,
  getTodoListSuccess,
  getTodoListFailure,
} = todoSlice.actions;

const todoReducer = persistReducer(persistConfig, todoSlice.reducer);

export default todoReducer;
