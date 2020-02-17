import React, { Component } from "react";
import Store from "../store/Store";
import requireAuth from "../hoc/requireAuth";
import { connect } from "react-redux";
import { sent } from "../store/actions/SentAction";
import { decode } from "jsonwebtoken";

class Sent extends Component {
  state = {};

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    console.log(user._id);
    this.props.sent(token);
  }
  render() {
    const { sentMails, error } = this.props;
    return (
      <React.Fragment>
        <div className="col-lg-6">
          {error ? (
            <ul>{error}</ul>
          ) : (
            <ul>
              {sentMails.map(mail => (
                <li key={mail._id}>{mail.subject}</li>
              ))}
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  sentMails: state.Sent.payload,
  error: state.Sent.error
});

const mapDispatchToProps = { sent };

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Sent));
