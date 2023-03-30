import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import SERVER_URL from "../../util/serverUrl";
import {
  updateTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
} from "./todoSlice";

async function updateTodo(todo: Todo) {
  const response = await axios.put(`${SERVER_URL}/todo/${todo.id}`, todo);
  return response.data;
}

function* workUpdateTodo(action: PayloadAction<Todo>) {
  try {
    const payload = action.payload;
    yield call(updateTodo, payload);
    yield put(updateTodoSuccess(payload));
  } catch (error) {
    yield put(updateTodoFailure(error));
  }
}

export default function* updateTodoSaga() {
  yield takeLatest(updateTodoRequest.type, workUpdateTodo);
}
