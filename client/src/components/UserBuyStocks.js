import React, { Component } from "react";
import UserNavigation from "./Common/UserNavigation";
import "../styles/UserBuyStocks.css";

export default class UserBuyStocks extends Component {
  render() {
    return (
      <div>
        <div id="buyStocksContainer">
          <UserNavigation />
          <div id="userStocksContainer">
            <h1>No Stocks Bought Yet</h1>
          </div>
        </div>
      </div>
    );
  }
}
