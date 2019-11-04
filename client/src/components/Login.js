import React, { Component } from "react";
import { login } from "../actions/Users";
import "../styles/Login.css";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {},
    login: true,
    signup: true
  };

  OnChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Login Function to be called on Click
  onLogin = e => {
    e.preventDefault();
    // Checks the validation
    if (this.validateForm()) {
      let user = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.login(user, this.props.history);
      this.setState({
        email: "",
        password: ""
      });
    }
  };

  // Function for validation check
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

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    return (
      <div>
        {/* Main Container For login */}
        <div id="loginMainContainer">
          {/* Login Left Container for Welcome Text */}
          <div id="loginLeftContainer">
            <h1
              id="loginwelcome"
              className="w3-container w3-center w3-animate-left"
            >
              Welcome ,
            </h1>
            <p className="w3-container w3-center w3-animate-left">
              An Investment in Knowledge <br />
              pays the best Interest
            </p>
          </div>

          {/* Login Component Right container login form */}
          <div id="loginRightContainer">
            {/* Container for Buttons */}
            <div>
              <Link to="/login">
                <button
                  id={
                    this.state.login
                      ? "loginComponentButton-active"
                      : "loginComponentButton"
                  }
                  onClick={() => {
                    this.setState({
                      login: false,
                      signup: true
                    });
                  }}
                >
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button id="registerComponentButton">Sign Up</button>
              </Link>
            </div>

            <form id="loginForm">
              <p>
                {" "}
                <input
                  id="loginInput"
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={this.OnChange}
                  value={this.state.email}
                />
              </p>
              <p id="loginErrorMessage">{this.state.errors.email}</p>
              <p>
                <input
                  id="loginInput"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.OnChange}
                  value={this.state.password}
                />
              </p>
              <p id="loginErrorMessage">{this.state.errors.password}</p>

              {this.props.error ? (
                <p id="loginErrorMessage">{this.props.error}</p>
              ) : (
                <p style={{ display: "none" }}>Hello</p>
              )}
              <Link to="/resetpassword">
                <p
                  style={{
                    color: "#39abf7"
                  }}
                >
                  Forgot Password ?
                </p>
              </Link>
              <p>
                <button onClick={this.onLogin} id="loginFormButton">
                  Login
                </button>
              </p>
            </form>
          </div>
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
  { login }
)(Login);
