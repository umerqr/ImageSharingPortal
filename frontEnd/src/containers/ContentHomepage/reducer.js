import produce from 'immer';
import {
  FETCH_LIST_DATA_SUCCESS,
  FETCH_USER_LIST_DATA_SUCCESS,
} from './constants';

export const initialState = { listData: [], userListData: [] };

const contentHomepageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_LIST_DATA_SUCCESS:
        draft.listData = action.res.items;
        break;
      case FETCH_USER_LIST_DATA_SUCCESS:
        draft.userListData = action.res.items;
        break;
      default:
        break;
    }
  });

export default contentHomepageReducer;
