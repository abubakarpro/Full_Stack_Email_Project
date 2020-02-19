import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function login(account) {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });

    //Api Request
    //LOGIN_SUCCESS
    axios
      .post("http://localhost:3002/api/auth/", account)
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //LOGIN_FAILURE
      .catch(err => {
        dispatch({
          type: LOGIN_FAILURE,
          error: err.response.data.payload
        });
      });
  };
}
