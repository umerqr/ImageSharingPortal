import { combineReducers } from 'redux';
import homePageReducer from '../components/Homepage/reducer';

const rootReducer = combineReducers({ homePageReducer });
export default rootReducer;
