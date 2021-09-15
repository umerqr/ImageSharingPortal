import { combineReducers } from 'redux';
import homePageReducer from '../containers/Homepage/reducer';
import authReducer from '../containers/auth/reducer';
import contentHomepageReducer from '../containers/ContentHomepage/reducer';
import libraryReducer from '../containers/Library/reducer';
import usersReducer from '../containers/Users/reducer';
import profileReducer from '../containers/Profile/reducer';
// import contentHomepageReducer from '../components/ContentHomepage/reducer';

const rootReducer = combineReducers({
  homePageReducer,
  authReducer,
  contentHomepageReducer,
  libraryReducer,
  usersReducer,
  profileReducer,
});
export default rootReducer;
