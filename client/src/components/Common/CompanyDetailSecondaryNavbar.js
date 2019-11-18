import React, { Component } from "react";
import { getCompanyDetailById } from "../../actions/CompanyDetail";
import { connect } from "react-redux";
import companylogo from "./stockslogo.PNG";
import ReactTooltip from "react-tooltip";

// importing css file
import "../../styles/CompanyDetailSecondaryNavbar.css";
import { Link } from "react-router-dom";

export class CompanyDetailSecondaryNavbar extends Component {
  componentDidMount() {}
  // DEFINING THE STATE WITH OVERVIEW AS DEFAULT AND REST TWO OPTIONS FALSE
  state = {
    overview: true,
    financial: false,
    analysis: false
  };
  render() {
    this.props.company
      ? console.log(this.props.company)
      : console.log("Wait..");
    return (
      <div>
<<<<<<< HEAD
        <div id='parent'>
          {this.props.company ? (
            <div>
              {this.props.company.map(coms => (
                <>
                  <div id='company-details-tab-container'>
                    {/* <div> */}

                    <>
                      <div id='secondary-navbar-img-name-container'>
                        <div id='secondary-navbar-img'>
                          <img
                            id='stocks_img'
                            src={
                              coms.image == null
                                ? companylogo
                                : 'data:image/jpeg;base64,' + coms.image
                            }
                          />
                        </div>

                        <div id='secondary-navbar-ticker_name'>
                          <p>{coms.ticker_name}</p>
                          <p
                            id='#indexClose
'
                          >
                            {coms.last_market_cap}

                            <sub id='secondary-navbar-sub'>USD</sub>
                          </p>
                          <p id='last_date'>
                            Closed price:(
                            {new Date(coms.share_date).toLocaleDateString(
                              'en-IN',
                              {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric'
                              }
                            )}
                            )
                          </p>
                          <div id='voltality'>
                            Volatility: 123456
                            <div id='abc'>
                              <i class='fa fa-question-circle' />
                              <span id='volatility'>
                                Volatility is a statistical measure of the
                                dispersion of returns for a given security or
                                market index. In most cases, the higher the
                                volatility, the riskier the security. Volatility
                                is often measured as either the standard
                                deviation or variance between returns from that
                                same security or market index.
                              </span>
                            </div>
=======
        <div id="company-details-tab-container">
          <div>
            {this.props.company ? (
              <div>
                {this.props.company.map(coms => (
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
                        <p
                          id="#indexClose
"
                        >
                          {coms.last_market_cap}

                          <sub id="secondary-navbar-sub">USD</sub>
                        </p>
                        <p id="last_date">
                          {" "}
                          Closed price:(
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
                        <div id="voltality">
                          Volatility:123456
                          <div id="abc">
                            <i class="fa fa-question-circle" />
                            <span id="volatility">
                              Volatility is a statistical measure of the
                              dispersion of returns for a given security or
                              market index. In most cases, the higher the
                              volatility, the riskier the security. Volatility
                              is often measured as either the standard deviation
                              or variance between returns from that same
                              security or market index.
                            </span>
>>>>>>> c564df2b5941990c10e147c44e5054569c49887f
                          </div>
                        </div>
                        <div />
                      </div>
<<<<<<< HEAD
                      <ul id='company-detail-content-container'>
                        <Link
                          className='company-link'
                          // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER
                          to={{
                            pathname: '/companydetail/' + coms.id
                          }}
                        >
                          <span
                            id='company-detail-overview-click'
=======
                    </div>

                    <h1>{this.props.company.ticker_name}</h1>
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
                          onClick={() => {
                            // changing the values of the state while clicking, the clicked component will be set to true others will be false
                            this.setState({
                              overview: true,
                              financial: false,
                              analysis: false
                            });
                            console.log("Overview clicked");
                          }}
                        >
                          <li
                            id="comapany-detail-overview-li"
                            // different css properties based on the value of the state
                            className={
                              this.state.overview
                                ? "options-selected-li"
                                : "options-li"
                            }
                          >
                            Overview
                          </li>
                        </span>
                      </Link>
                      {/* Financials  */}
                      <div id="company-detail-financial">
                        <Link
                          className="company-link"
                          to={{
                            // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER

                            pathname: "/financial/" + coms.id
                          }}
                        >
                          <span
                            id="company-financial-click"
>>>>>>> c564df2b5941990c10e147c44e5054569c49887f
                            onClick={() => {
                              // changing the values of the state while clicking, the clicked component will be set to true others will be false
                              this.setState({
                                overview: true,
                                financial: false,
                                analysis: false
<<<<<<< HEAD
                              })
                              console.log('Overview clicked')
                            }}
                          >
                            <li
                              id='comapany-detail-overview-li'
                              // different css properties based on the value of the state
                              className={
                                this.state.overview
                                  ? 'options-selected-li'
                                  : 'options-li'
=======
                              });
                            }}
                          >
                            <li
                              id="company-detail-financial-li"
                              className={
                                this.state.financial
                                  ? "options-selected-li"
                                  : "options-li"
>>>>>>> c564df2b5941990c10e147c44e5054569c49887f
                              }
                            >
                              Overview
                            </li>
                          </span>
                        </Link>
                        {/* Financials  */}
                        <div id='company-detail-financial'>
                          <Link
                            className='company-link'
                            to={{
                              // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER

<<<<<<< HEAD
                              pathname: '/financial/' + coms.id
                            }}
                          >
                            <span
                              id='company-financial-click'
                              onClick={() => {
                                this.setState({
                                  overview: false,
                                  financial: true,
                                  analysis: false
                                })
                              }}
=======
                      <div id="company-detail-analysis">
                        <Link
                          className="company-link"
                          to={{
                            pathname: "/analysis/" + coms.id
                          }}
                        >
                          <span
                            id="company-analysis-click"
                            onClick={() => {
                              this.setState({
                                overview: false,
                                financial: false,
                                analysis: true
                              });
                            }}
                          >
                            <li
                              id="company-detail-analysis-li"
                              className={
                                this.state.analysis
                                  ? "options-selected-li"
                                  : "options-li"
                              }
>>>>>>> c564df2b5941990c10e147c44e5054569c49887f
                            >
                              <li
                                id='company-detail-financial-li'
                                className={
                                  this.state.financial
                                    ? 'options-selected-li'
                                    : 'options-li'
                                }
                              >
                                Financials
                              </li>
                            </span>
                          </Link>
                        </div>

                        <div id='company-detail-analysis'>
                          <Link
                            className='company-link'
                            to={{
                              pathname: '/analysis/' + coms.id
                            }}
                          >
                            <span
                              id='company-analysis-click'
                              onClick={() => {
                                this.setState({
                                  overview: false,
                                  financial: false,
                                  analysis: true
                                })
                              }}
                            >
                              <li
                                id='company-detail-analysis-li'
                                className={
                                  this.state.analysis
                                    ? 'options-selected-li'
                                    : 'options-li'
                                }
                              >
                                Analysis
                              </li>
                            </span>
                          </Link>
                        </div>
                      </ul>
                              <div id="secondary-nav-values">
                                values
                      </div>
                    </>

                    <div id='bla'>
                      <div id='secondary-navbar-bla'>
                        {/* second grid of secondaru navbar */}
                        <div id='secondary-download-button'>
                          <button id='downloadButton'>
                            <i class='fa fa-download' /> Download
                          </button>
                        </div>
                      </div>
<<<<<<< HEAD
                    </div>
                  </div>
                  <></>
                </>
              ))}
=======
                    </ul>
                  </>
                ))}
              </div>
            ) : (
              <p />
            )}
          </div>
          <div id="bla">
            <div id="secondary-navbar-bla">
              {/* second grid of secondaru navbar */}
              <div id="secondary-download-button">
                <button id="downloadButton">
                  <i class="fa fa-download" /> Download
                </button>
              </div>
>>>>>>> c564df2b5941990c10e147c44e5054569c49887f
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
  company: state.CompanyDetailReducer.company
});
export default connect(mapStateToProps, { getCompanyDetailById })(
  CompanyDetailSecondaryNavbar
);
