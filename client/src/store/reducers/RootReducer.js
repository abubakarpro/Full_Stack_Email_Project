import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import RegistrationReducer from "./RegistrationReducer";

const RootReducer = combineReducers({
  Login: LoginReducer,
  Registration: RegistrationReducer
});

export default RootReducer;
