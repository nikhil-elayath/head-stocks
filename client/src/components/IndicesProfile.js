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
    console.log(this.props);
    {
      this.props.singleIndex[0]
        ? console.log(this.props.singleIndex[0].ticker_name)
        : console.log("Wait");
    }
    return (
      <div>
        {this.props.singleIndex ? (
          <div id="indicesMainContainer">
            {this.props.singleIndex.map(index => (
              <>
                <div id="indicesLeftContainer">
                  <h1>{index.ticker_name}</h1>
                  <p>
                    Closed Price :{" "}
                    {Number(index.ticker_dates["2019-11-05"].closing).toFixed(
                      2
                    )}
                  </p>
                  <hr />
                </div>
                <div id="indicesGraphContainer">
                  <h2>Stock Chart</h2>
                  <div
                    style={{
                      border: "1px solid #cacaca",
                      margin: "auto"
                    }}
                  >
                    <iframe
                      src={this.props.ohlcChart}
                      style={{
                        width: "100%",
                        height: "550px",
                        outline: "none",
                        border: "none"
                      }}
                    />
                  </div>
                </div>
                {/* <div id="losersGainersContainer">
                  <div>
                    <h3>Top Gainers</h3>
                  </div>
                  <div>
                    <h3>Top Loosers</h3>
                  </div>
                </div> */}
              </>
            ))}
          </div>
        ) : (
          <div style={{ margin: "200px 500px" }}>
            <Loader type={Loader} color="#2c3e50" height="100" width="400" />
            {/* <img src={loader} alt="loading..." /> */}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  singleIndex: state.indexReducer.singleIndex,
  ohlcChart: state.indexReducer.ohlcChart
});
export default connect(
  mapStateToProps,
  {
    getIndicesById,
    getOhlcChartIndex
  }
)(IndicesProfile);
