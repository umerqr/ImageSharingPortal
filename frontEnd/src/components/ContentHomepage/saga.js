import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getUtil, postUtil } from '../../utils/api';
import { notificationWithIcon } from '../../utils/notification';
import {
  fetchListDataError,
  fetchListDataSuccess,
  fetchUserListDataError,
  fetchUserListDataSuccess,
  postListDataError,
  postListDataSuccess,
} from './actions';
import {
  FETCH_LIST_DATA,
  FETCH_USER_LIST_DATA,
  POST_USER_LIST_DATA,
} from './constants';

export function* fetchListData({ payload }) {
  const requestURL = `/api/imageData`;
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
  const requestURL = `https://image-share-portal.herokuapp.com/api/fetchUserData`;
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
export function* postUserListData({ payload }) {
  const requestURL = `/api/postUserImage`;
  const postObj = { items: payload };
  try {
    const response = yield call(postUtil, requestURL, postObj);
    if (response.status === 200) {
      const res = response;
      yield put(postListDataSuccess(res.data));
      notificationWithIcon('success', `Successful`, `Posted Successfully`);
    }
  } catch (err) {
    yield put(postListDataError(err));
  }
}
export function* contentHomepageSaga() {
  yield takeLatest(FETCH_LIST_DATA, fetchListData);
  yield takeLatest(FETCH_USER_LIST_DATA, fetchUserListData);
  yield takeLatest(POST_USER_LIST_DATA, postUserListData);
}
