import {
  SINGLEMAIL_REQUEST,
  SINGLEMAIL_SUCCESS,
  SINGLEMAIL_FAILURE
} from "../actions/SingleMailAction";

const INITIAL_STATE = { payload: {}, isLoading: false, error: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SINGLEMAIL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SINGLEMAIL_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };
    case SINGLEMAIL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};
