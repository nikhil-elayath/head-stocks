import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import {
  getBalanceSheet,
  getCashFlow,
  getProfitAndLoss,
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
import "../styles/CompanyDetailFinancial.css";

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
          <div id="table_data">
            <table>
              <tr>
                <div id="bla">
                  <td> </td>
                  <td>2008 </td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>
                  <td>2008</td>

                  <td>2008</td>

                  <td>2008</td>

                  <td>2009</td>
                  <td>2009</td>

                  <td>2009</td>

                  <td>2009</td>

                  <td>2009</td>
                </div>
              </tr>
              <tr>
                {/* map the name of the data once the data in ready */}
                <td> Data name</td>

                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>

                <td> {balance_sheet.current_assests}</td>

                <td> {balance_sheet.current_assests}</td>

                <td> {balance_sheet.current_assests}</td>
              </tr>
              <tr>
                <td> Data name</td>

                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>

                <td> {balance_sheet.current_assests}</td>

                <td> {balance_sheet.current_assests}</td>
              </tr>
              <tr>
                <td> Data name</td>

                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>
                <td> {balance_sheet.current_assests}</td>

                <td> {balance_sheet.current_assests}</td>

                <td> {balance_sheet.current_assests}</td>
              </tr>
            </table>
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
