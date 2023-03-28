import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import SERVER_URL from "../../util/serverUrl";
import { setTodoList } from "../todo/todoSlice";
import {
  getCurrentUserSuccess,
  getUsersFailure,
  getUsersRequest,
  getUsersSuccess,
} from "./usersSlice";

function getUsers() {
  return axios.get(`${SERVER_URL}/users`).then((res) => res.data);
}

function* workGetUsers(): Generator<any> {
  try {
    const users = yield call(getUsers);
    yield put(getUsersSuccess(users as User[]));
  } catch (err) {
    yield put(getUsersFailure(err as Error));
  }
}

async function getUserByUsername() {
  const res = await axios.get(`${SERVER_URL}/users/Edzon`);
  return res.data;
}

function* workGetUser(): Generator<any> {
  try {
    const user = yield call(getUserByUsername);
    yield put(getCurrentUserSuccess(user as User));
    yield put(setTodoList((user as User).todoList as Todo[]));
  } catch (err) {
    yield put(getUsersFailure(err));
  }
}

export default function* usersSaga() {
  yield takeEvery(getUsersRequest.type, workGetUser);
}
