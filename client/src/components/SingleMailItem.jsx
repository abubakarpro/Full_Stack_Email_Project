import React, { Component } from "react";
import { connect } from "react-redux";
import { singleMail } from "../store/actions/SingleMailAction";
import { updateEmailListItem } from "../store/actions/UpdateEmailListItemAction";
import Store from "../store/Store";
import { decode } from "jsonwebtoken";

class SingleMailItem extends Component {
  state = {
    user: ""
  };

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    this.setState({ user: user });

    this.props.singleMail(this.props.match.params.id, token);
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
        <div className="circle">
          {this.state.user.name &&
            this.state.user.name.substr(0, 1).toUpperCase()}
        </div>
        <div>{this.props.mail.body}</div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  mail: state.SingleMail.payload
});

const mapDispatchToProps = { singleMail, updateEmailListItem };

export default connect(mapStateToProps, mapDispatchToProps)(SingleMailItem);
