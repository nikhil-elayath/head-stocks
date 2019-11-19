import React, { Component } from "react";
import {
  getCompanyDetailById,
  getOhlcChart,
  getGaugeCompany1,
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
// importing css file
import "../styles/CompanyDetail.css";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";
import Loader from "react-loader-spinner";
import gauge from "./Common/gauge.png";

export class CompanyDetail extends Component {
  componentDidMount() {
    // storing the id in the params into a variable which will be passed along with the action
    const id = this.props.match.params.id;
    this.props.getCompanyDetailById(id);
    this.props.getOhlcChart("AAPL");
    // this.props.getGaugeCompany1("AAPL");
  }
  render() {
    console.log(this.props.gauge1);
    // console.log(this.props.company.tname);
    return (
      <div>
        {/* CALLING SECONDARY NAVBAR  */}
        <SecondaryNavbar />
        {/* TERNARY OPERATOR TO CHECK WHETHER THE DATA IS LOADED IN THE REDUCER AND IF IT IS IT WILL BE MAPPED  */}
        {this.props.company ? (
          <div id="company-detail-grid-container">
            <div id="company-detail-profile">
              {this.props.company.map(company => (
                <>
                  <h3>
                    Market Cap :
                    <span id="market_cap">{company.last_market_cap}</span>
                  </h3>
                  {/* <h3>
                    Sector : <span id="sector">{company.sector}</span>
                  </h3> */}
                  <h3>
                    Industry : <span id="industry">{company.industry}</span>
                  </h3>
                  <h3>
                    Employees : <span id="employee">{company.employees}</span>
                  </h3>
                  <h3>
                    <span id="profile">{company.profile}</span>
                  </h3>
                </>
              ))}
            </div>
            <div id="company-detail-recommendation">
              <img
                id="img_gauge"
                src={"data:image/jpeg;base64," + this.props.gauge1}
              />
            </div>
          </div>
        ) : (
          <p />
        )}
        {this.props.isLoading ? ( // use to display loader [piyush]
          <div style={{ margin: "200px 500px" }}>
            <Loader type={Loader} color="#2c3e50" height="100" width="400" />
          </div>
        ) : (
          // PLOTTIGN THE GRAPH
          <div
            style={{
              // border: "1px solid #cacaca",
              width: "97%",
              margin: "auto",
              marginBottom: "20px",
            }}
          >
            <iframe
              src={this.props.ohlc_chart}
              style={{
                width: "100%",
                height: "550px",
                outline: "none",
                border: "none",
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
  similar_company: state.CompanyDetailReducer.similar_company,
  gauge1: state.CompanyDetailReducer.gauge1,
  ohlc_chart: state.CompanyDetailReducer.ohlc_chart,
  isLoading: state.LoadingReducer.isLoading,
});
export default connect(mapStateToProps, {
  getOhlcChart,
  getCompanyDetailById,
  getGaugeCompany1,
})(CompanyDetail);
