import React, { Component } from "react";
import Store from "../store/Store";
import requireAuth from "../hoc/requireAuth";
import { connect } from "react-redux";
import { inbox } from "../store/actions/InboxAction";
import { decode } from "jsonwebtoken";

class Inbox extends Component {
  state = {};

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    console.log(user._id);
    this.props.inbox(token);
  }
  render() {
    const { receivedMails, error } = this.props;
    return (
      <React.Fragment>
        <div className="col-lg-6">
          {error ? (
            <ul>{error}</ul>
          ) : (
            <ul>
              {receivedMails.map(mail => (
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
  receivedMails: state.Inbox.payload,
  error: state.Inbox.error
});

const mapDispatchToProps = { inbox };

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Inbox));
