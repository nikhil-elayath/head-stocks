import React, { Component } from "react";
import { getCompanyDetailById } from "../../actions/CompanyDetail";
import { connect } from "react-redux";
// importing css file
import "../../styles/CompanyDetailSecondaryNavbar.css";
import { Link } from "react-router-dom";

export class CompanyDetailSecondaryNavbar extends Component {
  componentDidMount() {
    console.log("component mounted");

    // const id = this.props.match.params;
    // console.log(id);
    // this.props.getCompanyDetailById(8);
  }
  // DEFINING THE STATE WITH OVERVIEW AS DEFAULT AND REST TWO OPTIONS FALSE
  state = {
    overview: true,
    financial: false,
    analysis: false,
  };
  render() {
    console.log(this.props);
    // this.props.company ? this.props.company : console.log("Loading...");
    return (
      <div>
        <div id="company-details-tab-container">
          <div>
            {/* <div id="company-detail-overview"> */}
            <ul id="company-detail-content-container">
              <Link
                className="company-link"
                // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER
                to={{ pathname: "/companydetail/" + this.props.company[4] }}
              >
                {/* {this.props.getBalanceSheet()}{" "} */}
                <span
                  id="company-detail-overview-click"
                  // className="secLink"
                  onClick={() => {
                    // changing the values of the state while clicking, the clicked component will be set to true others will be false
                    this.setState({
                      overview: true,
                      financial: false,
                      analysis: false,
                    });
                    console.log("Overview clicked");

                    // this.props.changeDetailsType("summary");
                  }}
                >
                  <li
                    id="comapany-detail-overview-li"
                    // different css properties based on the value of the state
                    className={
                      this.state.overview ? "options-selected-li" : "options-li"
                    }
                  >
                    Overviews
                  </li>
                </span>
              </Link>

              {/* Financial Section  */}
              <div id="company-detail-financial">
                {/* {this.props.home.map(news => ( */}
                <Link
                  className="company-link"
                  to={{
                    // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER

                    pathname: "/financial/" + this.props.company[4],
                  }}
                >
                  <span
                    id="company-financial-click"
                    onClick={() => {
                      this.setState({
                        overview: false,
                        financial: true,
                        analysis: false,
                      });
                      console.log("Financial clicked");
                    }}
                  >
                    <li
                      id="company-detail-financial-li"
                      className={
                        this.state.financial
                          ? "options-selected-li"
                          : "options-li"
                      }
                    >
                      Financials
                    </li>
                  </span>
                </Link>
                {/* ))} */}
              </div>

              {/* Analysis section */}
              <div id="company-detail-analysis">
                <Link
                  className="company-link"
                  to={{
                    pathname: "/analysis/" + this.props.company[4],
                  }}
                >
                  <span
                    id="company-analysis-click"
                    onClick={() => {
                      this.setState({
                        overview: false,
                        financial: false,
                        analysis: true,
                      });
                      console.log("Analysis clicked");
                    }}
                  >
                    <li
                      id="company-detail-analysis-li"
                      className={
                        this.state.analysis
                          ? "options-selected-li"
                          : "options-li"
                      }
                    >
                      Analysis
                    </li>
                  </span>
                </Link>
              </div>
            </ul>
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
  { getCompanyDetailById }
)(CompanyDetailSecondaryNavbar);
