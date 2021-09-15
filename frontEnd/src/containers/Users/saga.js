import { call, put, takeLatest } from '@redux-saga/core/effects';
import { getUtil } from '../../utils/api';
import { defaultAction } from './actions';
import { DEFAULT_CONST } from './constants';

export function* defaultFunc() {
  const requestURL = `/api/defaultApi`;
  try {
    const response = yield call(getUtil, requestURL);
    if (response.status === 200) {
      const res = response;
      yield put(defaultAction(res));
    }
  } catch (err) {
    yield put(defaultAction(err));
  }
}

export function* usersSaga() {
  yield takeLatest(DEFAULT_CONST, defaultFunc);
}
