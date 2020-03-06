import React, { Component } from "react";
import { connect } from "react-redux";
import { sentSingleMail } from "../store/actions/SentSingleMailAction";
import { updateEmailListItem } from "../store/actions/UpdateEmailListItemAction";
import Store from "../store/Store";
import { decode } from "jsonwebtoken";

class SentSingleMailItem extends Component {
  state = {
    user: ""
  };

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    this.setState({ user: user });

    this.props.sentSingleMail(this.props.match.params.id, token);
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevprops.mail !== this.props.mail) {
      if (this.props.mail) {
        this.props.updateEmailListItem(this.props.mail);
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <h2>{this.props.mail.subject}</h2>
        <hr />

        <div style={{ display: "inline" }}>
          {this.state.user && <span>{this.state.user.name}</span>}
        </div>
        <div>
          {this.props.mail.receiverId && (
            <span>To : {this.props.mail.receiverId.email}</span>
          )}
        </div>

        <div className="body-area" style={{ margin: "20px", border: "inset" }}>
          {this.props.mail.body}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  mail: state.SingleMail.mail
});

const mapDispatchToProps = { sentSingleMail, updateEmailListItem };

export default connect(mapStateToProps, mapDispatchToProps)(SentSingleMailItem);
