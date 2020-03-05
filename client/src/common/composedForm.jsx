import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";
import Joi from "joi-browser";
import { composedMailFun } from "../store/actions/ComposedMailAction";
import { connect } from "react-redux";
import Store from "../store/Store";

const token = Store.getState().Auth.token;

class ComposedForm extends Component {
  state = {
    composedMail: {
      email: "",
      subject: "",
      body: ""
    },
    errors: {},
    mailsArray: [],
    isSentMail: true
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    subject: Joi.string()
      .required()
      .label("Subject"),
    body: Joi.string()
      .required()
      .label("Body")
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

    if (input.name === "email") {
      axios
        .get(`http://localhost:3002/api/users?q=${input.value}`)
        .then(res => {
          this.setState({ mailsArray: res.data.payload });
        })
        .catch(err => {
          console.log(err);
        });
    }
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

    const composedMail = { ...this.state.composedMail };
    composedMail.email = "";
    composedMail.subject = "";
    composedMail.body = "";
    this.setState({ composedMail });
    this.props.handleClose();
  };

  render() {
    const { composedMail, errors, mailsArray } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="To"
              list="emailsArray"
              value={composedMail.email}
              onChange={this.handleChange}
              required
            />
            {errors.email && (
              <div className="alert alert-danger">{errors.email}</div>
            )}
            <div>
              {mailsArray.map(m => (
                <datalist
                  style={{
                    position: "absolute",
                    marginLeft: "100px",
                    width: "100px"
                  }}
                  key={m._id}
                  id="emailsArray"
                >
                  <option value={m.email} />
                </datalist>
              ))}
            </div>
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
              name="body"
              row="20"
              placeholder="body"
              value={composedMail.body}
              onChange={this.handleChange}
              required
            ></textarea>
            {errors.body && (
              <div className="alert alert-danger">{errors.body}</div>
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
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-secondary"
              onClick={this.props.handleClose}
            >
              close
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  error: state.Composed.error
});

const mapDispatchToProps = { composedMailFun };

export default connect(mapStateToProps, mapDispatchToProps)(ComposedForm);
