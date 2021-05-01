import produce from 'immer';
import {
  DEFAULT_CONST,
  FETCH_USER_INFO_SUCCESS,
  LOGIN_SUCCESS,
} from './constants';

export const initialState = { count: 0, incomingToken: null, userInfo: null };

const authReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_CONST:
        draft.count += 1;
        break;
      case LOGIN_SUCCESS:
        draft.incomingToken = action.res.token;
        draft.userInfo = action.res.userInfo;
        break;
      case FETCH_USER_INFO_SUCCESS:
        draft.userInfo = action.res.userInfo;
        draft.incomingToken = action.res.token;
        break;
      default:
        break;
    }
  });

export default authReducer;
