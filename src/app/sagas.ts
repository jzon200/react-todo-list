import { all, fork } from "redux-saga/effects";
import usersSaga from "../features/users/usersSaga";
import addTodoSaga from "../features/todo/addTodoSaga";
import updateTodoSaga from "../features/todo/updateTodoSaga";
import deleteTodoSaga from "../features/todo/deleteTodoSaga";

export default function* rootSaga() {
  yield all([
    fork(usersSaga),
    fork(addTodoSaga),
    fork(updateTodoSaga),
    fork(deleteTodoSaga),
    // add more Sagas here
  ]);
}
