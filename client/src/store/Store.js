import { createStore, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import AllReducers from "./reducers/RootReducer";

const store = createStore(AllReducers, {}, applyMiddleware(Thunk));

export default store;
