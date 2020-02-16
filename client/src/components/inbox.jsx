import React, { Component } from "react";
import Store from "../store/Store";
import { decode } from "jsonwebtoken";
import requireAuth from "../hoc/requireAuth";

class Inbox extends Component {
  state = {};

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
  }
  render() {
    return (
      <React.Fragment>
        <div className="col-lg-6">Inbox</div>
      </React.Fragment>
    );
  }
}

export default requireAuth(Inbox);
