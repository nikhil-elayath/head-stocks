import React, { Component } from "react";
import "../../styles/TickerTable.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class TickerTable extends Component {
  render() {
    return (
      <div className="table__container">
        {/* Mapping Table Headers */}
        <table className="ticker__table">
          <thead className="ticker__tableHeader">
            <tr>
              {this.props.tableHeaders.map((data, index) => (
                <th id={"TickerHeaders" + index}>{data}</th>
              ))}
            </tr>
          </thead>
          {/* Mapping Table Data */}
          {this.props.tableData.map((current, index) => (
            <tr>
              {/* Maping Ticker name */}
              {this.props.isIndex == true ? (
                <Link
                  to={{ pathname: "/indexProfile/" + current.ticker_id }}
                  style={{ textDecoration: "none" }}
                >
                  <td id={"tcikerNameReuse" + index}>
                    {current.ticker_name ? current.ticker_name : null}
                  </td>
                </Link>
              ) : (
                <Link
                  to={{ pathname: "/companydetail/" + current.ticker_id }}
                  style={{ textDecoration: "none" }}
                >
                  <td id={"tcikerNameReuse" + index}>
                    {current.ticker_name ? current.ticker_name : null}
                  </td>
                </Link>
              )}
              {current.tickerValues
                ? Object.keys(current.tickerValues).map((keyName, index) => (
                    <>
                      {current.tickerValues[keyName].substring(0, 1) == "-" ? (
                        <td style={{ color: "#ff4d4d" }}>
                          {current.tickerValues[keyName]}
                        </td>
                      ) : current.tickerValues[keyName].substring(0, 1) ==
                        "+" ? (
                        <td
                          style={{ color: "#27ae60" }}
                          id={"tickerValues" + index}
                        >
                          {current.tickerValues[keyName]}
                        </td>
                      ) : (
                        <td>{current.tickerValues[keyName]}</td>
                      )}
                    </>
                  ))
                : null}
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps, {})(TickerTable);
