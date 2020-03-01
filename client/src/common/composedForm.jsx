import React, { Component } from "react";
import _ from "lodash";
import Joi from "joi-browser";
import { composedMailFun } from "../store/actions/ComposedMailAction";
import { connect } from "react-redux";
import Store from "../store/Store";

class ComposedForm extends Component {
  state = {
    composedMail: {
      email: "",
      subject: "",
      message: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    subject: Joi.string()
      .required()
      .label("Subject"),
    message: Joi.string()
      .required()
      .label("message")
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const composedMail = { ...this.state.composedMail };
    composedMail[input.name] = input.value;
    this.setState({ composedMail, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const token = Store.getState().Auth.token;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.props.composedMailFun(this.state.composedMail, token);
    console.log("sent email");

    const composedMail = { ...this.state.composedMail };
    composedMail.email = "";
    composedMail.subject = "";
    composedMail.message = "";
    this.setState({ composedMail });
  };

  render() {
    const { composedMail, errors } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="To"
              value={composedMail.email}
              onChange={this.handleChange}
              required
            />
            {errors.email && (
              <div className="alert alert-danger">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="subject"
              placeholder="subject"
              value={composedMail.subject}
              onChange={this.handleChange}
              required
            />
            {errors.subject && (
              <div className="alert alert-danger">{errors.subject}</div>
            )}
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="message"
              row="20"
              placeholder="message"
              value={composedMail.message}
              onChange={this.handleChange}
              required
            ></textarea>
            {errors.message && (
              <div className="alert alert-danger">{errors.message}</div>
            )}
          </div>

          <div className="form-group">
            <button
              disabled={this.validate()}
              type="submit"
              className="btn btn-primary"
            >
              send
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { composedMailFun };

export default connect(null, mapDispatchToProps)(ComposedForm);
