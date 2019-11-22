import React, { Component } from "react";
//[Nikhil] imports for range slider
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import ReactDOM from "react-dom";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
// import RadarSlider from "../charts/graph";

import {
  getCompany,
  getSectors,
  getIndustries,
  getGainersLosers,
  //[NIKHIL] SCREENER ACTIONS
  getScreenerSearch
} from "../actions/Stocks";
import Script from "react-load-script";
import "../styles/StocksLanding.css";
import "../styles/Admin.css";
import companylogo from "./Common/stockslogo.PNG";
import editlogo from "./Common/edit.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Table from "../components/Common/TickerTable";
var slider;

//[Nikhil] rc-slider
//package documentation link
//https://www.npmjs.com/package/rc-slider

//source code http://react-component.github.io/slider/examples/handle.html
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export class StocksLanding extends Component {
  state = {
    data: [],
    items: 20,
    loadingstate: false,
    height: 800,
    pageStocks: [],
    loading: false,
    sector: "Basic Materials",
    industry: "Building Materials",
    gainersClick: true,

    //[Nikhil] default slider value
    dividend_value1: 50,
    dividend_value2: 80,
    market_cap_value1: 60,
    market_cap_value2: 70
  };

  //for slider handle cange
  onSliderChange = e => {
    console.log(e);
    this.props.getScreenerSearch(e[0], e[1]);

    //changing the state with the  value selected
    this.setState({ dividend_value1: e[0] });
    this.setState({ dividend_value2: e[1] });
  };
  onSliderChange2 = e => {
    this.props.getScreenerSearch(e[0], e[1]);

    this.setState({ market_cap_value1: e[0] });
    this.setState({ market_cap_value2: e[1] });
  };

  componentDidMount() {
    //for loading graph.js
    const script = document.createElement("script");
    script.src = "C:Users\nikhiDesktopgraphgraph.js";
    script.async = true;
    script.onload = () => this.scriptLoaded();

    document.body.appendChild(script);

    this.props.getCompany(this.state.industry); //getting all the companies based on an industry selected
    this.props.getSectors(); //getting all the sectors
    this.props.getIndustries(this.state.sector); //getting all the industries based on a sector selected
    this.props.getGainersLosers(this.state.sector); //getting all the gainers and losers based on a sector selected
  }

  componentWillReceiveProps(nextProps) {
    nextProps.stocks.length > 0
      ? this.displayCompanies(nextProps.stocks)
      : console.log(0, " Stocks");
  }

  OnSelectSector = e => {
    this.setState({
      sector: e.target.value //setting state for the sector
    });
    this.props.getIndustries(e.target.value); //getting all the industries based on a sector selected
    this.props.getGainersLosers(e.target.value); //getting all the gainers and losers based on a sector selected
  };

  OnSelectIndustry = e => {
    this.setState({
      industry: e.target.value //setting state for the industry
    });
    this.props.getCompany(e.target.value); //getting all the companies based on an industry selected
  };

  displayCompanies = Stocks => {
    console.log(Stocks);
    const { items } = this.state;

    if (Stocks.length === 0) return;
    let pageStocks = [];
    for (let i = 0; i < items; i++) {
      pageStocks.push(Stocks[i]);
    }
    this.setState({ pageStocks });
    console.log("PageStocks array", this.state.pageStocks.length);
  };

  loadMoreItems = () => {
    setTimeout(() => {
      this.setState({
        items: this.state.items + 10
      });
      this.displayCompanies(this.props.stocks);
    }, 1000);
  };

  render() {
    return (
      <div>
        {/* real code starts here  */}
        <div>
          <div id="stocks-landing-page-slider">
            {/* CLLING THE COMPONENT WITH THE RS SLIDER PACKAGE  */}
            <Range
              // SETTING THE MINIMUM VALUE
              min={0}
              // SETTING THE MAXIMUM VALUE
              max={1000}
              //SETTING THE DEFAULT VALUE WHICH IS DEFINED IN THE STATE OF THE COMPONENT
              defaultValue={[
                this.state.dividend_value1,
                this.state.dividend_value2
              ]}
              //ON CHANGING CALLING THE SLIDERCHANGE
              onChange={this.onSliderChange}
            />
          </div>
          <p>Value: {this.state.dividend_value1}</p>
          <p>Value: {this.state.dividend_value2}</p>
        </div>
        market cap
        <div>
          <div id="stocks-landing-page-slider">
            {/* CLLING THE COMPONENT WITH THE RS SLIDER PACKAGE  */}
            <Range
              // SETTING THE MINIMUM VALUE
              min={0}
              // SETTING THE MAXIMUM VALUE
              max={1000}
              //SETTING THE DEFAULT VALUE WHICH IS DEFINED IN THE STATE OF THE COMPONENT
              defaultValue={[
                this.state.market_cap_value1,
                this.state.market_cap_value2
              ]}
              //ON CHANGING CALLING THE SLIDERCHANGE
              onChange={this.onSliderChange2}
              name={"slider1"}
            />
          </div>
          <p>Value: {this.state.market_cap_value1}</p>
          <p>Value: {this.state.market_cap_value2}</p>
        </div>
        {/* ends */}
        {this.props.gainersLosers["0"] ? (
          <div id="stocks_main_container">
            {/* <p>STOCKS</p> */}
            <div id="stocks_filter">
              <select
                type="text"
                id="stocks_dropdown_sectors"
                className="stocks_dropdown"
                name="sector"
                value={this.state.sector}
                onChange={this.OnSelectSector}
              >
                {this.props.sectors.map((sectors, index) => (
                  <>
                    <option name="choice" id={"sector" + index}>
                      {sectors}
                    </option>
                    {/*mapping all the sectors to select from the dropdown*/}
                  </>
                ))}
              </select>
              <select
                type="text"
                className="stocks_dropdown"
                id="stocks_dropdown_industries"
                name="industries"
                value={this.state.industry} //changing the value of industry when selected
                onChange={this.OnSelectIndustry} //on change perform this function
              >
                <option name="choice">Select an Industry</option>
                {this.props.industries.map((industries, index) => (
                  <>
                    <option name="choice" id={"industry" + index}>
                      {industries}
                    </option>
                    {/* mapping all the industries in the dropdown based on the selected sector*/}
                  </>
                ))}
              </select>
            </div>

            {/* <div class="slidecontainer"> */}

            {/* </div> */}

            <div id="stocks_main_grid_container">
              {this.props.isLoading ? (
                <div id="stocks_loader">
                  <Loader type={Loader} color="#2c3e50" textAlign="center" />
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={this.state.pageStocks.length} //This is important field to render the next data
                  next={this.loadMoreItems}
                  hasMore={true}
                  height={600}
                  loader={
                    <div id="stocks_loader">
                      <Loader
                        type={Loader}
                        color="#2c3e50"
                        textAlign="center"
                      />
                    </div>
                  }
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen all the stocks</b>
                    </p>
                  }
                >
                  <div id="stocks_grid_container">
                    {this.state.pageStocks.map((stocks, index) =>
                      stocks ? (
                        <div id="stocks_main_grid_details">
                          {/* -------------------------- */}
                          {/* <div class="box"> */}
                          <a href="#editpopup">
                            <img id="stocks_edit" alt="edit" src={editlogo} />
                          </a>
                          {/* </div> */}
                          <div id="editpopup" class="admin_overlay">
                            <div class="admin_popup">
                              <h2>Edit Stock</h2>
                              <a class="admin_close" href="#">
                                &times;
                              </a>
                              <div class="admin_content">
                                <button>Upload</button>
                                <button>Edit</button>
                              </div>
                            </div>
                          </div>
                          {/* -------------------------- */}
                          <div
                            id="stocks_grid_details"
                            onClick={() => {
                              this.props.history.push(
                                "/companydetail/" + stocks.ticker_id, //pushing to the company details page with ticker id of a stock when that particular stock card is clicked
                                { stocks }
                              );
                            }}
                          >
                            <img
                              id="stocks_img"
                              alt="logo"
                              src={
                                stocks.ticker_logo == null
                                  ? companylogo
                                  : "data:image/jpeg;base64," +
                                    stocks.ticker_logo
                              }
                            />
                            <div id="stocks_ticker">
                              {stocks["ticker_name"]}
                            </div>
                            {/* mapping the ticker name from the api*/}
                            <div id="stocks_name">{}</div>
                            <div id="stocks_flex_details_one">
                              <div
                                id="stocks_closed_price"
                                className="stocks_details_title"
                              >
                                Closed Price:
                              </div>
                              <div id="stocks_details">
                                {stocks["Share Price"]}USD
                              </div>
                              {/* mapping the share price from the api */}
                            </div>
                            <div id="stocks_flex_details_two">
                              <div
                                id="stocks_market_cap"
                                className="stocks_details_title"
                              >
                                Market Cap:
                              </div>
                              <div id="stocks_details">
                                {stocks["MarketCap"]}M
                              </div>
                              {/* mapping the market cap from the api */}
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>
                </InfiniteScroll>
              )}
            </div>
            <div id="stocks_table">
              <div id="stocks_div_buttons">
                <button
                  id="button_stocks_gainers"
                  className={
                    this.state.gainersClick === true //changing the color of gainers button when clicked on it
                      ? "stocks_gainers"
                      : "stocks_losers"
                  }
                  onClick={() => this.setState({ gainersClick: true })} //on clicking the gainers button, the state of gainersClick is set true
                >
                  Gainers
                </button>
                <button
                  id="button_stocks_losers"
                  className={
                    this.state.gainersClick === false //changing the color of losers button when clicked on it
                      ? "stocks_gainers"
                      : "stocks_losers"
                  }
                  onClick={() => this.setState({ gainersClick: false })} //on clicking the losers button, the state of gainersClick is set false
                >
                  Losers
                </button>
              </div>
              <Table
                tableHeaders={[
                  "Ticker",
                  "Chng (%)",
                  "Market Cap",
                  "Share Price"
                ]}
                tableData={
                  this.state.gainersClick === true //displaying the gainers data in the table if state of gainersClick is true that is when gainers button is clicked else losers data is displayed
                    ? this.props.gainersLosers["0"].gainers
                    : this.props.gainersLosers["0"].losers
                }
              />
            </div>
          </div>
        ) : (
          <div id="stocks_main_loader">
            <Loader type={Loader} color="#2c3e50" textAlign="center" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocksReducer.stocks,
  sectors: state.stocksReducer.sectors,
  industries: state.stocksReducer.industries,
  gainersLosers: state.stocksReducer.gainersLosers,
  isLoading: state.LoadingReducer.isLoading
});

export default connect(mapStateToProps, {
  getCompany,
  getSectors,
  getIndustries,
  getGainersLosers,
  getScreenerSearch
})(StocksLanding);
