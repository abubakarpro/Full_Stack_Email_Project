import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import requireAuth from "./hoc/requireAuth";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Container from "./components/container";
import Login from "./components/login";
import Register from "./components/register";
import Inbox from "./components/inbox";
import Sent from "./components/sent";
import NotFound from "./components/notFound";

import Store from "./store/Store";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Provider store={Store}>
        <ToastContainer />
        <Header />
        <div className="container-fluid">
          <div className="body">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/container" component={Container} />
              <Route path="/inbox" component={Inbox} />
              <Route path="/sent" component={Sent} />
              <Route path="/" exact component={Login} />
              <Route path="/*" component={NotFound} />
            </Switch>
          </div>
          <div className="row">{/* <Container /> */}</div>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
