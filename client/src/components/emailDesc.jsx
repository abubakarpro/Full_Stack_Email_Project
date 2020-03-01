import React, { Component } from "react";
import { connect } from "react-redux";
import { singleMail } from "../store/actions/SingleMailAction";
import Store from "../store/Store";
import { decode } from "jsonwebtoken";

class EmailDescription extends Component {
  state = {
    user: ""
  };

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    this.setState({ user: user });

    this.props.singleMail(this.props.match.params.id, token);
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.props.mail.subject}</h2>
        <div className="circle">{this.state.user.name}</div>
        <div>{this.props.mail.body}</div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  mail: state.SingleMail.payload
});

const mapDispatchToProps = { singleMail };

export default connect(mapStateToProps, mapDispatchToProps)(EmailDescription);
