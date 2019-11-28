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

  // Send OTP
  sendOTP = e => {
    e.preventDefault();
    if (this.validateForm()) {
      let user = {
        email: this.state.email
      };
      this.props.sendOtp(user);
    }
    this.setState({
      show_otp_field: true
    });
  };

  // Reset Password
  onReset = () => {
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.resetPassword(user);
  };

  // Verify OTP function
  verifyOTP = e => {
    e.preventDefault();
    let user = {
      otp: this.state.otp
    };
    if (this.props.verifyOtp(user)) {
      this.onReset();
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        otp: ""
      });
    }
  };

  // Function for validating form input fields
  validateForm() {
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

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div>
        {/* Reset password main conatiner */}
        <div id="resetPasswordMainContainer">
          {/* reset password form */}
          <form id="resetPasswordForm">
            <div>
              <button id="resetButton">Reset Password</button>
            </div>
            <input
              id="resetPasswordInput"
              placeholder="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.OnChange}
            />

            <p id="resetPasswordErrorMessage">{this.state.errors.email}</p>

            <input
              id="resetPasswordInput"
              placeholder="New Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.OnChange}
            />

            <p id="resetPasswordErrorMessage">{this.state.errors.password}</p>

            <input
              id="resetPasswordInput"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.OnChange}
            />

            <p id="resetPasswordErrorMessage">
              {this.state.errors.confirmPassword}
            </p>

            {/* Checking the state of otp filed , if the filed is true then show otp fileds */}
            {this.state.show_otp_field === true ? (
              <>
                <input
                  id="resetPasswordInput"
                  placeholder="Enter Otp"
                  type="password"
                  name="otp"
                  value={this.state.otp}
                  onChange={this.OnChange}
                />

                <p>{this.props.error ? this.props.error : "Hello"}</p>

                <p id="resetPasswordErrorMessage">{this.state.errors.otp}</p>

                <button onClick={this.verifyOTP} id="resetPasswordButton">
                  Reset
                </button>
              </>
            ) : (
              <button onClick={this.sendOTP} id="resetPasswordButton">
                Proceed
              </button>
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

export default connect(mapStateToProps, { resetPassword, sendOtp, verifyOtp })(
  ResetPassword
);
