import React, { Component } from "react";
import { resetPassword, sendOtp, verifyOtp } from "../actions/Users";
import "../styles/ResetPassword.css";

import { connect } from "react-redux";

export class ResetPassword extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
    errors: {},
    show_otp_field: false,
    inputField: true
  };

  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendOTP = e => {
    e.preventDefault();
    if (this.validateForm()) {
      let user = {
        emai: this.state.email
      };
      this.props.sendOtp(user);
    }
    this.setState({
      show_otp_field: true
    });
  };

  onReset = e => {
    e.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.resetPassword(user);
    this.setState({
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  verifyOTP = () => {
    let user = {
      otp: this.state.otp
    };
    if (this.props.verifyOtp(user)) {
      this.onReset();
    }
  };

  validateForm() {
    console.log("Hello");
    let errors = {};
    let formIsValid = true;
    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your Email-ID.";
    }

    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your Password.";
    }

    if (!this.state.confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please Enter Confirm Password";
    }

    if (this.state.password != this.state.confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Password Don't Match";
    }

    if (!this.state.otp) {
      formIsValid = false;
      errors["otp"] = "*Please Enter OTP";
    }
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div>
        <div id="resetPasswordMainContainer">
          <form id="resetPasswordForm">
            <p>
              <button id="resetButton">Reset Password</button>
            </p>
            <p>
              <input
                id="resetPasswordInput"
                placeholder="Email"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.OnChange}
              />
              <span></span>
            </p>
            <p id="resetPasswordErrorMessage">{this.state.errors.email}</p>
            <p>
              <input
                id="resetPasswordInput"
                placeholder="New Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.OnChange}
              />
            </p>
            <p id="resetPasswordErrorMessage">{this.state.errors.password}</p>
            <p>
              <input
                id="resetPasswordInput"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.OnChange}
              />
            </p>
            <p id="resetPasswordErrorMessage">
              {this.state.errors.confirmPassword}
            </p>
            {this.state.show_otp_field === true ? (
              <>
                <p>
                  <input
                    id="resetPasswordInput"
                    placeholder="Enter Otp"
                    type="password"
                    name="otp"
                    value={this.state.otp}
                    onChange={this.OnChange}
                  />
                </p>
                <p id="resetPasswordErrorMessage">{this.state.errors.otp}</p>
                <p>
                  <button onClick={this.verifyOTP} id="resetPasswordButton">
                    Reset
                  </button>
                </p>
              </>
            ) : (
              <p>
                <button onClick={this.sendOTP} id="resetPasswordButton">
                  Proceed
                </button>
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users,
  error: state.usersReducer.error
});

export default connect(
  mapStateToProps,
  { resetPassword, sendOtp, verifyOtp }
)(ResetPassword);
