import React, { Component } from "react";
import { getCompanyDetailById, getOhlcChart } from "../actions/CompanyDetail";
import { connect } from "react-redux";
// importing css file
import "../styles/CompanyDetail.css";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";
// import loader from "./Common/Loader.gif";
import Loader from "react-loader-spinner";

export class CompanyDetail extends Component {
  componentDidMount() {
    // storing the id in the params into a variable which will be passed along with the action
    const id = this.props.match.params.id;
    this.props.getCompanyDetailById(id);
    this.props.getOhlcChart("AAPL");
  }
  render() {
    console.log(this.props);
    // console.log(this.props.company.tname);
    return (
      <div>
        {/* CALLING SECONDARY NAVBAR  */}
        <SecondaryNavbar />
        {/* TERNARY OPERATOR TO CHECK WHETHER THE DATA IS LOADED IN THE REDUCER AND IF IT IS IT WILL BE MAPPED  */}
        {this.props.company ? (
          <div id="company-detail-grid-container">
            <div id="company-detail-profile">
              {this.props.company.map(coms => (
                <>
                  <h3>
                    Market Cap : <span>{coms.last_market_cap}</span>
                  </h3>
                  <h3>
                    Sector : <span>{coms.sector}</span>
                  </h3>
                  <h3>
                    Industry : <span>{coms.industry}</span>
                  </h3>
                  <h3>
                    Employees : <span>{coms.employees}</span>
                  </h3>
                  <h3>
                    <span>{coms.profile}</span>
                  </h3>
                </>
              ))}
            </div>
          </div>
        ) : (
          <p />
        )}
        {this.props.isLoading ? ( // use to display loader [piyush]
          <div style={{ margin: "200px 500px" }}>
            <Loader type={Loader} color="#2c3e50" height="100" width="400" />
            {/* <img src={loader} alt="loading..." /> */}
          </div>
        ) : (
          // PLOTTIGN THE GRAPH
          <div
            style={{
              border: "1px solid #cacaca",
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

  ohlc_chart: state.CompanyDetailReducer.ohlc_chart,
  isLoading: state.LoadingReducer.isLoading,
});
export default connect(mapStateToProps, { getOhlcChart, getCompanyDetailById })(
  CompanyDetail
);
