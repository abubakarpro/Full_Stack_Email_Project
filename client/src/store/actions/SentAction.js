import axios from "axios";

export const SENT_REQUEST = "SENT_REQUEST";
export const SENT_SUCCESS = "SENT_SUCCESS";
export const SENT_FAILURE = "SENT_FAILURE";

export function sent(token) {
  return async dispatch => {
    dispatch({
      type: SENT_REQUEST
    });

    //Api Request
    //SENT_SUCCESS
    axios
      .get("http://localhost:3002/api/mails/sent", {
        headers: { "x-auth-token": token }
      })
      .then(res => {
        dispatch({
          type: SENT_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //SENT_FAILURE
      .catch(err => {
        dispatch({
          type: SENT_FAILURE,
          error: err.response.data.payload
        });
      });
  };
}
