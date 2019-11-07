import React, { Component } from "react";
import { createUser } from "../actions/Users";
import { connect } from "react-redux";
import "../styles/Register.css";
import { Link } from "react-router-dom";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    showError: false,
    errors: {},
    isAdmin: false,
    login: false,
    signup: true
  };

  register = e => {
    e.preventDefault();
    if (this.validateForm()) {
      let user = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        isAdmin: this.state.isAdmin
      };
      this.props.createUser(user);
      this.setState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
      });
    }
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm() {
    console.log("Hello");
    let errors = {};
    let formIsValid = true;

    if (!this.state.name) {
      formIsValid = false;
      errors["name"] = "*Please enter your name";
    }

    if (typeof this.state.name !== "undefined") {
      if (!this.state.name.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["name"] = "*Please enter alphabet characters only.";
      }
    }

    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof this.state.email !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(this.state.email)) {
        formIsValid = false;
        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    if (!this.state.phone) {
      formIsValid = false;
      errors["phone"] = "*Please enter your mobile no.";
    }

    if (typeof this.state.phone !== "undefined") {
      if (!this.state.phone.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        errors["phone"] = "*Please enter valid mobile no.";
      }
    }

    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    // if (typeof this.state.password !== "undefined") {
    //   if (
    //     !this.state.password.match(
    //       /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
    //     )
    //   ) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter secure and strong password.";
    //   }
    // }

    if (!this.state.password) {
      formIsValid = false;
      errors["confirmPassword"] = "Please Enter Password Again";
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
        <div id="registerMainContainer">
          <div id="registerLeftContainer">
            <h1 id="welcome" className="w3-container w3-center w3-animate-left">
              Welcome ,
            </h1>
            <p className="w3-container w3-center w3-animate-left">
              An Investment in Knowledge <br />
              pays the best Interest
            </p>
          </div>
          <div id="registerRightContainer">
            <div>
              <Link to="/login">
                <button
                  id={this.state.login ? "loginButton-active" : "loginButton"}
                >
                  Login
                </button>
              </Link>
              <button
                id={
                  this.state.signup ? "registerButton-active" : "registerButton"
                }
                onClick={() => {
                  this.setState({
                    login: false,
                    signup: true
                  });
                }}
              >
                Sign Up
              </button>
            </div>

            <form id="registerForm">
              <p>
                <input
                  id="registerInput"
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </p>
              <p>
                <p id="registerErrorMessage">{this.state.errors.name}</p>
              </p>
              <p>
                <input
                  id="registerInput"
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </p>
              <p id="registerErrorMessage">{this.state.errors.email}</p>
              <p>
                <input
                  id="registerInput"
                  placeholder="Mobile No"
                  type="text"
                  name="phone"
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </p>
              <p id="registerErrorMessage">{this.state.errors.phone}</p>
              <p>
                <input
                  id="registerInput"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
              </p>
              <p id="registerErrorMessage">{this.state.errors.password}</p>
              <p>
                <input
                  id="registerInput"
                  placeholder="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  onChange={this.onChange}
                  value={this.state.confirmPassword}
                />
              </p>
              <p id="registerErrorMessage">
                {this.state.errors.confirmPassword}
              </p>

              {this.props.error ? (
                <p id="registerErrorMessage">{this.props.error}</p>
              ) : (
                <p style={{ display: "none" }}>Hello</p>
              )}
              <p>
                <button onClick={this.register} id="registerFormButton">
                  Sign Up
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
  { createUser }
)(Register);
