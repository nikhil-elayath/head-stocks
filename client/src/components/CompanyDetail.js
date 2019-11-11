import React, { Component } from "react";
import { getCompanyDetailById, getOhlcChart } from "../actions/CompanyDetail";
import { connect } from "react-redux";
// importing css file
import "../styles/CompanyDetail.css";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";
import loader from "./Common/Loader.gif";
import Loader from "react-loader-spinner";

export class CompanyDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getCompanyDetailById(id);
    this.props.getOhlcChart("AAPL");
    console.log("printing id from the component", id);

    console.log("component mounted");
  }
  render() {
    // console.log(this.props.company.tname);
    return (
      <div>
        <SecondaryNavbar />
        {this.props.company.balancesheet ? (
          <div id="company-detail-grid-container">
            {/* {this.props.company.map(company => ( */}
            <div id="company-detail-profile">
              <h3>
                Maket Cap : <span>1.156T for Nov. 8, 2019</span>
              </h3>
              <h3>
                Sector : <span>{this.props.company.sector}</span>
              </h3>
              <h3>
                Industry : <span>{this.props.company.industry}</span>
              </h3>
              <h3>
                Employees : <span>{this.props.company.employess}</span>
              </h3>

              {/* <h4>{this.props.company.ticker_name}</h4> */}

              <h3 id="company-detail-profile-span" style={{ fontSize: "17px" }}>
                {this.props.company.profile}
              </h3>
              {/* <h4>{this.props.company.company_name}</h4> */}
            </div>

            {/* recommendation */}
            {/* <div id="company-detail-recommendation">
              {this.props.company.map(company => (
              ))}
              <h3> Recommendation</h3>

              <div id="test" />
            </div> */}
          </div>
        ) : (
          <p>Loading..</p>
        )}
        {this.props.isLoading ? ( // use to display loader [piyush]
          <div style={{ margin: "200px 500px" }}>
            <Loader type={Loader} color="#2c3e50" height="100" width="400" />
            {/* <img src={loader} alt="loading..." /> */}
          </div>
        ) : (
          <div
            style={{
              border: "1px solid #cacaca",
              width: "97%",
              margin: "auto",
              marginBottom: "20px"
            }}
          >
            <iframe
              src={this.props.ohlc_chart}
              style={{
                width: "100%",
                height: "550px",
                outline: "none",
                border: "none"
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
  ohlc_chart: state.CompanyDetailReducer.ohlc_chart,
  isLoading: state.LoadingReducer.isLoading
});
export default connect(
  mapStateToProps,
  { getOhlcChart, getCompanyDetailById }
)(CompanyDetail);
