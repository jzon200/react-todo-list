import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getCurrentUserSuccess,
  getUsersFailure,
  getUsersRequest,
  getUsersSuccess,
} from "./usersSlice";

function getUsers() {
  return axios.get("http://localhost:8080/users").then((res) => res.data);
}

async function getUser() {
  const res = await axios.get("http://localhost:8080/users/Edzon");
  return res.data;
}

function* workGetUsers(): Generator<any> {
  try {
    const users = yield call(getUsers);
    yield put(getUsersSuccess(users as User[]));
  } catch (err) {
    yield put(getUsersFailure(err as Error));
  }
}

function* workGetUser(): Generator<any> {
  try {
    const user = yield call(getUser);
    yield put(getCurrentUserSuccess(user as User));
  } catch (err) {
    yield put(getUsersFailure(err as Error));
  }
}

export default function* usersSaga() {
  yield takeEvery(getUsersRequest.type, workGetUser);
}
