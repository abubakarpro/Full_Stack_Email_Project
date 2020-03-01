import axios from "axios";

export const COMPOSEDMAIL_REQUEST = "COMPOSEDMAIL_REQUEST";
export const COMPOSEDMAIL_SUCCESS = "COMPOSEDMAIL_SUCCESS";
export const COMPOSEDMAIL_FAILURE = "COMPOSEDMAIL_FAILURE";

export function composedMailFun(composedMail, token) {
  return async dispatch => {
    dispatch({
      type: COMPOSEDMAIL_REQUEST
    });

    //Api Request
    //COMPOSEDMAIL_SUCCESS
    axios
      .post("http://localhost:3002/api/mails/composed", composedMail, {
        headers: { "x-auth-token": token }
      })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: COMPOSEDMAIL_SUCCESS,
          payload: res.data.payload //res.data , res.header , res.status
        });
      })

      //COMPOSEDMAIL_FAILURE
      .catch(err => {
        console.log(err);
        dispatch({
          type: COMPOSEDMAIL_FAILURE,
          error: err.response.data.payload
        });
      });
  };
}
