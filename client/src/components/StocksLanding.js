import React, { Component } from "react";
import { getCompany } from "../actions/Stocks";
import "../styles/StocksLanding.css";
import companylogo from "./apple--big.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

export class StocksLanding extends Component {
  componentDidMount() {
    this.props.getCompany();
  }

  state = {
    data: [],
    items: 15,
    loadingstate: false,
    height: 800,
    pageStocks: [],
    loading: false
  };

  componentWillReceiveProps(nextProps) {
    nextProps.stocks.length > 0
      ? this.displayCompanies(nextProps.stocks)
      : console.log(0, " Stocks");
  }

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
    console.log(this.props.stocks);
    return (
      <div>
        {/* <Navbar /> */}
        <div id="stocks_main_container">
          <p>STOCKS</p>
          <div id="stocks_main_grid_container ">
            <InfiniteScroll
              dataLength={this.state.pageStocks.length} //This is important field to render the next data
              next={this.loadMoreItems}
              hasMore={true}
              height={600}
              loader={
                <Loader type={Loader} color="#2c3e50" textAlign="center" />
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen all Teams</b>
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
                    <div id="stocks_name">{}</div>
                    <div id="stocks_ticker">{stocks.ticker_name}</div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocksReducer.stocks
});

export default connect(
  mapStateToProps,
  { getCompany }
)(StocksLanding);
