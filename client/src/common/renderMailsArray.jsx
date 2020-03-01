import React, { Component } from "react";

import Notify from "../common/notify";

class RenderMails extends Component {
  state = {};

  handleClick = id => {
    if (this.props.Head === "Inbox") {
      this.props.history.push(`/inbox/${id}`);
    }
    if (this.props.Head === "Sent") {
      this.props.history.push(`/sent/${id}`);
    }
  };

  render() {
    const { Mails, Head, error } = this.props;
    return (
      <React.Fragment>
        <div
          style={{
            textAlign: "center",
            backgroundColor: "rosybrown",
            padding: "5px"
          }}
        >
          {Head}
        </div>
        {error && <Notify error={error} />}
        <table className="table table-hover table-sm">
          <thead>
            {/* <tr>
                <th scope="col">#</th>
              </tr> */}
          </thead>
          <tbody>
            {Mails.map(mail => (
              <tr
                onClick={() => this.handleClick(mail._id)}
                className="mail-row"
                key={mail._id}
              >
                <td>
                  {mail.senderId.name}
                  {mail.receiverId.name}
                </td>
                <td style={{ textAlign: "center" }}>
                  {mail.subject}

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

export default RenderMails;
