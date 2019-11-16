import React, { Component } from "react";
import {
  // getCompanyDetailById,
  getCompanyDatesById
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";
import "../styles/CompanyDetailFinancial.css";
import balanceSheet from "./bl.png";
import cashFlow from "./cf.png";
import profitloss from "./pl.png";
import ratios from "./ratios.png";

export class CompanyDetailFinancial extends Component {
  state = {
    balanceSheetOption: true,
    cashflowOption: false,
    profitLossOption: false,
    ratiosOption: false

  };

  

  componentDidMount() {
    // getting the id from the params
    const id = this.props.match.params.id;
    // PASSING THE ID TO THE ACTION
    // this.props.getCompanyDetailById(id);
    this.props.getCompanyDatesById(id);
  }
  render() {
    return (
      <div>
        {/* CALLING THE SECONDARY NAVBAR  */}
        <SecondaryNavbar />
        <div className="financialsMainGrid">
          <sidebar className="financialsSidebar">
            <div
              className="financialsSidebarOptions"
              id="financialsSidebarMain"
            >
              <a
                id="item1"
                href="#table1"
                className={this.state.balanceSheetOption ? "financialsSidebarItem" : null}
                onClick={() =>
                  this.setState({
                    balanceSheetOption: true,
                    cashflowOption: false,
                    profitLossOption: false,
                    ratiosOption: false
                  })
                }
               >
                <img
                  src={balanceSheet}
                  alt="Balance Sheet"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Balance Sheet</p>
              </a>
              <a
                id="item2"
                href="#table2"
                className={this.state.cashflowOption ? "financialsSidebarItem" : null}
                onClick={() =>
                  this.setState({
                    balanceSheetOption: false,
                    cashflowOption: true,
                    profitLossOption: false,
                    ratiosOption: false
                  })
                }
              >
                <img
                  src={cashFlow}
                  alt="Cash Flow"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Cash Flow</p>
              </a>
              <a
                id="item3"
                href="#table3"
                className={this.state.profitLossOption ? "financialsSidebarItem" : null}
                onClick={() =>
                  this.setState({
                    balanceSheetOption: false,
                    cashflowOption: false,
                    profitLossOption: true,
                    ratiosOption: false
                  })
                }
              >
                <img
                  src={profitloss}
                  alt="Profit & Loss"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Profit & Loss</p>
              </a>
              <a
                id="item4"
                href="#table4"
                 className={this.state.ratiosOption ? "financialsSidebarItem" : null}
                 onClick={() =>
                  this.setState({
                    balanceSheetOption: false,
                    cashflowOption: false,
                    profitLossOption: false,
                    ratiosOption: true
                  })
                }
              >
                <img
                  src={ratios}
                  alt="Ratios"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Ratios</p>
              </a>
            </div>
          </sidebar>

          <div className="financialsAllTablesDiv">
            <h1 className="financialsTitle" id="table1">Balance Sheet </h1>

            <div className="financialTableContainer">
              
              <table className="financialTableData">
                <tr className="financialTableDataTitleRow">
                  <td className="financialTableDataTitleNames">ddshsj</td>

                  <td>Current Assets</td>
                  <td>Intangible Assets</td>
                  <td>Cash & Cash Equivalents</td>
                  <td>Goodwill</td>
                  <td className="financialsTotalTD">Total Assets</td>

                  <hr className="financialsTableHR"></hr>

                  <td>Accounts Payable</td>
                  <td>Receivables</td>
                  <td>Current Liabilities</td>
                  <td className="financialsTotalTD">Total Liabilities</td>

                  <td>Preferred Equity</td>
                  <td>Total Noncurrent Liabilities</td>
                  <td className="financialsTotalTD">
                    Equity Before Minorities
                  </td>
                </tr>
                {this.props.dates.map(date => (
                  <>
                    <tr>
                      <td className="financialTableDataTitle">
                        {new Date(date["date"]).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric"
                        })}
                      </td>

                      <td>{date["Current Assets"]}</td>
                      <td>{date["Intangible Assets"]}</td>
                      <td>{date["Cash & Cash Equivalents"]}</td>
                      <td>{date["Goodwill"]}</td>
                      <td className="financialsTotalTD">
                        {date["Total Assets"]}
                      </td>

                      <hr className="financialsTableHR"></hr>

                      <td>{date["Accounts Payable"]}</td>
                      <td>{date["Receivables"]}</td>
                      <td>{date["Current Liabilities"]}</td>
                      <td className="financialsTotalTD">
                        {date["Total Liabilities"]}
                      </td>

                      <td>{date["Preferred Equity"]}</td>
                      <td>{date["Total Noncurrent Liabilities"]}</td>
                      <td className="financialsTotalTD">
                        {date["Equity Before Minorities"]}
                      </td>

                      {/* <hr className='financialsTableHR'></hr> */}
                    </tr>
                  </>
                ))}
              </table>
            </div>

            <h1 className="financialsTitle" id="table2">Cash Flow </h1>
            <div className="financialTableContainer">
              <table className="financialTableData">
                <tr>
                  <td className="financialTableDataTitleNames">ddshsj</td>

                  <td>Depreciation & Amortisation</td>
                  <td>Net Change in PP&E & Intangibles</td>
                  <td>Net Change in Cash</td>
                  <td>Cash From Operating Activities</td>
                  <td>Cash From Investing Activities</td>
                  <td>Cash From Financing Activities</td>
                  <td className="financialsTotalTD">
                    Change in Working Capital
                  </td>
                </tr>
                {this.props.dates.map(date => (
                  <>
                    <tr>
                      <td className="financialTableDataTitle">
                        {new Date(date["date"]).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric"
                        })}
                      </td>

                      <td>{date["Depreciation & Amortisation"]}</td>
                      <td>{date["Net Change in PP&E & Intangibles"]}</td>
                      <td>{date["Net Change in Cash"]}</td>
                      <td>{date["Cash From Operating Activities"]}</td>
                      <td>{date["Cash From Investing Activities"]}</td>
                      <td>{date["Cash From Financing Activities"]}</td>
                      <td className="financialsTotalTD">
                        {date["Change in Working Capital"]}
                      </td>
                    </tr>
                  </>
                ))}
              </table>
            </div>

            <h1 className="financialsTitle" id="table3">Profit And Loss </h1>
            <div className="financialTableContainer">
              <table className="financialTableData">
                <tr>
                  <td className="financialTableDataTitleNames">ddshsj</td>

                  <td>Revenues</td>
                  <td>EBIT</td>
                  <td>Net Profit</td>
                  <td>R&D</td>
                  <td>Income Taxes</td>
                </tr>
                {this.props.dates.map(date => (
                  <>
                    <tr>
                      <td className="financialTableDataTitle">
                        {new Date(date["date"]).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric"
                        })}
                      </td>

                      <td>{date["Revenues"]}</td>
                      <td>{date["EBIT"]}</td>
                      <td>{date["Net Profit"]}</td>
                      <td>{date["R&D"]}</td>
                      <td>{date["Income Taxes"]}</td>
                    </tr>
                  </>
                ))}
              </table>
            </div>

            <h1 className="financialsTitle" id="table4">Ratios </h1>
            <div className="financialTableContainer">
              <table className="financialTableData">
                <tr>
                  <td className="financialTableDataTitleNames">ddshsj</td>

                  <td>Liabilities to Equity Ratio</td>
                  <td>Debt to Assets Ratio</td>
                  <td>Current Ratio</td>
                  <td>EV / EBITDA</td>
                  <td>EV / Sales</td>
                  <td>Operating Income / EV</td>
                </tr>
                {this.props.dates.map(date => (
                  <>
                    <tr>
                      <td className="financialTableDataTitle">
                        {new Date(date["date"]).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric"
                        })}
                      </td>

                      <td>{date["Liabilities to Equity Ratio"]}</td>
                      <td>{date["Debt to Assets Ratio"]}</td>
                      <td>{date["Current Ratio"]}</td>
                      <td>{date["EV / EBITDA"]}</td>
                      <td>{date["EV / Sales"]}</td>
                      <td>{date["Operating Income / EV"]}</td>
                    </tr>
                  </>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // company: state.CompanyDetailReducer.company,
  dates: state.CompanyDetailReducer.dates
});
export default connect(mapStateToProps, {
  // getCompanyDetailById ,
  getCompanyDatesById
})(CompanyDetailFinancial);
