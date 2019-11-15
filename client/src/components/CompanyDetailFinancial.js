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
    cashFlowOption: false,
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
            <div className="financialsSidebarOptions">
              <section id="item1" 
              //  className={this.state.balanceSheetOption ? "financialsSidebarItem" : null}
              >
                <img
                  src={balanceSheet}
                  alt="Balance Sheet"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Balance Sheet</p>
              </section>
              <section id="item2" 
              //  className={this.state.balanceSheetOption ? "financialsSidebarItem" : null}
              >
                <img
                  src={cashFlow}
                  alt="Balance Sheet"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Balance Sheet</p>
              </section>
              <section id="item3" 
              //  className={this.state.balanceSheetOption ? "financialsSidebarItem" : null}
              >
                <img
                  src={profitloss}
                  alt="Balance Sheet"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Balance Sheet</p>
              </section>
              <section id="item4" 
              //  className={this.state.balanceSheetOption ? "financialsSidebarItem" : null}
              >
                <img
                  src={ratios}
                  alt="Balance Sheet"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Balance Sheet</p>
              </section>
            </div>
          </sidebar>

          <div className="financialsAllTablesDiv">
            <h1 className="financialsTitle">Balance Sheet </h1>
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

            <h1 className="financialsTitle">Cash Flow </h1>
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

            <h1 className="financialsTitle">Profit And Loss </h1>
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

            <h1 className="financialsTitle">Ratios </h1>
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
