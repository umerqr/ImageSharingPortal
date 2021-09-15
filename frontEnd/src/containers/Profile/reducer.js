import produce from 'immer';
import { DEFAULT_CONST } from './constants';

export const initialState = { defaultState: [] };

const profileReducer = (state = initialState, action) =>
  produce(state, (/*draft*/) => {
    switch (action.type) {
      case DEFAULT_CONST:
        break;
      default:
        break;
    }
  });

export default profileReducer;
