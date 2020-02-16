import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/AuthAction";

const TOKEN = "token";

export const INITIAL_STATE = {
  token: localStorage.getItem(TOKEN) || "",
  isLoading: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      localStorage.setItem(TOKEN, action.payload);
      return {
        ...state,
        token: action.payload,
        isLoading: false
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};
