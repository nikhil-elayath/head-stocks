import React, { Component } from "react";
import { getCompanyDetail } from "../actions/CompanyDetail";
import { connect } from "react-redux";
// importing css file
import "../styles/CompanyDetail.css";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";

export class CompanyDetailFinancial extends Component {
  componentDidMount() {
    console.log("component mounted");
    // this.props.getCompanyDetail();
  }
  render() {
    return (
      <div>
        <SecondaryNavbar />
        <p>Financial </p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
});
export default connect(
  mapStateToProps,
  { getCompanyDetail }
)(CompanyDetailFinancial);
