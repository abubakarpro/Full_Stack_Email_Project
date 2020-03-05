import {
  SENT_REQUEST,
  SENT_SUCCESS,
  SENT_FAILURE
} from "../actions/SentAction";

import { UPDATE_EMAIL_LIST_ITEM } from "../actions/UpdateEmailListItemAction";

const INITIAL_STATE = { payload: [], isLoading: false, error: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SENT_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };
    case SENT_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case UPDATE_EMAIL_LIST_ITEM:
      const newstate = state.payload.map(e => {
        if (e._id === action.payload._id) {
          return action.payload;
        }
        return e;
      });
      return {
        ...state,
        payload: newstate
      };
    default:
      return state;
  }
};
