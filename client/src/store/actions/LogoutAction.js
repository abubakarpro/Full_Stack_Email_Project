import axios from "axios";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export function logout() {
  return async dispatch => {
    dispatch({
      type: LOGOUT_REQUEST
    });

    //LOGOUT_SUCCESS
    dispatch({
      type: LOGOUT_SUCCESS
    });

    //LOGOUT_FAILURE
    dispatch({
      type: LOGOUT_FAILURE,
      error: "SomeThing wrong"
    });
  };
}
