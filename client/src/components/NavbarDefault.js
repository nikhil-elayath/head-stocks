import React, { Component } from "react";
import { Link } from "react-router-dom";

// css file
import "../styles/Navbar.css";

// logos
// import user from "./user.svg"
import cancel from "./cancel.png";
import { connect } from "react-redux";
import { searchContent } from "../actions/Navbar";

export class NavbarDefault extends Component {
  state = {
    // input text in the search box
    searchInput: "",
    searchInputChanged: false,

    // to highlight the current page
    home: false,
    stocks: false,
    login: false
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
              className="active"
              onClick={() =>
                this.setState({
                  home: true,
                  stocks: false,
                  login: false
                })
              }
            >
              <b>STOCKS</b>
            </span>
          </div>
        </Link>

        <div className="navbarLoginOptions">
          {/* checks if the user is logged In User or not */}
          {!localStorage.getItem("token") ? (
            <span>
              <Link
                to="/login"
                onClick={() =>
                  this.setState({
                    home: false,
                    stocks: false,
                    login: true
                  })
                }
                className={
                  this.state.login ? "tabactive linkdecornone" : "linkdecornone"
                }
              >
                Login
              </Link>
            </span>
          ) : (
            <span onClick={this.removeToken}>
              <Link to="/">Logout</Link>
            </span>
          )}
        </div>

        <div className="navbarStockOptions">
          <span>
            <Link
              to="/Stocks"
              onClick={() =>
                this.setState({
                  home: false,
                  stocks: true,
                  login: false
                })
              }
              className={
                this.state.stocks ? "tabactive linkdecornone" : "linkdecornone"
              }
            >
              Stocks
            </Link>
          </span>
        </div>

        <div className="navbarSearchBox">
          <span className="navbarSearchSpan">
            <input
              type="text"
              name="searchInput"
              autoComplete="off"
              placeholder="Search for ticker"
              onChange={this.OnChange}
            />
            <button onClick={this.onSearch}>
              <i className="fa fa-search"></i>
            </button>
          </span>

          {// On input change division is displayed
          this.state.searchInputChanged ? (
            // division displaying the result of the search
            <div className="navbarSearchResultsFound">
              <button
                className="navbarSearchResultsCancelButton"
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
