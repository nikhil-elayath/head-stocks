import React, { Component } from "react";
import { Link } from "react-router-dom";

// css file
import "../styles/Navbar.css";

// logos
// import user from "./user.svg"
import cancel from "./Common/cancel.png";
import { connect } from "react-redux";
import { searchContent } from "../actions/Navbar";
// import { debounce } from "debounce";

export class NavbarDefault extends Component {
  state = {
    // input text in the search box
    searchInput: "",
    searchInputChanged: false,

    // to highlight the current page
    home: false,
    stocks: false,
    login: false,
    vtoption: false
  };

  removeToken = () => {
    localStorage.removeItem("token");
    this.forceUpdate();
  };

  //Displays option inside the hamburger button
  myhamburgfunction() {
    // gets the complete navbar element
    var x = document.getElementById("navbarID");
    // checks if navbar has the required className
    if (x.className === "navbarHS") {
      // adds another className that displays navbar options
      x.className += " responsiveHS";
    } else {
      x.className = "navbarHS";
    }
  }

  // handles the input change performed in the search input box
  OnChange = event => {
    // search results display
    {
      this.state.searchInputChanged
        ? console.log(this.state.searchInputChanged)
        : this.setState({
            searchInputChanged: true
          });
    }
    this.setState({ [event.target.name]: event.target.value });
    // debounce(() => {

    let searchString = {
      searchInput: this.state.searchInput
    };
    this.props.searchContent(searchString);
    // }, 1000);
  };

  onSearch = e => {
    e.preventDefault();

    let searchString = {
      searchInput: this.state.searchInput
    };

    this.props.searchContent(searchString);
    // this.setState({
    //   searchInput: ""
    // });
  };

  render() {
    // console.log(this.props.results);
    return (
      <div className="navbarHS" id="navbarID">
        <Link to="/">
          <div className="navbarLogoName">
            <span
              id="navbarLogoText1"
              className="active"
              onClick={() =>
                this.setState({
                  home: true,
                  stocks: false,
                  vtoption: false,
                  login: false
                })
              }
            >
              HEAD<b id="navbarLogoText2">STOCKS</b>
            </span>
          </div>
        </Link>

        <div className="navbarLoginOptions" onClick={this.myhamburgfunction}>
          {/* checks if the user is logged In User or not */}
          {!localStorage.getItem("token") ? (
            <span>
              <Link
                to="/login"
                onClick={() =>
                  this.setState({
                    home: false,
                    stocks: false,
                    vtoption: false,
                    login: true
                  })
                }
                className={
                  this.state.login ? "tabactive linkdecornone" : "linkdecornone"
                }
                id="navbarLoginText"
              >
                Login
              </Link>
            </span>
          ) : (
            <span onClick={this.removeToken}>
              <Link to="/" style={{ textDecoration: "none" }}>
                Logout
              </Link>
            </span>
          )}
        </div>

        <div className="navbarStockOptions">
          <span onClick={this.myhamburgfunction}>
            <Link
              to="/Stocks"
              onClick={() =>
                this.setState({
                  home: false,
                  stocks: true,
                  vtoption: false,
                  login: false
                })
              }
              className={
                this.state.stocks ? "tabactive linkdecornone" : "linkdecornone"
              }
              id="navbarStocksText"
            >
              Stocks
            </Link>
          </span>
        </div>
        <div className="navbarVTOptions">
          <span onClick={this.myhamburgfunction}>
            <Link
              to={localStorage.getItem("token") ? "/profile" : "/login"}
              onClick={() =>
                this.setState({
                  home: false,
                  stocks: false,
                  vtoption: true,
                  login: false
                })
              }
              className={
                this.state.vtoption
                  ? "tabactive linkdecornone"
                  : "linkdecornone"
              }
              id="navbarVTText"
            >
              Virtual Trading
            </Link>
          </span>
        </div>

        <div className="navbarSearchBox" id="navbarSearchBoxDiv">
          <span className="navbarSearchSpan">
            <input
              type="text"
              name="searchInput"
              autoComplete="off"
              placeholder="Search for ticker"
              onChange={this.OnChange}
              id="navbarSearchInput"
            />
            <button
              id="navbarSearchResultsSearchButton"
              onClick={this.onSearch}
            >
              <i className="fa fa-search"></i>
            </button>
          </span>

          {// On input change division is displayed
          this.state.searchInputChanged ? (
            // division displaying the result of the search
            <div className="navbarSearchResultsFound">
              <button
                className="navbarSearchResultsCancelButton"
                id="navbarSearchCancelClick"
                onClick={() =>
                  this.setState({
                    searchInputChanged: false
                    // ,searchInput: ""
                  })
                }
              >
                <img
                  className="navbarSearchResultsCancelImage"
                  src={cancel}
                  alt="Cancel Button"
                  width="15px"
                  height="15px"
                  // className="fa fa-cancel"
                ></img>
              </button>
              {/* checks if the result array has some data or not */}
              {this.props.results.length === 0 ? (
                // if no data present then this block executes
                <h4>No Results Found for {this.state.searchInput}</h4>
              ) : (
                // if results array has some data then this displays the search result
                <div>
                  <h4>Search Results</h4>

                  {this.props.results.map(result => (
                    <Link
                      className="company-link"
                      // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER
                      to={{
                        pathname: "/companydetail/" + result.ticker_id
                      }}
                      onClick={() =>
                        this.setState({
                          searchInputChanged: false
                          // ,searchInput: ""
                        })
                      }
                    >
                      <div className="navbarSearchResultsDiv">
                        <p className="navbarSearchResultsPTag1">
                          <b>{result.ticker_name}</b>
                        </p>
                        <p className="navbarSearchResultsPTag2">
                          {result.industry}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="navbarSearchResultsNotFound"></div>
          )}
        </div>

        <span className="icon" onClick={this.myhamburgfunction}>
          <i className="fa fa-bars"></i>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.navbarReducer.results,
  isLoading: state.LoadingReducer.isLoading
});

export default connect(mapStateToProps, { searchContent })(NavbarDefault);

// Interview Ques for Data Science
// Explain concept of svm
// Normal Distribution
// Count & TFIDF Vectorizer
// P Value
// Validation Set
// Dimensionality Reduction
// Gradient Descent
// Data Cleaning in Data Science
// Right and Left Join Difference
// Transfer Learning
// Regularization (types : L1 and L2)
// Apply Filter for 64*64*3 image if there is padding and if there is no padding (Filter : 2*2)
// Learning Rate
// Deccaying Learning Rate
// Momentum in Gradient Descent
// OverFitting and UnderFitting
// Sampling
// Max Pooling Layer
// Vanishing and Exploding rates
// Role of Activation Function in CNN
// Sigmoid,Softmax,TanX,RELU,Lineaer,Leaky Rate
// How is Softmax different from other activation functions
// Batch and Schotastic Grradient Descent
