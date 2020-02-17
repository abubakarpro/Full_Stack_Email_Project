import {
  INBOX_REQUEST,
  INBOX_SUCCESS,
  INBOX_FAILURE
} from "../actions/InboxAction";

const INITIAL_STATE = { payload: [], isLoading: false, error: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INBOX_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case INBOX_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };
    case INBOX_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};
