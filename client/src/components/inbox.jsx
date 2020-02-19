import React, { Component } from "react";
import Store from "../store/Store";
import requireAuth from "../hoc/requireAuth";
import Notify from "../common/notify";
import { connect } from "react-redux";
import { inbox } from "../store/actions/InboxAction";
import { decode } from "jsonwebtoken";

class Inbox extends Component {
  state = {};

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    this.props.inbox(token);
  }

  handleClick = () => {
    console.log("done");
  };
  render() {
    const { receivedMails, error } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "rosybrown",
            padding: "5px"
          }}
        >
          Inbox Mails
        </div>
        {this.props.error && <Notify error={this.props.error} />}

        <table className="table table-hover table-sm">
          <thead>
            {/* <tr>
                <th scope="col">#</th>
              </tr> */}
          </thead>
          <tbody>
            {receivedMails.map(mail => (
              <tr
                className="mail-row"
                key={mail._id}
                onClick={this.handleClick}
              >
                <td>{mail.senderId.name}</td>
                <td style={{ textAlign: "center" }}>
                  {mail.subject}-
                  <span style={{ color: "gray" }}>
                    {mail.body.substr(0, 50)}...
                  </span>
                </td>
                <td>{mail.date.substr(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
