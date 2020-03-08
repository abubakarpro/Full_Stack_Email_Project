import { combineReducers } from "redux";
import AuthReducer, { INITIAL_STATE as AuthIntialState } from "./AuthReducer";
import RegistrationReducer, {
  INITIAL_STATE as RegistrationInitialState
} from "./RegistrationReducer";
import InboxReducer, {
  INITIAL_STATE as InboxInitialState
} from "./InboxReducer";
import SentReducer, { INITIAL_STATE as SentInitialState } from "./SentReducer";
import SingleMailReducer, {
  INITIAL_STATE as SingleMailInitialState
} from "./SingleMailReducer";
import ComposedMailReducer, {
  INITIAL_STATE as ComposedMailInitialState
} from "./ComposedMailReducer";
import _ from "lodash";

import { RESET_STORE } from "../actions/ResetStoreAction";

export const initalState = {
  Auth: AuthIntialState,
  Registration: RegistrationInitialState,
  Inbox: InboxInitialState,
  Sent: SentInitialState,
  SingleMail: SingleMailInitialState,
  Composed: ComposedMailInitialState
};

const RootReducer = combineReducers(
  {
    Auth: AuthReducer,
    Registration: RegistrationReducer,
    Inbox: InboxReducer,
    Sent: SentReducer,
    SingleMail: SingleMailReducer,
    Composed: ComposedMailReducer
  },
  initalState
);

export default (state, action) => {
  switch (action.type) {
    case RESET_STORE:
      console.log("RESET_STORE");
      return _.cloneDeep(initalState);
    default:
      return RootReducer(state, action);
  }
};
