import React, { Component } from "react";
import "../../styles/UserNavigation.css";
import wallet from "./wallet.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getWallet } from "../../actions/Users";
import jwt_decode from "jwt-decode";

export class UserNavigation extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      let email = {
        email: "admin@gmail.com"
      };
      this.props.getWallet(email);
    }
  }

  render() {
    if (localStorage.getItem("token")) {
      var decode = jwt_decode(localStorage.getItem("token"));
    }
    return (
      <div>
        <div id="userNavigationContainer">
          {/* Start of Navigation */}
          <div id="userNavigation">
            {/* Mapping User name */}
            {localStorage.getItem("token") ? (
              <h1>Hi {decode.name} !</h1>
            ) : (
              <h1>Hi User !</h1>
            )}
            <img src={wallet} id="wallet" /> {/* Mapping wallet amount */}
            <span id="walletPrice">
              ${Number(this.props.wallet).toFixed(2)}
            </span>
            {/* Redirect to profile */}
            <div id="userNavigationButtonContainer">
              <Link to="/profile">
                <button
                  id={
                    this.props.selected === "profile"
                      ? "buyStocks-active"
                      : "buyStocks"
                  }
                >
                  Buy Stocks
                </button>
              </Link>
              {/* Redirect to buystockks */}
              <Link to="/buyStocks">
                <button
                  id={
                    this.props.selected === "buy"
                      ? "myStocks-active"
                      : "myStocks"
                  }
                >
                  My Stocks
                </button>
              </Link>
              {/* Redirect to history */}
              <Link to="/userhistory">
                <button
                  id={
                    this.props.selected === "history"
                      ? "historyStocks-active"
                      : "historyStocks"
                  }
                >
                  History
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  wallet: state.usersReducer.wallet
});

export default connect(mapStateToProps, { getWallet })(UserNavigation);
