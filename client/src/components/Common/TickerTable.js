import React, { Component } from "react";
import "../../styles/TickerTable.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class TickerTable extends Component {
  render() {
    console.log(this.props.isIndex);
    console.log(this.props.tableHeaders);
    return (
      <div className="table__container">
        <table className="ticker__table">
          <thead className="ticker__tableHeader">
            <tr>
              {this.props.tableHeaders.map((data, index) => (
                <th>{data}</th>
              ))}
            </tr>
          </thead>
          {console.log("tabledata", typeof this.props.tableData)}
          {this.props.tableData.map((current, index) => (
            <tr>
              {this.props.isIndex == true ? (
                <Link
                  to={{ pathname: "/indexProfile/" + current.ticker_id }}
                  style={{ textDecoration: "none" }}
                >
                  <td>{current.ticker_name ? current.ticker_name : null}</td>
                </Link>
              ) : (
                <Link
                  to={{ pathname: "/companydetail/" + current.ticker_id }}
                  style={{ textDecoration: "none" }}
                >
                  <td>{current.ticker_name ? current.ticker_name : null}</td>
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
                        <td style={{ color: "#27ae60" }}>
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
