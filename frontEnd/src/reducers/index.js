import { combineReducers } from 'redux';
import homePageReducer from '../components/Homepage/reducer';
import authReducer from '../components/auth/reducer';

const rootReducer = combineReducers({ homePageReducer, authReducer });
export default rootReducer;
