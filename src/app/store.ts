import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import todoReducer from "../features/todo/todoSlice";
import usersReducer from "../features/users/usersSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    users: usersReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
