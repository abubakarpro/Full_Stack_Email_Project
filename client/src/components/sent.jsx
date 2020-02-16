import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";

class Sent extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div>Sent</div>
      </React.Fragment>
    );
  }
}

export default requireAuth(Sent);
