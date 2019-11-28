import React, { Component } from "react";
import {
  getIndicesById,
  getOhlcChartIndex,
  getOhlcIndicesById,
  download
} from "../actions/Indices";
import { connect } from "react-redux";
import "../styles/IndicesProfile.css";
import Loader from "react-loader-spinner";

export class IndicesProfile extends Component {
  componentDidMount() {
    // Get Indices Header
    this.props.getIndicesById(this.props.match.params.id);
    // Get Indices Graph
    this.props.getOhlcChartIndex(this.props.match.params.id);
    let time = {
      time: "1w"
    };
    // Get Historic Prices
    this.props.getOhlcIndicesById(this.props.match.params.id, time);
  }

  state = {
    week: true
  };

  // Sending range of 1w
  weekClick = () => {
    let time = {
      time: "1w"
    };
    this.props.getOhlcIndicesById(this.props.match.params.id, time);
    this.setState({
      week: true
    });
  };

  // Sending range of 1m
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
    return (
      <div>
        {/* Start of Main Cotainer */}
        <div id="indicesMainContainer">
          {this.props.singleIndex.map(index => (
            <>
              <div id="indicesLeftContainer">
                <div id="indicesTopLeft">
                  {/* Mapping Ticker Name */}
                  <h1>{index.ticker_name}</h1>
                  {/* Checking token if exists then display download button */}
                  {localStorage.getItem("token") ? (
                    <div>
                      <button
                        id="downloadButton"
                        type="button"
                        onClick={async () => {
                          fetch(
                            "http://localhost:2001/api/indicesprofile/download/" +
                              index.ticker_name
                          ).then(response => {
                            response.blob().then(blob => {
                              let url = window.URL.createObjectURL(blob);
                              let a = document.createElement("a");
                              a.href = url;
                              a.download = index.ticker_name + ".csv";
                              a.click();
                            });
                          });
                          // this.props.downloadOHLC("AAPL");
                        }}
                        // onClick={() => {
                        //   let reports = {
                        //     report: this.props.ohlcdata
                        //   };
                        //   console.log(reports);
                        //   fetch("http://localhost:2001/api/download/report", {
                        //     method: "POST",
                        //     body: JSON.stringify(reports),
                        //     headers: {
                        //       "Content-Type": "appication/json"
                        //     }
                        //   }).then(response => {
                        //     response.blob().then(blob => {
                        //       let url = window.URL.createObjectURL(blob);
                        //       let a = document.createElement("a");
                        //       a.href = url;
                        //       a.download = "file.csv";
                        //       a.click();
                        //     });
                        //   });
                        // }}
                      >
                        <i class="fa fa-download" />
                        Download
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "none" }}></div>
                  )}
                </div>
                {/* Mapping Closed Price */}
                <div id="indicesNav">
                  <a id="indexClose">
                    {index.close} <sub>USD</sub>
                  </a>
                  {/* Open Price */}
                  <a id="indexOpen">{index.open}</a>
                  {/* High */}
                  <a id="indexOpen">{index.high}</a>
                  {/* Low */}
                  <a id="indexOpen">{index.adjclose}</a>
                </div>
                {/* Mapping Date */}
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
              {/* Mapping Stock Chart */}
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
              {/* Mapping Historice Prices */}
              <h3 id="indicesHeaderLabel">Historic Prices</h3>
              <div id="losersGainersContainer">
                <div id="indicesButtonContainer">
                  <b>Range : </b> {/* Sending range */}
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
                  {/* Mapping Data range */}
                  {this.props.ohlcdata.map((data, index) => (
                    <tbody>
                      {data.map((value, index1) => (
                        <>
                          {console.log(index1)}
                          <tr>
                            <td id={"ohlcdate" + index1}>
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
  getOhlcIndicesById,
  download
})(IndicesProfile);
