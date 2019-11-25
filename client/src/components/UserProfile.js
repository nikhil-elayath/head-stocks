import React, { Component } from "react";
import "../styles/UserProfile.css";
import UserNavigation from "./Common/UserNavigation";
import { connect } from "react-redux";
import { searchContent } from "../actions/Navbar";
import { buyStocks } from "../actions/Users";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

export class UserProfile extends Component {
  state = {
    // input text in the search box
    searchInput: "",
    searchInputChanged: false,
    qty: "",
    total: 0
  };

  OnChange = event => {
    {
      this.state.searchInputChanged
        ? console.log(this.state.searchInputChanged)
        : this.setState({
            searchInputChanged: true
          });
    }
    this.setState({ [event.target.name]: event.target.value });

    let searchString = {
      searchInput: this.state.searchInput
    };
    this.props.searchContent(searchString);
  };

  onSearch = e => {
    e.preventDefault();

    let searchString = {
      searchInput: this.state.searchInput
    };

    this.props.searchContent(searchString);
  };

  render() {
    if (localStorage.getItem("token")) {
      var decode = jwt_decode(localStorage.getItem("token"));
    }
    console.log(this.props.results);
    return (
      <div>
        <div
          id={
            localStorage.getItem("token")
              ? "analysis_main_container"
              : "analysis_main_container_blur"
          }
        >
          <div id="userProfileContainer">
            <UserNavigation wallet={this.props.users} />

            <div id="userSearch">
              <h1>Welcome to HeadStocks</h1>
              <input
                type="text"
                placeholder="Search for Stocks you want to buy (E.g . AAPL)"
                name="searchInput"
                id="userProfileSearch"
                value={this.state.searchInput}
                onChange={this.OnChange}
              />
              <button type="submit" id="userProfileSearchButton">
                <i class="fa fa-search"></i>
              </button>

              {this.state.searchInput == "" ? null : (
                <div className="search-result">
                  {this.props.results.length != 0 ? (
                    this.props.results.map((stocks, index) => (
                      <div id="search_map">
                        <div
                          id={"tickerName" + index}
                          style={{
                            fontSize: "18px",
                            paddingTop: "0px ",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <b>{stocks.ticker_name}</b>
                        </div>
                        <div>
                          <p id={"tickerPrice" + index}>
                            <b>${stocks.price}</b>
                          </p>
                          <p style={{ color: "#707070" }}>Current Price</p>
                        </div>
                        <div>
                          <div class="buyStocksBox">
                            <a class="buy" href="#buyStockspopup1">
                              Buy
                            </a>
                          </div>

                          <div id="buyStockspopup1" class="buyStocksoverlay">
                            <div class="buyStockspopup">
                              <h2>{stocks.ticker_name}</h2>
                              <a class="buyStocksclose" href="#">
                                &times;
                              </a>
                              <div class="buyStockscontent">
                                <p>Current Price : ${stocks.price}</p>
                                <p>
                                  Quantity :{" "}
                                  <input
                                    type="text"
                                    // class="quantity"
                                    id="buyingQuantity"
                                    name="qty"
                                    value={this.state.qty}
                                    onChange={e =>
                                      this.setState({
                                        [e.target.name]: e.target.value,
                                        total: (e.target.value *= Number(
                                          stocks.price
                                        ))
                                      })
                                    }
                                  />
                                </p>
                                <p>
                                  Total Price : $
                                  {Number(this.state.total).toFixed(2)}
                                </p>
                                <a
                                  id="buySpecificStock"
                                  href="#"
                                  onClick={() => {
                                    {
                                      let user = {
                                        email: decode.email,
                                        ticker_name: stocks.ticker_name,
                                        current_price: stocks.price,
                                        qty: this.state.qty,
                                        price: this.state.total
                                      };
                                      this.props.buyStocks(user);
                                    }
                                  }}
                                >
                                  Buy
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ padding: "10px 10px" }}>No Company Found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div id={localStorage.getItem("token") ? "bg-no-text" : "bg-text"}>
          <p>Please login to enable this feature</p>
          <Link to="/login">
            <button id="button_for_blur">Login</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.navbarReducer.results,
  isLoading: state.LoadingReducer.isLoading,
  users: state.usersReducer.users
});

export default connect(mapStateToProps, { searchContent, buyStocks })(
  UserProfile
);
