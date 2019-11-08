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
        <p>Financials </p>
        <table>
          <tr>
            <td>Cash and Cash Equivalents</td>
            {this.props.company.map(balanceSheet => (
              <div>
                {balanceSheet.map(balance => (
                  <td>{balance["Cash and Cash Equivalents"]}</td>
                ))}
              </div>
            ))}
          </tr>
        </table>

        <table>
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
