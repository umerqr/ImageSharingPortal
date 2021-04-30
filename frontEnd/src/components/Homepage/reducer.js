import produce from 'immer';
import { DEFAULT_CONST } from './constants';

export const initialState = { count: 0 };

const homePageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_CONST:
        draft.count += 1;
        break;
      default:
        break;
    }
  });

export default homePageReducer;
