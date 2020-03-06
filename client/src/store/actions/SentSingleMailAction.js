import axios from "axios";

export const SENTSINGLEMAIL_REQUEST = "SENTSINGLEMAIL_REQUEST";
export const SENTSINGLEMAIL_SUCCESS = "SENTSINGLEMAIL_SUCCESS";
export const SENTSINGLEMAIL_FAILURE = "SENTSINGLEMAIL_FAILURE";

export function sentSingleMail(id, token) {
  return async dispatch => {
    dispatch({
      type: SENTSINGLEMAIL_REQUEST
    });

    //Api Request
    //SENTSINGLEMAIL_SUCCESS
    axios
      .get(`http://localhost:3002/api/mails/sent/${id}`, {
        headers: { "x-auth-token": token }
      })

      .then(res => {
        dispatch({
          type: SENTSINGLEMAIL_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //SENTSINGLEMAIL_FAILURE
      .catch(err => {
        dispatch({
          type: SENTSINGLEMAIL_FAILURE,
          error: err.response.data.payload
        });
      });
  };
}
