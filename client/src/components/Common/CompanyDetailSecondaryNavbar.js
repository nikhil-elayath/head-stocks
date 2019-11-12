import React, { Component } from 'react'
import { getCompanyDetailById } from '../../actions/CompanyDetail'
import { connect } from 'react-redux'
// importing css file
import '../../styles/CompanyDetailSecondaryNavbar.css'
import { Link } from 'react-router-dom'

export class CompanyDetailSecondaryNavbar extends Component {
  componentDidMount () {}
  // DEFINING THE STATE WITH OVERVIEW AS DEFAULT AND REST TWO OPTIONS FALSE
  state = {
    overview: true,
    financial: false,
    analysis: false
  }
  render () {
    this.props.company.profile
      ? console.log(this.props.company.profile)
      : console.log('Wait..')
    return (
      <div>
        <div id='company-details-tab-container'>
          <div>
            {this.props.company.balancesheet ? (
              <div>
                <h1>
                  {this.props.company.company_name} (
                  {this.props.company.ticker_name})
                </h1>
                <ul id='company-detail-content-container'>
                  <Link
                    className='company-link'
                    // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER
                    to={{
                      pathname:
                        '/companydetail/' + this.props.company.ticker_id
                    }}
                  >
                    <span
                      id='company-detail-overview-click'
                      onClick={() => {
                        // changing the values of the state while clicking, the clicked component will be set to true others will be false
                        this.setState({
                          overview: true,
                          financial: false,
                          analysis: false
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
                        }
                      >
                        Overview
                      </li>
                    </span>
                  </Link>

                  <div id='company-detail-financial'>
                    <Link
                      className='company-link'
                      to={{
                        // PASSING TO COMPANY DETAIL PAGE WITH THE ID WHICH IS MAPPED FROM THE REDUCER

                        pathname: '/financial/' + this.props.company.ticker_id
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
                        pathname: '/analysis/' + this.props.company.ticker_id
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
              </div>
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company
})
export default connect(
  mapStateToProps,
  { getCompanyDetailById }
)(CompanyDetailSecondaryNavbar)
