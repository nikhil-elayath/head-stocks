import React, { Component } from "react";
import {
  getCompany,
  getSectors,
  getIndustries,
  getGainersLosers
} from "../actions/Stocks";
import "../styles/StocksLanding.css";
import companylogo from "./Common/stockslogo.PNG";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import Table from "../components/Common/TickerTable";

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
    gainersClick: true
  };

  componentDidMount() {
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

      console.log("Stocks", this.props.stocks);
      this.displayCompanies(this.props.stocks);
    }, 1000);
  };

  render() {
    // console.log("Sectors", this.props.stocks ? this.state.pageStocks : "None");
    return (
      <div>
        {this.props.gainersLosers["0"] ? (
          <div id="stocks_main_container">
            {/* <p>STOCKS</p> */}
            <div id="stocks_filter">
              <select
                type="text"
                id="stocks_dropdown"
                name="sector"
                value={this.state.sector}
                onChange={this.OnSelectSector}
              >
                {this.props.sectors.map(sectors => (
                  <>
                    <option name="choice">{sectors}</option>
                    {/*mapping all the sectors to select from the dropdown*/}
                  </>
                ))}
              </select>
              <select
                type="text"
                id="stocks_dropdown"
                name="industries"
                value={this.state.industry} //changing the value of industry when selected
                onChange={this.OnSelectIndustry} //on change perform this function
              >
                <option name="choice">Select an Industry</option>
                {this.props.industries.map(industries => (
                  <>
                    {console.log(industries)}
                    <option name="choice">{industries}</option>
                    {/* mapping all the industries in the dropdown based on the selected sector*/}
                  </>
                ))}
              </select>
            </div>
            <div id="stocks_main_grid_container">
              <InfiniteScroll
                dataLength={this.state.pageStocks.length} //This is important field to render the next data
                next={this.loadMoreItems}
                hasMore={true}
                height={600}
                loader={
                  <div id="stocks_loader">
                    <Loader type={Loader} color="#2c3e50" textAlign="center" />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen all the stocks</b>
                  </p>
                }
              >
                <div id="stocks_grid_container">
                  {this.state.pageStocks.map(stocks =>
                    stocks ? (
                      <div
                        id="stocks_grid_details"
                        onClick={() => {
                          this.props.history.push(
                            "/companydetail/" + stocks.ticker_id, //pushing to the company details page with ticker id of a stock when that particular stock card is clicked
                            { stocks }
                          );
                        }}
                      >
                        <img src={companylogo} id="stocks_img" />
                        {console.log(stocks)}
                        <div id="stocks_ticker">{stocks["ticker_name"]}</div>
                        {/* mapping the ticker name from the api*/}
                        <div id="stocks_name">{}</div>
                        <div id="stocks_flex_details_one">
                          <div id="stocks_details_title">Share Price:</div>
                          <div id="stocks_details">{stocks["Share Price"]}</div>
                          {/* mapping the share price from the api */}
                        </div>
                        <div id="stocks_flex_details_two">
                          <div id="stocks_details_title">Market Cap:</div>
                          <div id="stocks_details">{stocks["MarketCap"]}</div>
                          {/* mapping the market cap from the api */}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </InfiniteScroll>
            </div>
            <div id="stocks_table">
              <div id="stocks_div_buttons">
                <button
                  id={
                    this.state.gainersClick == true //changing the color of gainers button when clicked on it
                      ? "stocks_gainers"
                      : "stocks_losers"
                  }
                  onClick={() => this.setState({ gainersClick: true })} //on clicking the gainers button, the state of gainersClick is set true
                >
                  Gainers
                </button>
                <button
                  id={
                    this.state.gainersClick == false //changing the color of losers button when clicked on it
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
                  this.state.gainersClick == true //displaying the gainers data in the table if state of gainersClick is true that is when gainers button is clicked else losers data is displayed
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
  gainersLosers: state.stocksReducer.gainersLosers
});

export default connect(mapStateToProps, {
  getCompany,
  getSectors,
  getIndustries,
  getGainersLosers
})(StocksLanding);
