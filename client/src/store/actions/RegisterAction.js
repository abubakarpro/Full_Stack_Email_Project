import axios from "axios";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export function register(account) {
  return async dispatch => {
    dispatch({
      type: REGISTER_REQUEST
    });

    //Api Request
    //REGISTER_SUCCESS
    axios
      .post("http://localhost:3002/api/users/", account)
      .then(res => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //REGISTER_FAILURE
      .catch(err => {
        dispatch({
          type: REGISTER_FAILURE,
          error: err.response.data
        });
        console.log(err.response.data);
      });
  };
}
