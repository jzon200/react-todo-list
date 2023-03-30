import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import SERVER_URL from "../../../util/serverUrl";
import {
  getTodoListFailure,
  getTodoListRequest,
  getTodoListSuccess,
} from "../todoSlice";

type Sort = "title" | "targetDate";

function getTodoList(sortBy?: Sort) {
  return axios
    .get(`${SERVER_URL}/todo?sortBy=${sortBy ?? "targetDate"}`)
    .then((res) => res.data);
}

function* workGetTodoList(action: PayloadAction<Sort>): Generator<any> {
  try {
    const todoList = yield call(getTodoList, action.payload);
    yield put(getTodoListSuccess(todoList as Todo[]));
  } catch (err) {
    yield put(getTodoListFailure(err));
  }
}

export default function* getTodoListSaga() {
  yield takeEvery(getTodoListRequest.type, workGetTodoList);
}
