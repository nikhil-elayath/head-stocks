import React, { Component } from "react";
import UserNavigation from "./Common/UserNavigation";
import "../styles/UserBuyStocks.css";
import { connect } from "react-redux";
import { getAllStocks } from "../actions/Users";
import jwt_decode from "jwt-decode";

export class UserBuyStocks extends Component {
  componentDidMount() {
    var decode = jwt_decode(localStorage.getItem("token"));
    let email = {
      email: decode.email
    };
    this.props.getAllStocks(email);
  }

  state = {
    qty: ""
  };

  render() {
    var rand;
    console.log(this.props.users);
    return (
      <div>
        <div id="buyStocksContainer">
          <UserNavigation />
          <div id="userStocksContainer">
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
              {this.props.users.map(hist => (
                <>
                  {hist.company.map(stocks => (
                    <tr>
                      <td>{stocks.ticker_name}</td>
                      <td>{stocks.current_price}</td>

                      <td>{stocks.buying_quantity}</td>
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
                        {console.log(rand)}
                      </td>
                      <td>
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
                        )}
                      </td>
                      <td>
                        <div class="sellStocksBox">
                          <a class="sell" href="#sellStockspopup1">
                            Sell
                          </a>
                        </div>

                        <div id="sellStockspopup1" class="sellStocksoverlay">
                          <div class="sellStockspopup">
                            <h2>{stocks.ticker_name} </h2>
                            <a class="sellStocksclose" href="#">
                              &times;
                            </a>
                            <div class="sellStockscontent">
                              <p>Current Price : $</p>
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
                                        stocks.current_price
                                      ))
                                    })
                                  }
                                />
                              </p>
                              <p>Total Price : $</p>
                              <a id="sellSpecificStock" href="#">
                                Buy
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
            {/* ) : (
                <h1>No Stocks History</h1>
              )} */}
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
  getAllStocks
})(UserBuyStocks);
