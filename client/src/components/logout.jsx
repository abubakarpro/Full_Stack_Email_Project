import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";
import { connect } from "react-redux";
import { logout } from "../store/actions/LogoutAction";
import { resetStore } from "../store/actions/ResetStoreAction";
import { decode } from "jsonwebtoken";

class Logout extends Component {
  state = {
    currentUser: ""
  };

  componentDidMount() {
    const user = decode(this.props.token);
    this.setState({ currentUser: user.name });
  }

  handlelogout = () => {
    this.props.logout();
    this.props.resetStore();
  };
  render() {
    return (
      <React.Fragment>
        <div>
          <div className="circle">
            {this.state.currentUser.substr(0, 1).toUpperCase()}
          </div>
          <button onClick={this.handlelogout}>Logout</button>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  token: state.Auth.token
});

const mapDispatchToProps = { logout, resetStore };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(requireAuth(Logout));
