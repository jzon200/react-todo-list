import { all, fork } from "redux-saga/effects";
import usersSaga from "../features/users/usersSaga";

export default function* rootSaga() {
  yield all([
    fork(usersSaga),
    // add more Sagas here
  ]);
}
