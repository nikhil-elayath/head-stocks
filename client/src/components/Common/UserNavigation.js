import React, { Component } from "react";
import "../../styles/UserNavigation.css";
import wallet from "./wallet.png";

export default class UserProfile extends Component {
  state = {
    buyStocks: true,
    myStocks: false
  };

  render() {
    return (
      <div>
        <div id="userNavigationContainer">
          <div id="userNavigation">
            <h1>Hi Nikhil !</h1>
            <img src={wallet} id="wallet" /> {}
            <button
              id={this.state.buyStocks === true ? "buyStocks" : "myStocks"}
              onClick={() => this.setState({ buyStocks: true })}
            >
              Buy Stocks
            </button>
            <button
              id={this.state.buyStocks === false ? "buyStocks" : "myStocks"}
              onClick={() => this.setState({ buyStocks: false })}
            >
              My Stocks
            </button>
          </div>
        </div>
      </div>
    );
  }
}
