import { combineReducers } from "redux";
import LoginReducer, {
  INITIAL_STATE as LoginIntialState
} from "./LoginReducer";
import RegistrationReducer from "./RegistrationReducer";

const RootReducer = combineReducers(
  {
    Login: LoginReducer,
    Registration: RegistrationReducer
  },
  {
    Login: LoginIntialState
  }
);

export default RootReducer;
