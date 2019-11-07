import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import {
  getBalanceSheet,
  getCashFlow,
  getProfitAndLoss,
} from "../actions/CompanyDetail";
import { connect } from "react-redux";

export class CompanyDetailFinancial extends Component {
  componentDidMount() {
    console.log("financial mounted");
    this.props.getBalanceSheet();
    this.props.getCashFlow();
    this.props.getProfitAndLoss();
  }
  render() {
    return (
      <div>
        <CompanyDetailSecondaryNavbar />
        <p>Financials </p>
        {this.props.balance_sheet.map(balance_sheet => (
          <div>
            <p>{balance_sheet.cash_equivalents} </p>
            <p>{balance_sheet.current_assests} </p>
            <p>{balance_sheet.total_assests} </p>
            <p>{balance_sheet.account_payable} </p>
            <p>{balance_sheet.recieveables} </p>
            <p>{balance_sheet.preferred_equity} </p>
            <p>{balance_sheet.equity_before_minority} </p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  balance_sheet: state.CompanyDetailReducer.balance_sheet,
});
export default connect(
  mapStateToProps,
  { getBalanceSheet, getCashFlow, getProfitAndLoss }
)(CompanyDetailFinancial);
