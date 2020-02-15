import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
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
          <div className="body"></div>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/" exact component={Login} />
            <Route path="/*" component={NotFound} />
          </Switch>
          <div className="row">
            {/* <div className="col-lg-3">
            <Navbar />
          </div> */}
          </div>
        </div>
      </Provider>
    </React.Fragment>
  );
}

export default App;
