import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import SERVER_URL from "../../../util/serverUrl";
import { addTodoFailure, addTodoRequest, addTodoSuccess } from "../todoSlice";

function* workAddTodo(action: PayloadAction<Todo>) {
  try {
    const { data } = yield call(
      axios.post,
      `${SERVER_URL}/todo`,
      action.payload
    );
    yield put(addTodoSuccess(data));
  } catch (error) {
    yield put(addTodoFailure(error));
  }
}

export default function* addTodoSaga() {
  yield takeLatest(addTodoRequest.type, workAddTodo);
}
