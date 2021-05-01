import { combineReducers } from 'redux';
import homePageReducer from '../components/Homepage/reducer';
import authReducer from '../components/auth/reducer';
import contentHomepageReducer from '../components/ContentHomepage/reducer';

const rootReducer = combineReducers({
  homePageReducer,
  authReducer,
  contentHomepageReducer,
});
export default rootReducer;
