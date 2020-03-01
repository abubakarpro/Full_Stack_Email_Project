import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import requireAuth from "../hoc/requireAuth";
import RenderMails from "../common/renderMailsArray";
import EmailDescription from "./emailDesc";
import { connect } from "react-redux";
import { inbox } from "../store/actions/InboxAction";

class Inbox extends Component {
  state = {};

  componentDidMount() {
    this.props.inbox();
  }

  handleClick = () => {
    console.log("done");
  };
  render() {
    const { receivedMails, error } = this.props;
    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/inbox/:id"
            render={props => {
              return <EmailDescription {...props} />;
            }}
          />
          <Route
            path="/inbox"
            render={props => {
              return (
                <RenderMails
                  {...props}
                  Mails={receivedMails}
                  error={error}
                  Head={"Inbox"}
                />
              );
            }}
          />
        </Switch>
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
