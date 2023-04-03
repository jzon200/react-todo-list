import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import SERVER_URL from "../../../util/serverUrl";
import {
  deleteTodoRequest,
  deleteTodoFailure,
  deleteTodoSuccess,
} from "../todoSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* workDeleteTodoSaga(action: PayloadAction<Todo>) {
  try {
    const id = action.payload.id;
    yield call(axios.delete, `${SERVER_URL}/todo/${id}`);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(deleteTodoFailure(error));
  }
}

export default function* deleteTodoSaga() {
  yield takeLatest(deleteTodoRequest.type, workDeleteTodoSaga);
}
