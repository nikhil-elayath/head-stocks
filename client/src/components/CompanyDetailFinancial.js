import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import { getCompanyDetailById } from "../actions/CompanyDetail";
import { connect } from "react-redux";
import "../styles/CompanyDetailFinancial.css";
import Table from "./Common/Table";
// let i = 1;
// let j = 1;
export class CompanyDetailFinancial extends Component {
  componentDidMount() {
    // getting the id from the params
    const id = this.props.match.params.id;
    //PASSING THE ID TO THE ACTION
    this.props.getCompanyDetailById(id);
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
        <h1>Balance Sheet </h1>
        <table id="table_data">
          {this.props.company.balancesheet ? (
            <>
              {this.props.company.balancesheet.map(balance => (
                <>
                  <tr>
                    <td>
                      <h3>{balance["Cash and Cash Equivalents"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Current Assets"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Total Assets"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Accounts Payable"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Receivables"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Total Liabilities"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Current Liabilities"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Preferred Equity"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Equity Before Minorities"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Minorities Interest"]}</h3>
                    </td>
                    <td>
                      <h3>{balance["Noncurrent Liabilities"]}</h3>
                    </td>
                  </tr>
                </>
              ))}
            </>
          ) : (
            <p>Loading..</p>
          )}
        </table>

        <h1>Cash Flow </h1>
        <table id="table_data">
          {this.props.company.cashflow ? (
            <>
              {this.props.company.cashflow.map(cashflow => (
                <>
                  <tr>
                    <td>
                      <h3>{cashflow["Cash From Operating Activities"]}</h3>
                    </td>
                    <td>
                      <h3>{cashflow["Cash From Investing Activities"]}</h3>
                    </td>
                    <td>
                      <h3>{cashflow["Cash From Financing Activities"]}</h3>
                    </td>
                    <td>
                      <h3>{cashflow["EBITDA"]}</h3>
                    </td>
                    <td>
                      <h3>{cashflow["Net Change in Cash"]}</h3>
                    </td>
                    <td>
                      <h3>{cashflow["Net PP&E"]}</h3>
                    </td>
                    <td>
                      <h3>{cashflow["Dividends"]}</h3>
                    </td>
                  </tr>
                </>
              ))}
            </>
          ) : (
            <p>Loading..</p>
          )}
        </table>
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
