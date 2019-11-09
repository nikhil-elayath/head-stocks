import React, { Component } from "react";
import {
  // getCompanyDetail,
  // getBalanceSheet,
  getCompanyDetailById,
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
// importing css file
import "../styles/CompanyDetail.css";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";

export class CompanyDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getCompanyDetailById(id);
    console.log("printing id from the component", id);

    console.log("component mounted");
    // this.props.getCompanyDetail();
    // this.props.getBalanceSheet();
  }
  render() {
    console.log(this.props);
    console.log(this.props.company.tname);
    return (
      <div>
        <SecondaryNavbar />
        {this.props.company.balancesheet ? (
          <div id="company-detail-grid-container">
            {/* {this.props.company.map(company => ( */}
            <div id="company-detail-profile">
              <h3>Profile</h3>
              <h3>{this.props.company.company_id}</h3>
              <h3>{/* Sector :<span>{this.props.company[6]}</span> */}</h3>

              <h3>
                <span> {this.props.company.company_details}</span>
                Market Cap: <span> {this.props.company.marketcap}</span>
              </h3>
              <h3>
                Industry: <span> {this.props.company.industry}</span>
              </h3>
              <h3>
                Employees: <span> {this.props.company.employees}</span>
              </h3>
              <h3>
                <span>{this.props.company.bio}</span>{" "}
              </h3>
            </div>

            {/* recommendation */}
            <div id="company-detail-recommendation">
              {/* {this.props.company.map(company => (
                <h3> Recommendation</h3>
              ))} */}
              <div id="test" />
            </div>
          </div>
        ) : (
          <p>Loading..</p>
        )}
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
    // getBalanceSheet,
    getCompanyDetailById,
  }
)(CompanyDetail);
