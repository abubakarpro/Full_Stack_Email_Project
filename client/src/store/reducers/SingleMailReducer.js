import {
  INBOXSINGLEMAIL_REQUEST,
  INBOXSINGLEMAIL_SUCCESS,
  INBOXSINGLEMAIL_FAILURE
} from "../actions/InboxSingleMailAction";

import {
  SENTSINGLEMAIL_REQUEST,
  SENTSINGLEMAIL_SUCCESS,
  SENTSINGLEMAIL_FAILURE
} from "../actions/SentSingleMailAction";

const INITIAL_STATE = { mail: {}, isLoading: false, error: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INBOXSINGLEMAIL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case INBOXSINGLEMAIL_SUCCESS:
      return {
        ...state,
        mail: action.payload
      };
    case INBOXSINGLEMAIL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };

    //Sent
    case SENTSINGLEMAIL_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case SENTSINGLEMAIL_SUCCESS:
      return {
        ...state,
        mail: action.payload
      };
    case SENTSINGLEMAIL_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    default:
      return state;
  }
};
