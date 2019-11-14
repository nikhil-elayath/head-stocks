import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import {
  getCompanyDetailById,
  getSimilarTable
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
import { classBody } from "@babel/types";

export class CompanyDetailAnalysis extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    console.log("From analysis component", id);
    this.props.getCompanyDetailById(id);
  }

  render() {
    return (
      <div>
        {/* checking whether the data has been loaded into the reducer and if it is then getSimilarTabl which will have a parameter sector from the data loaded in the reducer  */}

        <CompanyDetailSecondaryNavbar />
        {this.props.similar_company ? (
          <>
            {this.props.similar_company.map(similar => (
              <p> {similar.ticker_name}</p>
            ))}
          </>
        ) : (
          <p>Loadin </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
  similar_company: state.CompanyDetailReducer.similar_company
});
export default connect(mapStateToProps, {
  getCompanyDetailById,
  getSimilarTable
})(CompanyDetailAnalysis);
