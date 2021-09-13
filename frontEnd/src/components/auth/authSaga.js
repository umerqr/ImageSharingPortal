import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getUtil, postUtil } from '../../utils/api';
import { notificationWithIcon } from '../../utils/notification';
import { loginError, loginSuccess } from './actions';
import { DEFAULT_CONST, FETCH_USER_INFO } from './constants';

export function* loginFunction({ payload }) {
  const requestURL = `https://image-share-portal.herokuapp.com/api/login`;
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
      notificationWithIcon('success', `Successful`, `Logged In Successfully`);
    }
  } catch (err) {
    notificationWithIcon(
      'error',
      `Error`,
      `Wrong credentials or user does not exist`
    );
    console.log(`thissss?`);
    yield put(loginError(err));
  }
}
export function* fetchUserInfo() {
  const requestURL = `https://image-share-portal.herokuapp.com/api/fetchUserInfo`;
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
