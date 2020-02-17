import { combineReducers } from "redux";
import AuthReducer, { INITIAL_STATE as AuthIntialState } from "./AuthReducer";
import RegistrationReducer from "./RegistrationReducer";
import InboxReducer from "./InboxReducer";
import SentReducer from "./SentReducer";

const RootReducer = combineReducers(
  {
    Auth: AuthReducer,
    Registration: RegistrationReducer,
    Inbox: InboxReducer,
    Sent: SentReducer
  },
  {
    Auth: AuthIntialState
  }
);

export default RootReducer;
