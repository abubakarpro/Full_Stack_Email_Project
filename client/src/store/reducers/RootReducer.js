import { combineReducers } from "redux";
import AuthReducer, { INITIAL_STATE as AuthIntialState } from "./AuthReducer";
import RegistrationReducer from "./RegistrationReducer";
import InboxReducer from "./InboxReducer";
import SentReducer from "./SentReducer";
import SingleMailReducer from "./SingleMailReducer";
import ComposedMailReducer from "./ComposedMailReducer";

const RootReducer = combineReducers(
  {
    Auth: AuthReducer,
    Registration: RegistrationReducer,
    Inbox: InboxReducer,
    Sent: SentReducer,
    SingleMail: SingleMailReducer,
    Composed: ComposedMailReducer
  },
  {
    Auth: AuthIntialState
  }
);

export default RootReducer;
