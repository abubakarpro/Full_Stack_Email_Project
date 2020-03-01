import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    state = {
      axiosConfig: {
        headers: { "x-auth-token": this.props.token }
      }
    };
    componentDidMount() {
      this.shouldNavigateAway();
    }
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.token) {
        this.props.history.push("/");
      }
    }
    render() {
      return this.props.token ? <ChildComponent {...this.props} /> : "";
    }
  }

  const mapStateToProps = state => ({
    token: state.Auth.token
  });

  return connect(mapStateToProps)(ComposedComponent);
};
