import axios from "axios";
import Store from "../Store";

export const INBOX_REQUEST = "INBOX_REQUEST";
export const INBOX_SUCCESS = "INBOX_SUCCESS";
export const INBOX_FAILURE = "INBOX_FAILURE";

export function inbox() {
  return async dispatch => {
    const token = Store.getState().Auth.token;
    dispatch({
      type: INBOX_REQUEST
    });

    //Api Request
    //INBOX_SUCCESS
    axios
      .get("http://localhost:3002/api/mails/inbox/", {
        headers: { "x-auth-token": token }
      })
      .then(res => {
        dispatch({
          type: INBOX_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //INBOX_FAILURE
      .catch(err => {
        dispatch({
          type: INBOX_FAILURE,
          error: err.response.data.payload
        });
      });
  };
}
