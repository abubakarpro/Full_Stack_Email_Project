import React, { Component } from "react";
import Store from "../store/Store";
import requireAuth from "../hoc/requireAuth";
import Notify from "../common/notify";
import { connect } from "react-redux";
import { sent } from "../store/actions/SentAction";
import { decode } from "jsonwebtoken";

class Sent extends Component {
  state = {};

  componentDidMount() {
    const token = Store.getState().Auth.token;
    const user = decode(token);
    this.props.sent(token);
  }
  render() {
    const { sentMails, error } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "rosybrown",
            padding: "5px"
          }}
        >
          Sents Mails
        </div>

        {this.props.error && <Notify error={this.props.error} />}
        <table className="table table-hover table-sm">
          <thead>
            {/* <tr>
              <th scope="col">#</th>
            </tr> */}
          </thead>
          <tbody>
            {sentMails.map(mail => (
              <tr key={mail._id} onClick={this.handleClick}>
                <td>{mail.receiverId.name}</td>
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
  sentMails: state.Sent.payload,
  error: state.Sent.error
});

const mapDispatchToProps = { sent };

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Sent));
