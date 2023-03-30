import { all, fork } from "redux-saga/effects";
import usersSaga from "../features/users/usersSaga";
import addTodoSaga from "../features/todo/addTodoSaga";
import updateTodoSaga from "../features/todo/updateTodoSaga";

export default function* rootSaga() {
  yield all([
    fork(usersSaga),
    fork(addTodoSaga),
    fork(updateTodoSaga),
    // add more Sagas here
  ]);
}
