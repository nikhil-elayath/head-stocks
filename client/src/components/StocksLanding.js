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
    this.props.getCompany(this.state.industry);
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

  OnSelectIndustry = e => {
    this.setState({
      industry: e.target.value
    });
    this.props.getCompany(e.target.value);
  };

  // onClickGainersLosers = () => {
  //   this.setState({ gainersClick:true, losersClick:false });
  //   this.props.getGainersLosers(this.state.sector);
  // };

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
                  </>
                ))}
              </select>
              <select
                type="text"
                id="stocks_dropdown"
                name="industries"
                value={this.state.industry}
                onChange={this.OnSelectIndustry}
              >
                <option name="choice">Select an Industry</option>
                {this.props.industries.map(industries => (
                  <>
                    {console.log(industries)}
                    <option name="choice">{industries}</option>
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

                      <div id="stocks_ticker">
                        {stocks ? stocks.ticker_name : "NA"}
                      </div>
                      <div id="stocks_name">{}</div>
                      <div id="stocks_flex_details_one">
                        <div id="stocks_details_title">Market Cap:</div>
                        <div id="stocks_details">1114.39B</div>
                      </div>
                      {/* <div id="stocks_flex_details_two">
                        <div id="stocks_details_title">Closed Price:</div>
                        <div id="stocks_details">249.05 USD</div>
                      </div> */}
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            </div>

            {console.log(
              this.state.gainersClick == true
                ? this.props.gainersLosers["0"].gainers
                : this.props.gainersLosers["0"].losers
            )}
            <div id="stocks_table">
              <div id="stocks_div_buttons">
                <button
                  id={
                    this.state.gainersClick == true
                      ? "stocks_gainers"
                      : "stocks_losers"
                  }
                  onClick={() => this.setState({ gainersClick: true })}
                >
                  Gainers
                </button>
                <button
                  id={
                    this.state.gainersClick == false
                      ? "stocks_gainers"
                      : "stocks_losers"
                  }
                  onClick={() => this.setState({ gainersClick: false })}
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
                  this.state.gainersClick == true
                    ? this.props.gainersLosers["0"].gainers
                    : this.props.gainersLosers["0"].losers
                }
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
