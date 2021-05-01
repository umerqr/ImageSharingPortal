import { takeLatest } from '@redux-saga/core/effects';
import { DEFAULT_CONST } from './constants';

export function* loginFunction() {
  console.log(`it came in here, caught it?`);
  //   yield put(setUserManagementSuccess());
}
export function* authSaga() {
  yield takeLatest(DEFAULT_CONST, loginFunction);
}
