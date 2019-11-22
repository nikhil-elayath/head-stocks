import React, { Component } from "react";
import "../styles/UserProfile.css";
import UserNavigation from "./Common/UserNavigation";
import { connect } from "react-redux";
import { searchContent } from "../actions/Navbar";
import jwt_decode from "jwt-decode";

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
    var deocode = jwt_decode(localStorage.getItem("token"));
    return (
      <div>
        <div id="userProfileContainer">
          <UserNavigation />

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
                        style={{
                          fontSize: "18px",
                          paddingTop: "0px ",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <b> {stocks.ticker_name}</b>
                      </div>
                      <div>
                        <p>
                          <b>${stocks.price}</b>
                        </p>
                        <p style={{ color: "#707070" }}>Current Price</p>
                      </div>
                      <div>
                        <div class="buyStocksBox">
                          <a
                            class="buy"
                            href="#buyStockspopup1"
                            onClick={() => {
                              {
                                let user = {
                                  ticker_name: stocks.ticker_name,
                                  current_price: stocks.price,
                                  qty: this.state.qty,
                                  price: this.state.total
                                };
                              }
                            }}
                          >
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
                              <button id="buySpecificStock">Buy</button>
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
    );
  }
}

const mapStateToProps = state => ({
  results: state.navbarReducer.results,
  isLoading: state.LoadingReducer.isLoading
});

export default connect(mapStateToProps, { searchContent })(UserProfile);

{
  /* Pop Up for buying n number of stocks
            <a href="#open-modal" id="buyButton">
              Buy
            </a>
            <div id="open-modal" class="modal-window">
              <div>
                <a href="#modal-close" title="Close" class="modal-close">
                  &times;
                </a>
                <h1>CSS Modal</h1>
                <div>The quick brown fox jumped over the lazy dog.</div>
              </div>
            </div> */
}
