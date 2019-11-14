import React, { Component } from "react";
import {
  getCompany,
  getSectors,
  getIndustries,
  getGainersLosers
} from "../actions/Stocks";
import "../styles/StocksLanding.css";
import companylogo from "./apple--big.svg";
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
    sector: "Healthcare"
  };

  componentDidMount() {
    this.props.getCompany();
    this.props.getSectors();
    this.props.getIndustries(this.state.sector);
    this.props.getGainersLosers(this.state.sector);
  }

  componentWillReceiveProps(nextProps) {
    nextProps.stocks.length > 0
      ? this.displayCompanies(nextProps.stocks)
      : console.log(0, " Stocks");
  }

  OnSelectSector = e => {
    this.setState({
      sector: e.target.value
    });
    this.props.getIndustries(e.target.value);
    this.props.getGainersLosers(e.target.value);
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
    console.log("Sectors", this.props.sectors ? this.props.sectors : "None");
    return (
      <div>
        {this.props.gainersLosers["0"] ? (
          <div id="stocks_main_container">
            <p>STOCKS</p>
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
                  </>
                ))}
              </select>
              <select
                type="text"
                id="stocks_dropdown"
                name="industries"
                // value={}
                // onChange={}
              >
                {this.props.industries.map(industries => (
                  <>
                    {console.log(industries)}
                    <option name="choice">{industries.industry}</option>
                  </>
                ))}
                {/* <option name="choice">Phones & Handheld Devices</option>
                <option name="choice">Semiconductor Equipment & Testing</option>
                <option name="choice">Electronic Equipments & Parts</option> */}
              </select>
            </div>
            <div id="stocks_main_grid_container">
              <InfiniteScroll
                dataLength={this.state.pageStocks.length} //This is important field to render the next data
                next={this.loadMoreItems}
                hasMore={true}
                height={600}
                loader={
                  <Loader
                    type={Loader}
                    color="#2c3e50"
                    textAlign="center"
                    style={{ margin: "150px 500px" }}
                  />
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen all the stocks</b>
                  </p>
                }
              >
                <div id="stocks_grid_container">
                  {this.state.pageStocks.map(stocks => (
                    <div
                      id="stocks_grid_details"
                      onClick={() => {
                        this.props.history.push(
                          "/companydetail/" + stocks.ticker_id,
                          { stocks }
                        );
                      }}
                    >
                      <img src={companylogo} id="stocks_img" />
                      <div id="stocks_ticker">{stocks.ticker_name}</div>
                      <div id="stocks_name">{}</div>
                      <div id="stocks_flex_details-one">
                        <div id="stocks_details_title">Closed Price:</div>
                        <div id="stocks_details">249.05 USD</div>
                      </div>
                      <div id="stocks_flex_details-two">
                        <div id="stocks_details_title">Market Cap:</div>
                        <div id="stocks_details">1114.39B</div>
                      </div>
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>
            <div id="stocks_table">
              <div id="stocks_div_buttons">
                <button id="stocks_gainers">Gainers</button>
                <button id="stocks_losers">Losers</button>
              </div>
              <Table
                tableHeaders={[
                  "Ticker",
                  "Chng (%)",
                  "Market Cap",
                  "Share Price"
                ]}
                tableData={this.props.gainersLosers["0"].gainers}
              />
            </div>
          </div>
        ) : (
          <div>Loading ...</div>
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
