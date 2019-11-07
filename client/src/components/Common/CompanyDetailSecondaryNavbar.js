import React, { Component } from 'react'
// import { getCompanyDetail } from '../actions/CompanyDetail'
import { connect } from 'react-redux'
// importing css file
import '../../styles/CompanyDetailSecondaryNavbar.css'

export class CompanyDetailSecondaryNavbar extends Component {
  componentDidMount () {
    console.log('component mounted')
    // this.props.getCompanyDetail()
  }
  render () {
    return (
      <div>
        <div id='company-details-tab-container'>
          <div id='company-detail-content-container'>
            <div id='company-detail-overview'>
              <span>Overview</span>
            </div>

            <div id='company-detail-financial'>
              <span>Financials</span>
            </div>
            <div id='company-detail-analysis'>
              <span>Analysis</span>
            </div>
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
  mapStateToProps
  //   { getCompanyDetail }
)(CompanyDetailSecondaryNavbar)
