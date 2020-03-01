import axios from "axios";

export const SINGLEMAIL_REQUEST = "SINGLEMAIL_REQUEST";
export const SINGLEMAIL_SUCCESS = "SINGLEMAIL_SUCCESS";
export const SINGLEMAIL_FAILURE = "SINGLEMAIL_FAILURE";

export function singleMail(id, token) {
  return async dispatch => {
    dispatch({
      type: SINGLEMAIL_REQUEST
    });

    //Api Request
    //SINGLEMAIL_SUCCESS
    axios
      .get(`http://localhost:3002/api/mails/${id}`, {
        headers: { "x-auth-token": token }
      })

      .then(res => {
        console.log(res.data);
        dispatch({
          type: SINGLEMAIL_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //SINGLEMAIL_FAILURE
      .catch(err => {
        dispatch({
          type: SINGLEMAIL_FAILURE,
          error: err.response.data.payload
        });
      });
  };
}
