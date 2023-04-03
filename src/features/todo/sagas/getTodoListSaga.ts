import { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import SERVER_URL from "../../../util/serverUrl";
import {
  getTodoListFailure,
  getTodoListRequest,
  getTodoListSuccess,
} from "../todoSlice";

type Sort = "title" | "targetDate";

function getTodoList(page: number, sortBy?: Sort) {
  return axios
    .get(`${SERVER_URL}/todo`, {
      params: {
        sortBy,
        page,
        size: 20,
      },
    })
    .then((res) => res.data);
}

function* workGetTodoList(
  action: PayloadAction<{ sortBy: Sort; page: number }>
): Generator<any> {
  try {
    // yield select(state => state.todo.);
    const todoList = yield call(
      getTodoList,
      action.payload.page,
      action.payload.sortBy
    );
    yield put(getTodoListSuccess(todoList as Todo[]));
  } catch (err) {
    yield put(getTodoListFailure(err));
  }
}

export default function* getTodoListSaga() {
  yield takeEvery(getTodoListRequest.type, workGetTodoList);
}
