import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getUtil, postUtil } from '../../utils/api';
import { loginError, loginSuccess } from './actions';
import { DEFAULT_CONST, FETCH_USER_INFO } from './constants';

export function* loginFunction({ payload }) {
  const requestURL = `http://localhost:8080/api/login`;
  const { email, password } = payload;
  const loginData = {
    email,
    password,
  };
  try {
    const response = yield call(postUtil, requestURL, loginData);
    if (response.status === 200) {
      const res = response;
      yield put(loginSuccess(res.data));
    }
  } catch (err) {
    yield put(loginError(err));
  }
}
export function* fetchUserInfo() {
  const requestURL = `http://localhost:8080/api/fetchUserInfo`;
  try {
    const response = yield call(getUtil, requestURL);
    if (response.status === 200) {
      const res = response;
      yield put(loginSuccess(res.data));
    }
  } catch (err) {
    yield put(loginError(err));
  }
}
export function* authSaga() {
  yield takeLatest(DEFAULT_CONST, loginFunction);
  yield takeLatest(FETCH_USER_INFO, fetchUserInfo);
}
