import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getUtil, postUtil } from '../../utils/api';
import {
  fetchListDataError,
  fetchListDataSuccess,
  fetchUserListDataError,
  fetchUserListDataSuccess,
} from './actions';
import { FETCH_LIST_DATA, FETCH_USER_LIST_DATA } from './constants';

export function* fetchListData({ payload }) {
  const requestURL = `http://localhost:8080/api/imageData`;
  // const requestURL = `http://localhost:8080/api/fetchUserData`;
  try {
    const response = yield call(getUtil, requestURL);
    if (response.status === 200) {
      const res = response;
      yield put(fetchListDataSuccess(res.data));
    }
  } catch (err) {
    yield put(fetchListDataError(err));
  }
}
export function* fetchUserListData({ payload }) {
  const requestURL = `http://localhost:8080/api/fetchUserData`;
  try {
    const response = yield call(getUtil, requestURL);
    if (response.status === 200) {
      const res = response;
      yield put(fetchUserListDataSuccess(res.data));
    }
  } catch (err) {
    yield put(fetchUserListDataError(err));
  }
}
export function* contentHomepageSaga() {
  yield takeLatest(FETCH_LIST_DATA, fetchListData);
  yield takeLatest(FETCH_USER_LIST_DATA, fetchUserListData);
}
