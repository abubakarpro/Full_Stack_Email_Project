import React, { Component } from "react";
import { connect } from "react-redux";

class Notify extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div>
          {this.props.error && (
            <div className="alert alert-danger">{this.props.error}</div>
          )}
          {this.props.token && this.props.history.push("/container")}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isloading: state.Login.isloading,
  token: state.Login.token,
  error: state.Login.error
});

export default connect(mapStateToProps, null)(Notify);
