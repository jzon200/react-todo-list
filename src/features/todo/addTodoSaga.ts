import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery as takeLatest } from "redux-saga/effects";
import SERVER_URL from "../../util/serverUrl";
import { addTodoFailure, addTodoSuccess } from "./todoSlice";

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
  yield takeLatest(addTodoSuccess.type, workAddTodo);
}
