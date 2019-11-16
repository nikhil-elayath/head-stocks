import React, { Component } from "react";
import "../styles/Reports.css";

export default class Reports extends Component {
  render() {
    return (
      <div className="financialTableContainer">
        <table className="financialTableData">
          {this.props.headers.map(indicatorName => (
            <tr>
              {indicatorName === "date" ? (
                <td className="financialTableDataTitle">Indicator Name</td>
              ) : indicatorName === "Total Assets" ||
                indicatorName === "Total Liabilities" ||
                indicatorName === "Equity Before Minorities" ||
                indicatorName === "Change in Working Capital" ? (
                <td className="financialsTotalTD">{indicatorName}</td>
              ) : (
                <td>{indicatorName}</td>
              )}
              <>
                {this.props.reportdata.map(value => (
                  <>
                    {indicatorName === "date" ? (
                      <td className="financialTableDataTitle">
                        {" "}
                        {new Date(value[indicatorName]).toLocaleDateString(
                          "en-IN",
                          {
                            month: "short",
                            year: "2-digit"
                          }
                        )}
                      </td>
                    ) : indicatorName === "Total Assets" ||
                      indicatorName === "Total Liabilities" ||
                      indicatorName === "Equity Before Minorities" ||
                      indicatorName === "Change in Working Capital" ? (
                      <td className="financialsTotalTD">
                        {value[indicatorName] ? value[indicatorName] : "-"}
                      </td>
                    ) : (
                      <td>
                        {value[indicatorName] ? value[indicatorName] : "-"}
                      </td>
                    )}
                  </>
                ))}
              </>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
