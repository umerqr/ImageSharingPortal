import { all } from 'redux-saga/effects';

import { authSaga } from '../containers/auth/authSaga';
import { contentHomepageSaga } from '../containers/ContentHomepage/saga';
import { librarySaga } from '../containers/Library/saga';
import { profileSaga } from '../containers/Profile/saga';
import { usersSaga } from '../containers/Users/saga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    contentHomepageSaga(),
    librarySaga(),
    profileSaga(),
    usersSaga(),
  ]);
}
