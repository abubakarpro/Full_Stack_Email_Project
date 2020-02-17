import {
  SENT_REQUEST,
  SENT_SUCCESS,
  SENT_FAILURE
} from "../actions/SentAction";

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
    default:
      return state;
  }
};
