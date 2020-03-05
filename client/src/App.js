import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ComposedEmail from "./components/ComposedEmail";
import Login from "./components/Login";
import Register from "./components/Register";
import Inbox from "./components/Inbox";
import Sent from "./components/Sent";
import NotFound from "./components/NotFound";
import componentWithSideBar from "./hoc/componentWithSideBar";

import Store from "./store/Store";
import "./App.css";

function App(props) {
  return (
    <React.Fragment>
      <Provider store={Store}>
        <ToastContainer />
        <Route path="*" component={Header} />
        <div className="container-fluid">
          <div className="body">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/composedEmail" component={ComposedEmail} />
              <Route path="/inbox" component={componentWithSideBar(Inbox)} />
              <Route path="/sent" component={componentWithSideBar(Sent)} />
              <Route path="/" exact component={Login} />
              <Route path="/*" component={NotFound} />
            </Switch>
          </div>
          <div className="row"></div>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
