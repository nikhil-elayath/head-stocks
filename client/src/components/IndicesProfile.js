import React, { Component } from "react";
import {
  getIndicesById,
  getOhlcChartIndex,
  getOhlcIndicesById
} from "../actions/Indices";
import { connect } from "react-redux";
import "../styles/IndicesProfile.css";
import Loader from "react-loader-spinner";

export class IndicesProfile extends Component {
  componentDidMount() {
    this.props.getIndicesById(this.props.match.params.id);
    this.props.getOhlcChartIndex(this.props.match.params.id);
    let time = {
      time: "1w"
    };
    this.props.getOhlcIndicesById(this.props.match.params.id, time);
  }

  state = {
    week: true
  };

  weekClick = () => {
    let time = {
      time: "1w"
    };
    this.props.getOhlcIndicesById(this.props.match.params.id, time);
    this.setState({
      week: true
    });
  };

  monthClick = () => {
    let time = {
      time: "1m"
    };
    this.props.getOhlcIndicesById(this.props.match.params.id, time);
    this.setState({
      week: false
    });
  };

  render() {
    console.log(this.props.ohlcChart);
    return (
      <div>
        <div id="indicesMainContainer">
          {this.props.singleIndex.map(index => (
            <>
              <div id="indicesLeftContainer">
                <div id="indicesTopLeft">
                  <h1>{index.ticker_name}</h1>
                  <div>
                    <button id="downloadButton">
                      <i class="fa fa-download" /> Download
                    </button>
                  </div>
                </div>

                <div id="indicesNav">
                  <a id="indexClose">
                    {index.close} <sub>USD</sub>
                  </a>
                  <a id="indexOpen">{index.open}</a>
                  <a id="indexOpen">{index.high}</a>
                  <a id="indexOpen">{index.adjclose}</a>
                </div>
                <div id="indicesNavName">
                  <a id="indexCloseName">
                    CLOSE (
                    {new Date(index.date).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric"
                    })}
                    )
                  </a>
                  <a id="indexOpenName">OPEN</a>
                  <a id="indexOpenName">HIGH</a>
                  <a id="indexOpenName">ADJCLOSE</a>
                </div>
              </div>
              <h3 id="indicesHeaderLabel">Stock Chart</h3>
              <div id="indicesGraphContainer">
                {this.props.isLoading ? (
                  <div style={{ margin: "200px 600px" }}>
                    <Loader type={Loader} color="#2c3e50" height="100" />
                  </div>
                ) : (
                  <div
                  // style={{
                  //   border: "1px solid #cacaca",
                  //   width: "97%",
                  //   margin: "auto",
                  //   marginBottom: "20px"
                  // }}
                  >
                    <iframe
                      src={this.props.ohlcChart}
                      style={{
                        width: "100%",
                        height: "500px",
                        outline: "none",
                        border: "none"
                      }}
                    />
                  </div>
                )}
              </div>
              <h3 id="indicesHeaderLabel">Historic Prices</h3>
              <div id="losersGainersContainer">
                <div id="indicesButtonContainer">
                  <b>Range : </b>{" "}
                  <button
                    id={
                      this.state.week === true
                        ? "weekButtonactive"
                        : "weekButton"
                    }
                    onClick={this.weekClick}
                  >
                    1w
                  </button>
                  <button
                    id={
                      this.state.week === false
                        ? "monthButtonactive"
                        : "monthButton"
                    }
                    onClick={this.monthClick}
                  >
                    1m
                  </button>
                </div>

                <table id="historicTable">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Open</th>
                      <th>High</th>
                      <th>Low</th>
                      <th>Close</th>
                      <th>Adj Close</th>
                      <th>Volume</th>
                    </tr>
                  </thead>
                  {this.props.ohlcdata.map((data, index) => (
                    <tbody>
                      {data.map(value => (
                        <>
                          <tr>
                            <td id={"date" + index}>
                              {new Date(value.date).toLocaleDateString(
                                "en-IN",
                                {
                                  month: "short",
                                  day: "2-digit",
                                  year: "numeric"
                                }
                              )}
                            </td>
                            <td>{value.open}</td>
                            <td>{value.high}</td>
                            <td>{value.low}</td>
                            <td>{value.close}</td>
                            <td>{value.adjclose}</td>
                            <td>{value.volume}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  ))}
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
  isLoading: state.LoadingReducer.isLoading,
  ohlcdata: state.indexReducer.ohlcdata
});
export default connect(mapStateToProps, {
  getIndicesById,
  getOhlcChartIndex,
  getOhlcIndicesById
})(IndicesProfile);
