import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";

class ComposedEmail extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="">fkjshdkfshdkf</div>
      </React.Fragment>
    );
  }
}

export default requireAuth(ComposedEmail);
