import React, { Component } from "react";
import { getIndicesById, getOhlcChartIndex } from "../actions/Indices";
import { connect } from "react-redux";
import "../styles/IndicesProfile.css";
import Loader from "react-loader-spinner";

export class IndicesProfile extends Component {
  componentDidMount() {
    this.props.getIndicesById(this.props.match.params.id);
    this.props.getOhlcChartIndex(this.props.match.params.id);
  }
  render() {
    console.log(this.props.sector);
    return (
      <div>
        <div id="indicesMainContainer">
          {this.props.singleIndex.map(index => (
            <>
              <div id="indicesLeftContainer">
                <h1>{index.ticker_name}</h1>
                <p>
                  Closed Price :{" "}
                  {Number(index.ticker_dates["2019-11-05"].closing).toFixed(2)}
                </p>
                {/* <hr /> */}
              </div>
              <div id="indicesGraphContainer">
                <h3>Stock Chart</h3>
                {/* {this.props.isLoading ? ( 
                  <div style={{ margin: "200px 500px" }}>
                    <Loader
                      type={Loader}
                      color="#2c3e50"
                      height="100"
                      width="400"
                    />
                    <img src={loader} alt="loading..." />
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px solid #cacaca",
                      width: "97%",
                      margin: "auto",
                      marginBottom: "20px"
                    }}
                  >
                    <iframe
                      src={this.props.ohlc_chart}
                      style={{
                        width: "100%",
                        height: "550px",
                        outline: "none",
                        border: "none"
                      }}
                    />
                  </div>
                )} */}
              </div>
              <div id="losersGainersContainer">
                <h3>Historic Prices</h3>
                <h4>Date : </h4>
                <table id="historicTable">
                  <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Adj Close</th>
                    <th>Volume</th>
                  </tr>
                </table>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  singleIndex: state.indexReducer.singleIndex,
  ohlcChart: state.indexReducer.ohlcChart,
  isLoading: state.LoadingReducer.isLoading
});
export default connect(mapStateToProps, {
  getIndicesById,
  getOhlcChartIndex
})(IndicesProfile);
