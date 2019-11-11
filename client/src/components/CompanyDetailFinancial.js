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
        <div id="table-container">
          <table id="table_data">
            {this.props.company.balancesheet ? (
              <>
                {this.props.company.balancesheet.map(balance => (
                  <>
                    <div id="company-details-date"> </div>

                    <tr>
                      <td id="comp-dates">{balance["ticker_dates"]}</td>

                      <td>{balance["Cash and Cash Equivalents"]}</td>
                      <td>{balance["Current Assets"]}</td>
                      <td>{balance["Total Assets"]}</td>
                      <td>{balance["Accounts Payable"]}</td>
                      <td>{balance["Receivables"]}</td>
                      <td>{balance["Total Liabilities"]}</td>
                      <td>{balance["Current Liabilities"]}</td>
                      <td>{balance["Preferred Equity"]}</td>
                      <td>{balance["Equity Before Minorities"]}</td>
                      <td>{balance["Minorities Interest"]}</td>
                      <td>{balance["Noncurrent Liabilities"]}</td>
                    </tr>
                  </>
                ))}
              </>
            ) : (
              <p>Loading..</p>
            )}
          </table>
        </div>

        <h1>Cash Flow </h1>
        <div id="table-container">
          <table id="table_data">
            {this.props.company.cashflow ? (
              <>
                {this.props.company.cashflow.map(cashflow => (
                  <>
                    <tr>
                      <td id="comp-dates">{cashflow["ticker_dates"]}</td>

                      <td>{cashflow["Cash From Operating Activities"]}</td>
                      <td>{cashflow["Cash From Investing Activities"]}</td>
                      <td>{cashflow["Cash From Financing Activities"]}</td>
                      <td>{cashflow["EBITDA"]}</td>
                      <td>{cashflow["Net Change in Cash"]}</td>
                      <td>{cashflow["Net PP&E"]}</td>
                      <td>{cashflow["Dividends"]}</td>
                    </tr>
                  </>
                ))}
              </>
            ) : (
              <p>Loading..</p>
            )}
          </table>
        </div>

        <h1>Profit And Loss </h1>
        <div id="table-container">
          <table id="table_data">
            {this.props.company.cashflow ? (
              <>
                {this.props.company.profitandloss.map(profitandloss => (
                  <>
                    <tr>
                      <td id="comp-dates">{profitandloss["ticker_dates"]}</td>

                      <td>{profitandloss["Revenues"]}</td>
                      <td>{profitandloss["EBIT"]}</td>
                      <td>{profitandloss["Net Profit"]}</td>
                    </tr>
                  </>
                ))}
              </>
            ) : (
              <p>Loading..</p>
            )}
          </table>
        </div>

        <h1>Ratios </h1>
        <table id="table_data">
          {this.props.company.cashflow ? (
            <>
              {this.props.company.ratios.map(ratios => (
                <>
                  <tr>
                    <td id="comp-dates">{ratios["ticker_dates"]}</td>

                    <td>{Number(ratios["Current Ratio"]).toFixed(2)}</td>
                    <td>
                      {Number(ratios["Liabilities To Equity"]).toFixed(2)}
                    </td>
                    <td>{Number(ratios["Debt To Asset"]).toFixed(2)}</td>
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
  company: state.CompanyDetailReducer.company
});
export default connect(
  mapStateToProps,
  { getCompanyDetailById }
)(CompanyDetailFinancial);