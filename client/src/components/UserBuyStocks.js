import React, { Component } from "react";
import UserNavigation from "./Common/UserNavigation";
import "../styles/UserBuyStocks.css";
import { connect } from "react-redux";
import { getAllStocks, sellStocks } from "../actions/Users";
import jwt_decode from "jwt-decode";

export class UserBuyStocks extends Component {
  state = {
    qty: "",
    total: 0
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      var decode = jwt_decode(localStorage.getItem("token"));
      let email = {
        email: decode.email
      };
      this.props.getAllStocks(email);
    }
  }

  render() {
    if (localStorage.getItem("token")) {
      var decode = jwt_decode(localStorage.getItem("token"));
    }
    var rand;
    return (
      <div>
        {/* Buy STocks Main Container */}
        <div id="buyStocksContainer">
          <UserNavigation selected="buy" />
          <div id="userStocksContainer">
            {this.props.users.length != 0 ? (
              <table id="userBuyStocksTable">
                <thead id="userBuyStocksHeader">
                  <th>Stocks</th>
                  <th>Bought Price</th>
                  <th>Quantity</th>
                  <th>Selling price</th>
                  <th></th>
                  {/* <th>Date</th> */}
                  <th></th>
                </thead>
                {/* Mapping of stocks bought by user */}
                {this.props.users.map(hist => (
                  <>
                    {hist.company.map((stocks, index) => (
                      <tr>
                        {/* ticker_name */}
                        <td id={"tickerName" + index}>{stocks.ticker_name}</td>
                        {/* Current Price */}
                        <td id={"tickerPrice" + index}>
                          {stocks.current_price}
                        </td>
                        {/* Buying Quantity */}
                        <td id={"tickerQty" + index}>
                          {stocks.buying_quantity}
                        </td>
                        {/* Generating random no betwenn tye stock price of company */}
                        <td>
                          {" "}
                          {""}
                          {
                            (rand = Number(
                              Math.random() *
                                (Number(stocks.current_price) +
                                  5 -
                                  (Number(stocks.current_price) - 5)) +
                                (Number(stocks.current_price) - 5)
                            ).toFixed(2))
                          }
                        </td>
                        <td>
                          {/* Checking the random no is less than current price , if yes then show red tick */}
                          {stocks.current_price > rand ? (
                            <span
                              class="fa fa-caret-down"
                              style={{ color: "red", fontSize: "18px" }}
                            ></span>
                          ) : (
                            <span
                              class="fa fa-caret-up"
                              style={{ color: "green", fontSize: "18px" }}
                            ></span>
                          )}{" "}
                          {Number(
                            ((rand - stocks.current_price) /
                              stocks.current_price) *
                              100
                          ).toFixed(2)}{" "}
                          %
                        </td>
                        {/* Button to Pop up */}
                        <td>
                          <div class="sellStocksBox">
                            <a
                              class="sell"
                              href={"#sellStockspopup1" + stocks.ticker_name}
                            >
                              Sell
                            </a>
                          </div>
                          {/* Pop up ocuurs when clicked pon above sell button */}

                          <div
                            class="sellStocksoverlay"
                            id={"sellStockspopup1" + stocks.ticker_name}
                          >
                            <div class="sellStockspopup">
                              {/* ticker name on pop up */}
                              <h2>{stocks.ticker_name}</h2>
                              <a class="sellStocksclose" href="#">
                                &times;
                              </a>
                              {/* Random no / Current price */}
                              <div class="sellStockscontent">
                                <p>Current Price : ${rand}</p>
                                {/* Input Quantity */}
                                <p>
                                  Quantity :{" "}
                                  <input
                                    type="text"
                                    id="sellingQuantity"
                                    name="qty"
                                    value={this.state.qty}
                                    placeholder="0"
                                    onChange={e =>
                                      this.setState({
                                        [e.target.name]: e.target.value,
                                        total: (e.target.value *= Number(
                                          213.55
                                        ))
                                      })
                                    }
                                  />
                                </p>
                                {/* Checking if the quantty entered by user exceeds */}
                                {Number(this.state.qty) >
                                stocks.buying_quantity ? (
                                  <p style={{ color: "#ff4d4d" }}>
                                    Quantity Exceeded (Max Qty to Sell :{" "}
                                    {stocks.buying_quantity})
                                  </p>
                                ) : null}
                                <p>Total Price : ${this.state.total}</p>
                                {/* Sending it to server on click */}
                                <a
                                  id="sellSpecificStock"
                                  href="#"
                                  onClick={() => {
                                    {
                                      let user = {
                                        email: decode.email,
                                        ticker_name: stocks.ticker_name,
                                        sell_price: rand,
                                        qty: this.state.qty,
                                        price: this.state.total
                                      };
                                      this.props.sellStocks(user);
                                    }
                                  }}
                                >
                                  Sell
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </table>
            ) : (
              <h1>No Stocks Bought</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.usersReducer.users,
  isLoading: state.LoadingReducer.isLoading
});
export default connect(mapStateToProps, {
  getAllStocks,
  sellStocks
})(UserBuyStocks);
