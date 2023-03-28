import { all, fork } from "redux-saga/effects";
import usersSaga from "../features/users/usersSaga";
import addTodoSaga from "../features/todo/addTodoSaga";

export default function* rootSaga() {
  yield all([
    fork(usersSaga),
    fork(addTodoSaga),
    // add more Sagas here
  ]);
}
