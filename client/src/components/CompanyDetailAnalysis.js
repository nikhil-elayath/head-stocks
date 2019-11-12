import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import {
  getCompanyDetailById,
  getSimilarTable,
} from "../actions/CompanyDetail";
import { connect } from "react-redux";

export class CompanyDetailAnalysis extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    console.log("From analysis component", id);
    this.props.getCompanyDetailById(id);
    const sector = this.props.company.sector;
    console.log("sector from analysis", sector);
    // this.props.getSimilarTable(sector);
  }
  render() {
    {
      this.props.company
        ? this.props.getSimilarTable(this.props.company.sector)
        : console.log("");
    }
    return (
      <div>
        <CompanyDetailSecondaryNavbar />
        {this.props.similar_company[0] ? (
          <span>{this.props.similar_company[0].ticker_name}</span>
        ) : (
          <p />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
  similar_company: state.CompanyDetailReducer.similar_company,
});
export default connect(
  mapStateToProps,
  { getCompanyDetailById, getSimilarTable }
)(CompanyDetailAnalysis);
