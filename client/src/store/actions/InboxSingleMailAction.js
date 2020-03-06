import axios from "axios";

export const INBOXSINGLEMAIL_REQUEST = "INBOXSINGLEMAIL_REQUEST";
export const INBOXSINGLEMAIL_SUCCESS = "INBOXSINGLEMAIL_SUCCESS";
export const INBOXSINGLEMAIL_FAILURE = "INBOXSINGLEMAIL_FAILURE";

export function inboxSingleMail(id, token) {
  return async dispatch => {
    dispatch({
      type: INBOXSINGLEMAIL_REQUEST
    });

    //Api Request
    //INBOXSINGLEMAIL_SUCCESS
    axios
      .get(`http://localhost:3002/api/mails/inbox/${id}`, {
        headers: { "x-auth-token": token }
      })

      .then(res => {
        dispatch({
          type: INBOXSINGLEMAIL_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //INBOXSINGLEMAIL_FAILURE
      .catch(err => {
        dispatch({
          type: INBOXSINGLEMAIL_FAILURE,
          error: err.response.data.payload
        });
      });
  };
}
