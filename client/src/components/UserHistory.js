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
    var decode = jwt_decode(localStorage.getItem("token"));

    this.props.userHistory(decode.email);
  }
  render() {
    console.log(this.props.userhistory[0]);
    return (
      <div>
        <div id="userHistoryContainer">
          <UserNavigation />
          {/*side bar for user detail*/}
          <div id="userhistory">
            {this.props.userhistory ? (
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
                    {hist.company.map(stocks => (
                      <tr>
                        <td>{stocks.ticker_name}</td>
                        <td>{stocks.current_price}</td>
                        {stocks.buy == true ? <td>Bought</td> : <td>Sold</td>}
                        <td>0</td>
                        <td>
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
              <div>No Stocks History</div>
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
