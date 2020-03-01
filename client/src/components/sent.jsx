import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";
import { Route, Switch } from "react-router-dom";
import RenderMails from "../common/renderMailsArray";
import EmailDescription from "./emailDesc";
import { connect } from "react-redux";
import { sent } from "../store/actions/SentAction";

class Sent extends Component {
  state = {};

  componentDidMount() {
    this.props.sent();
  }
  render() {
    const { sentMails, error } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/sent/:id"
            render={props => {
              return <EmailDescription {...props} />;
            }}
          />
          <Route
            path="/sent"
            render={props => (
              <RenderMails
                {...props}
                Mails={sentMails}
                error={error}
                Head={"Sent"}
              />
            )}
          />
        </Switch>
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
