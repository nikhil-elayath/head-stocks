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
              {/* <h3> {company.name}</h3> */}
              <h3> Sector :</h3>
              <p>{company.sector}</p>
              <h3>Market Cap:</h3>
              <p>{company.marketcap}</p>
              <h3>Industry:</h3>
              <p>{company.industry}</p>
              <h3>Employees:</h3>
              <h3>{company.employees}</h3>
              <h3>{company.bio} </h3>
            </div>
          ))}
          {/* recommendation */}
          {/* <div id="company-detail-recommendation">
            {this.props.company.map(company => (
              <h3> {company.sector}</h3>
            ))}
          </div> */}
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
