import { combineReducers } from "redux";
import AuthReducer, { INITIAL_STATE as AuthIntialState } from "./AuthReducer";
import RegistrationReducer from "./RegistrationReducer";

const RootReducer = combineReducers(
  {
    Auth: AuthReducer,
    Registration: RegistrationReducer
  },
  {
    Auth: AuthIntialState
  }
);

export default RootReducer;
