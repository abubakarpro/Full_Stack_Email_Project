import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  return class ComposedComponent extends Component {
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
      return <ChildComponent {...this.props} />;
    }
  };

  const mapStateToProps = state => ({
    token: state.Login.token
  });

  return connect(mapStateToProps)(ChildComponent);
};
