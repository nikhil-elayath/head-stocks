import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import { getBalanceSheet } from "../actions/CompanyDetail";
import { connect } from "react-redux";

export class CompanyDetailAnalysis extends Component {
  componentDidMount() {
    this.props.getBalanceSheet();
  }
  render() {
    return (
      <div>
        <CompanyDetailSecondaryNavbar />
        <p>Analysis </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
});
export default connect(
  mapStateToProps,
  { getBalanceSheet }
)(CompanyDetailAnalysis);
