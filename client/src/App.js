import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import ComposedEmail from "./components/composedEmail";
import Login from "./components/login";
import Register from "./components/register";
import Inbox from "./components/inbox";
import Sent from "./components/sent";
import NotFound from "./components/notFound";
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
