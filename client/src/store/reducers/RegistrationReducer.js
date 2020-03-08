import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from "../actions/RegisterAction";

export const INITIAL_STATE = { payload: {}, isLoading: false, error: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        isLoading: false
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};
