import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";
import { connect } from "react-redux";
import { logout } from "../store/actions/LogoutAction";

class Logout extends Component {
  state = {};

  handlelogout = () => {
    this.props.logout();
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handlelogout}>Logout</button>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(requireAuth(Logout));
