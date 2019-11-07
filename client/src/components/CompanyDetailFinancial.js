import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import { getCompanyDetailById } from "../actions/CompanyDetail";
import { connect } from "react-redux";
import "../styles/CompanyDetailFinancial.css";

export class CompanyDetailFinancial extends Component {
  componentDidMount() {
    // getting the id from the params
    const id = this.props.match.params.id;
    //PASSING THE ID TO THE ACTION
    this.props.getCompanyDetailById(id);
    console.log("financial mounted and id is", id);
  }
  render() {
    return (
      <div>
        <CompanyDetailSecondaryNavbar />
        <p>Financials </p>
        <table>
          <tr>
            <th>
              {/* checks whether tdate isloaded, if it is then it will check if it has the date as specified then it checks whether it has the cash and cash equivalents property to it if it satisfies then it will map that value  */}
              {this.props.company.tdate ? (
                this.props.company.tdate.hasOwnProperty("2010-03-31") ? (
                  this.props.company.tdate["2010-03-31"].hasOwnProperty(
                    "Cash and Cash Equivalents"
                  ) ? (
                    <td>
                      {
                        this.props.company.tdate["2010-03-31"][
                          "Cash and Cash Equivalents"
                        ]
                      }
                    </td>
                  ) : (
                    console.log("Received")
                  )
                ) : (
                  console.log("false")
                )
              ) : (
                console.log("1st do not")
              )}
            </th>
          </tr>
        </table>
        {/* <span>{this.props.company.tdate.2008-12-29}</span> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
});
export default connect(
  mapStateToProps,
  { getCompanyDetailById }
)(CompanyDetailFinancial);
