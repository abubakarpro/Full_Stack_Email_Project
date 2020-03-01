import React, { Component } from "react";
import Logout from "./logout";

class Header extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="jumbotron">
          <h1 style={{ fontFamily: "auto", bold: "10px" }}>Email Project</h1>
          <Logout history={this.props.history} />
          {/* <div className="row">
          <button>Logout</button>
        </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
