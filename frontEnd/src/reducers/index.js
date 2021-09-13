import { combineReducers } from 'redux';
import homePageReducer from '../containers/Homepage/reducer';
import authReducer from '../containers/auth/reducer';
import contentHomepageReducer from '../containers/ContentHomepage/reducer';
// import contentHomepageReducer from '../components/ContentHomepage/reducer';

const rootReducer = combineReducers({
  homePageReducer,
  authReducer,
  contentHomepageReducer,
});
export default rootReducer;
