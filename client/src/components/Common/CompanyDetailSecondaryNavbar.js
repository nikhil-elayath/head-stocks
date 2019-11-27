import React, { Component } from "react";
import {
  getCompanyDetailById,
  getVolatility
} from "../../actions/CompanyDetail";
import { connect } from "react-redux";
import companylogo from "./stockslogo.PNG";

// importing css file
import "../../styles/CompanyDetailSecondaryNavbar.css";
import { Link } from "react-router-dom";

export class CompanyDetailSecondaryNavbar extends Component {
  componentDidMount() {
    this.props.getVolatility("AAPL");
  }
  render() {
    return (
      <div>
        <div id="parent">
          {this.props.company ? (
            <div>
              {this.props.company.map(coms => (
                <>
                  <div id="company-details-tab-container">
                    <>
                      <div id="secondary-navbar-img-name-container">
                        <div id="secondary-navbar-img">
                          <img
                            id="stocks_img"
                            src={
                              coms.image == null
                                ? companylogo
                                : "data:image/jpeg;base64," + coms.image
                            }
                          />
                        </div>

                        <div id="secondary-navbar-ticker_name">
                          <p>{coms.ticker_name}</p>
                          <p id="CompanyDetailsIndexClose">
                            {coms.last_share_price}

                            <sub id="secondary-navbar-sub">USD</sub>
                          </p>
                          <p id="last_date">
                            CLOSED PRICE (
                            {new Date(coms.share_date).toLocaleDateString(
                              "en-IN",
                              {
                                month: "short",
                                day: "2-digit",
                                year: "numeric"
                              }
                            )}
                            )
                          </p>
                        </div>
                        <div />
                      </div>
                      <ul id="company-detail-content-container">
                        <Link
                          className="company-link"
                          // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER
                          to={{
                            pathname: "/companydetail/" + coms.id
                          }}
                        >
                          <span
                            id="company-detail-overview-click"
                            // onClick={() => {
                            //   // changing the values of the state while clicking, the clicked component will be set to true others will be false
                            //   // this.setState({
                            //   //   overview: true,
                            //   //   financial: false,
                            //   //   analysis: false,
                            //   // });
                            //   console.log("Overview clicked");
                            // }}
                          >
                            <li
                              id="comapany-detail-overview-li"
                              // different css properties based on the value of the state
                              className={
                                this.props.selected === "overview"
                                  ? "options-selected-li"
                                  : "options-li"
                              }
                            >
                              Overview
                            </li>
                          </span>
                        </Link>
                        {/* Financials  */}
                        {/* <div id="company-detail-financial"> */}

                        <div id="company-detail-financial">
                          <Link
                            className="company-link"
                            to={{
                              pathname: "/financial/" + coms.id
                            }}
                          >
                            <span
                              id="company-financial-click"
                              // onClick={() => {
                              //   this.setState({
                              //     overview: false,
                              //     financial: true,
                              //     analysis: false,
                              //   });
                              // }}
                            >
                              <li
                                id="company-detail-financial-li"
                                className={
                                  this.props.selected === "financial"
                                    ? "options-selected-li"
                                    : "options-li"
                                }
                              >
                                Financials
                              </li>
                            </span>
                          </Link>
                        </div>

                        <div id="company-detail-analysis">
                          <Link
                            className="company-link"
                            to={{
                              pathname: "/analysis/" + coms.id
                            }}
                          >
                            <span
                              id="company-analysis-click"
                              // onClick={() => {
                              //   this.setState({
                              //     overview: false,
                              //     financial: false,
                              //     analysis: true
                              //   });
                              // }}
                            >
                              <li
                                id="company-detail-analysis-li"
                                className={
                                  this.props.selected === "analysis"
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
                      <div id="secondary-nav-values">
                        <div id="voltality">
                          <p> {this.props.voltality} </p>
                          <div id="voltality_tooltip">
                            <div id="kk">VOLATILITY </div>
                            <div id="abc">
                              <i class="fa fa-question-circle" />
                              <span id="volatility">
                                Volatility is a statistical measure of the
                                dispersion of returns for a given security or
                                market index. In most cases, the higher the
                                volatility, the riskier the security. Volatility
                                is often measured as either the standard
                                deviation or variance between returns from that
                                same security or market index.
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* ------------------------------------------------------------------ */}
                        <div id="voltality">
                          <p id="market_cap"> {coms.last_market_cap} </p>
                          <div id="kk">MARKET CAP</div>
                        </div>
                        {/* --------------------------------------------------------------------------- */}
                      </div>
                    </>

                    <div id="bla">
                      {localStorage.getItem("token") ? (
                        <div id="secondary-navbar-bla">
                          {/* second grid of secondaru navbar */}
                          <button
                            id="downloadButton"
                            onClick={async () => {
                              fetch(
                                "http://localhost:2001/api/companydetail/indicatorsdata/" +
                                  coms.ticker_name
                              ).then(response => {
                                response.blob().then(blob => {
                                  let url = window.URL.createObjectURL(blob);
                                  let a = document.createElement("a");
                                  a.href = url;
                                  a.download = coms.ticker_name + ".csv";
                                  a.click();
                                });
                                //window.location.href = response.url;
                              });
                              // this.props.downloadOHLC("AAPL");
                            }}
                          >
                            <i class="fa fa-download" /> Download
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: "none" }}></div>
                      )}
                    </div>
                  </div>
                  <></>
                </>
              ))}
            </div>
          ) : (
            <p />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
  voltality: state.CompanyDetailReducer.voltality
});
export default connect(mapStateToProps, {
  getCompanyDetailById,
  getVolatility
})(CompanyDetailSecondaryNavbar);
