import { all } from 'redux-saga/effects';

import { authSaga } from '../components/auth/authSaga';
import { contentHomepageSaga } from '../containers/ContentHomepage/saga';

export default function* rootSaga() {
  yield all([authSaga(), contentHomepageSaga()]);
}
