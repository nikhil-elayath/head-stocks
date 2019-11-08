import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import { getCompanyDetailById } from "../actions/CompanyDetail";
import { connect } from "react-redux";
import "../styles/CompanyDetailFinancial.css";
import Table from "./Common/Table";

export class CompanyDetailFinancial extends Component {
  componentDidMount() {
    // getting the id from the params
    const id = this.props.match.params.id;
    //PASSING THE ID TO THE ACTION
    // this.props.getCompanyDetailById(id);
    console.log("financial mounted and id is", id);
  }
  render() {
    console.log(this.props);
    console.log(
      this.props.company ? this.props.company[1] : console.log("Loading..")
    );
    return (
      <div>
        <CompanyDetailSecondaryNavbar />
        <p>Balance Sheet </p>
        <table>
          <tr>
            <td>Equity Before Minorities</td>
            {/* </tr> */}
            {this.props.company.map(balanceSheet => (
              <div>
                {balanceSheet.map(balance => (
                  <td>{balance["Equity Before Minorities"]}</td>
                  /* <td>{balance["Total Assets"]}</td>
                    <td>{balance["Current Assets"]}</td>
                    <td>{balance["Total Assets"]}</td>
                    <td>{balance["Accounts Payable"]}</td>
                    <td>{balance["Receivables"]}</td>
                    <td>{balance["Total Liabilities"]}</td>
                    <td>{balance["Current Liabilities"]}</td>
                    <td>{balance["Preferred Equity"]}</td>
                    <td>{balance["Equity Before Minorities"]}</td>
                    <td>{balance["Minorities Interest"]}</td>
                    <td>{balance["Noncurrent Liabilities"]}</td> */
                ))}
              </div>
            ))}
          </tr>

          {/* cashflow */}

          {/* <tr>
            <td>cashflow</td>
            {this.props.company.map(balanceSheet => (
              <div>
                {balanceSheet.map(cashflow => (
                  <div>
                    <td>{cashflow["Cash From Operating Activities"]}</td>
                    <td>{cashflow["Cash From Investing Activities"]}</td>
                    <td>{cashflow["Cash From Financing Activities"]}</td>
                    <td>{cashflow["EBITDA"]}</td>
                    <td>{cashflow["Net Change in Cash"]}</td>
                    <td>{cashflow["Net PP&E"]}</td>
                    <td>{cashflow[" Dividends"]}</td>
                  </div>
                ))}
              </div>
            ))}
          </tr> */}
        </table>

        {/* <table>
          <tr>
            <td>Cash From Financing Activities</td>
            {this.props.company.map(cashflow => (
              <div>
                {cashflow.map(flow => (
                  <td>{flow["Cash From Financing Activities"]}</td>
                ))}
              </div>
            ))}
          </tr>
        </table> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
});
export default connect(
  mapStateToProps,
  { getCompanyDetailById }
)(CompanyDetailFinancial);
