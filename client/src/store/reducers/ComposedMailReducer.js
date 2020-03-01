import {
  COMPOSEDMAIL_REQUEST,
  COMPOSEDMAIL_SUCCESS,
  COMPOSEDMAIL_FAILURE
} from "../actions/ComposedMailAction";

const INITIAL_STATE = { payload: "", isLoading: false, error: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPOSEDMAIL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case COMPOSEDMAIL_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        isLoading: false
      };

    case COMPOSEDMAIL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};
