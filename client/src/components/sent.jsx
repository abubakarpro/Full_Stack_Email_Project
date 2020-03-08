import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";
import { Route, Switch } from "react-router-dom";
import RenderMails from "../common/RenderMailsArray";
import SentSingleMailItem from "./SentSingleMailItem";
import { connect } from "react-redux";
import { sent } from "../store/actions/SentAction";

class Sent extends Component {
  componentDidMount() {
    this.props.sent(this.props.token);
  }

  render() {
    const { sentMails, error } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route
            path="/sent/:id"
            render={props => {
              return <SentSingleMailItem {...props} />;
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
  error: state.Sent.error,
  token: state.Auth.token
});

const mapDispatchToProps = { sent };

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Sent));
