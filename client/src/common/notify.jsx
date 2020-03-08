import React, { Component } from "react";

class Notify extends Component {
  state = {};

  render() {
    const { error } = this.props;
    return (
      <React.Fragment>
        {error && <div className="alert alert-danger">{error}</div>}
      </React.Fragment>
    );
  }
}

export default Notify;
