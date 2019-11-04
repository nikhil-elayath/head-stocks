import React, { Component } from "react";
import { getCompanyDetail } from "../actions/CompanyDetail";
import { connect } from "react-redux";
//importing css file
import "../styles/CompanyDetail.css";

export class CompanyDetail extends Component {
  componentDidMount() {
    console.log("component mounted");
    this.props.getCompanyDetail();
  }
  render() {
    return (
      <div>
        <div id="company-detail-grid-container">
          {this.props.company.map(company => (
            <div id="company-detail-profile">
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
              <h3> {company.sector}</h3>
            ))}
            <div id="test"></div>
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
  { getCompanyDetail }
)(CompanyDetail);
