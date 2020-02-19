import React, { Component } from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import { connect } from "react-redux";
import { login } from "../store/actions/AuthAction";
import Notify from "../common/notify";
class Login extends Component {
  state = {
    account: {
      email: "",
      password: ""
    },
    errors: {}
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.history.push("/inbox");
    }
  }

  componentDidUpdate() {
    if (this.props.token) {
      this.props.history.push("/inbox");
    }
  }

  schema = {
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
    this.setState({ account, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.props.login(this.state.account);

    const account = { ...this.state.account };
    account.email = "";
    account.password = "";
    this.setState({ account });
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
                      <b>Login</b>
                    </h2>
                  </center>
                </legend>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={account.email}
                  onChange={this.handleChange}
                  required
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
                  placeholder="Password"
                  value={account.password}
                  onChange={this.handleChange}
                  required
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
                  Login
                </button>
                <Link
                  style={{
                    marginLeft: "10px",
                    fontFamily: "auto",
                    textDecoration: "none"
                  }}
                  to="/register"
                >
                  Create account
                </Link>
              </div>
              {this.props.error && <Notify error={this.props.error} />}
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isloading: state.Auth.isloading,
  token: state.Auth.token,
  error: state.Auth.error
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
