import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export function login(account) {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });
    console.log(account);

    //Api Request
    //LOGIN_SUCCESS
    axios
      .post("http://localhost:3002/api/auth/", account)
      .then(res => {
        console.log(res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data //res.data , res.header , res.status
        });
        console.log(res.data);
      })

      //LOGIN_FAILURE
      .catch(err => {
        dispatch({
          type: LOGIN_FAILURE,
          error: err.response.data
        });
        console.log(err.response.data);
      });
  };
}
