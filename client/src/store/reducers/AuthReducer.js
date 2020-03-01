//IMPORT LOGIN_CONST
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/AuthAction";

//IMPORT LOGOUT_CONST
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from "../actions/LogoutAction";

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

    //LOGOUT_CASES
    case LOGOUT_REQUEST:
      return {
        ...state,
        isloading: true
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem(TOKEN);
      return {
        ...state,
        token: "",
        isloading: false
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
