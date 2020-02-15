import React, { Component } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { register } from "../store/actions/RegisterAction";

class Register extends Component {
  state = {
    account: {
      name: "",
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string()

      .required()
      .min(5)
      .label("Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
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
    const account = { ...this.state.account };
    account[input.name] = input.value;

    // if (account["email"]) {
    //   console.log(account["email"]);
    // }

    this.setState({ account, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.props.register(this.state.account);
    const account = { ...this.state.account };
    account.name = "";
    account.email = "";
    account.password = "";
    this.setState({ account });
    toast.success("User Successfully Registerd");
    this.props.history.push("/");
  };

  render() {
    const { account, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container ">
          <div className="row justify-content-center align-items-center">
            <form className="col-lg-4" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <legend>
                  <center>
                    <h2>
                      <b>Create your Account</b>
                    </h2>
                  </center>
                </legend>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={account.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                />
                {errors.name && (
                  <div className="alert alert-danger">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={account.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="alert alert-danger">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={account.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
                {errors.password && (
                  <div className="alert alert-danger">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <button
                  disabled={this.validate()}
                  type="submit"
                  className="btn btn-primary"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  account: state.Registration.payload,
  error: state.Registration.error
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
