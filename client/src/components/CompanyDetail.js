import React, { Component } from "react";
import {
  // getCompanyDetail,
  getBalanceSheet,
  getCompanyDetailById,
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
// importing css file
import "../styles/CompanyDetail.css";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";

export class CompanyDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log("printing id from the component", id);

    console.log("component mounted");
    // this.props.getCompanyDetail();
    // this.props.getBalanceSheet();
    this.props.getCompanyDetailById(id);
  }
  render() {
    return (
      <div>
        <SecondaryNavbar />
        <div id="company-detail-grid-container">
          {this.props.company.map(company => (
            <div id="company-detail-profile">
              <h3>Profile</h3>
              <h3>
                Sector :<span>{company.sector}</span>
              </h3>

              <h3>
                Market Cap: <span> {company.marketcap}</span>
              </h3>
              <h3>
                Industry: <span> {company.industry}</span>
              </h3>
              <h3>
                Employees: <span> {company.employees}</span>
              </h3>
              <h3>
                <span>{company.bio}</span>{" "}
              </h3>
            </div>
          ))}
          {/* recommendation */}

          <div id="company-detail-recommendation">
            {this.props.company.map(company => (
              <h3> Recommendation</h3>
            ))}
            <div id="test" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
});
export default connect(
  mapStateToProps,
  {
    //  getCompanyDetail
    getBalanceSheet,
    getCompanyDetailById,
  }
)(CompanyDetail);
