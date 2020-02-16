import React, { Component } from "react";
import Navbar from "./navbar";
import requireAuth from "../hoc/requireAuth";

class Container extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="col-lg-4">
          <Navbar />
        </div>
      </React.Fragment>
    );
  }
}

export default requireAuth(Container);
