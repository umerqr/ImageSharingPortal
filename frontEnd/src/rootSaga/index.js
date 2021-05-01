import { all } from 'redux-saga/effects';

import { authSaga } from '../components/auth/authSaga';

export default function* rootSaga() {
  yield all[authSaga];
}
