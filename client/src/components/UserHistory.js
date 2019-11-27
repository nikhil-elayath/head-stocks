//piyush
import React, { Component } from "react";
import "../styles/UserHistory.css";
import UserNavigation from "./Common/UserNavigation";
import { connect } from "react-redux";
import { userHistory } from "../actions/Users";
import jwt_decode from "jwt-decode";
// for user to see the history of hid stock buy and sell

export class UserHistory extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      var decode = jwt_decode(localStorage.getItem("token"));
      this.props.userHistory(decode.email);
    }
  }
  render() {
    return (
      <div>
        <div id="userHistoryContainer">
          <UserNavigation selected="history" />
          {/*side bar for user detail*/}
          <div id="userhistory">
            {this.props.userhistory.length != 0 ? (
              <table id="userhistory_table">
                <thead id="userhistory_tableHeader">
                  <th>Stocks</th>
                  <th>Price</th>
                  <th>Buy/Sell</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </thead>
                {this.props.userhistory.map(hist => (
                  <>
                    {hist.company.map((stocks, index) => (
                      <tr>
                        <td id={"tickerName" + index}>{stocks.ticker_name}</td>
                        <td id={"tickerPrice" + index}>
                          {stocks.current_price}
                        </td>
                        {stocks.buy == true ? <td>Bought</td> : <td>Sold</td>}
                        <td id={"tickerQty" + index}>
                          {stocks.buying_quantity}
                        </td>
                        <td id={"tickerDate" + index}>
                          {new Date(stocks.buy_date).toLocaleDateString(
                            "en-In",
                            {
                              month: "short",
                              day: "2-digit",
                              year: "numeric"
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </table>
            ) : (
              <h1>No Stocks History</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userhistory: state.usersReducer.userhistory,
  isLoading: state.LoadingReducer.isLoading
});
export default connect(mapStateToProps, {
  userHistory
})(UserHistory);
