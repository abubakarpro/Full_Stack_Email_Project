import React, { Component } from "react";
import { connect } from "react-redux";
import { inboxSingleMail } from "../store/actions/InboxSingleMailAction";
import { updateEmailListItem } from "../store/actions/UpdateEmailListItemAction";
import Store from "../store/Store";
import { decode } from "jsonwebtoken";

class InboxSingleMailItem extends Component {
  state = {
    user: ""
  };

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    this.setState({ user: user });

    this.props.inboxSingleMail(this.props.match.params.id, token);
  }

  componentDidUpdate(prevprops, prevstate) {
    if (prevprops.mail !== this.props.mail) {
      if (this.props.mail) {
        this.props.updateEmailListItem(this.props.mail);
      }
    }
  }

  render() {
    console.log(this.props.mail);
    return (
      <React.Fragment>
        <h2>{this.props.mail.subject}</h2>
        <hr />

        <div style={{ display: "inline" }}>
          {this.props.mail.senderId && (
            <span>
              {this.props.mail.senderId.name} : {this.props.mail.senderId.email}
            </span>
          )}
        </div>
        <br />
        <span>To me</span>
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

const mapDispatchToProps = { inboxSingleMail, updateEmailListItem };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InboxSingleMailItem);
