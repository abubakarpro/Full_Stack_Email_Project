import React, { Component } from "react";
import Navbar from "../components/navbar";

export default ChildComponent => {
  class ComposedComponent extends Component {
    render() {
      return (
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-9">
            <ChildComponent {...this.props} />
          </div>
        </div>
      );
    }
  }

  return ComposedComponent;
};
