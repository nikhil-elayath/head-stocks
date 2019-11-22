import React, { Component } from "react";
import "../../styles/UserNavigation.css";
import wallet from "./wallet.png";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default class UserProfile extends Component {
  state = {
    buyStocks: true,
    myStocks: false,
    historyStocks: false
  };

  render() {
    var decode = jwt_decode(localStorage.getItem("token"));
    return (
      <div>
        <div id="userNavigationContainer">
          <div id="userNavigation">
            <h1>Hi Nikhil !</h1>
            <img src={wallet} id="wallet" />{" "}
            <span id="walletPrice">
              $
              {String(this.props.wallet).length != 0
                ? this.props.wallet
                : decode.wallet}
            </span>
            <div id="userNavigationButtonContainer">
              <Link to="/profile">
                <button
                  id={this.state.buyStocks ? "buyStocks-active" : "buyStocks"}
                  onClick={() =>
                    this.setState({
                      buyStocks: true,
                      myStocks: false,
                      historyStocks: false
                    })
                  }
                >
                  Buy Stocks
                </button>
              </Link>
              <Link to="/buyStocks">
                <button
                  id={this.state.myStocks ? "myStocks-active" : "myStocks"}
                  onClick={() =>
                    this.setState({
                      buyStocks: false,
                      myStocks: true,
                      historyStocks: false
                    })
                  }
                >
                  My Stocks
                </button>
              </Link>
              <Link to="/userhistory">
                <button
                  id={
                    this.state.historyStocks
                      ? "historyStocks-active"
                      : "historyStocks"
                  }
                  onClick={() =>
                    this.setState({
                      buyStocks: false,
                      myStocks: false,
                      historyStocks: true
                    })
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
