import { all, fork } from "redux-saga/effects";
import addTodoSaga from "../features/todo/sagas/addTodoSaga";
import deleteTodoSaga from "../features/todo/sagas/deleteTodoSaga";
import getTodoListSaga from "../features/todo/sagas/getTodoListSaga";
import updateTodoSaga from "../features/todo/sagas/updateTodoSaga";

export default function* rootSaga() {
  yield all([
    fork(getTodoListSaga),
    fork(addTodoSaga),
    fork(updateTodoSaga),
    fork(deleteTodoSaga),
    // add more Sagas here
  ]);
}
