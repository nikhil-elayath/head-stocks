  import React, { Component } from 'react'
  import CompanyDetailSecondaryNavbar from './Common/CompanyDetailSecondaryNavbar'
  import { 
    // getCompanyDetailById,
    getCompanyDatesById } from '../actions/CompanyDetail'
  import { connect } from 'react-redux'
  import '../styles/CompanyDetailFinancial.css'
  export class CompanyDetailFinancial extends Component {
    componentDidMount () {
      // getting the id from the params
      const id = this.props.match.params.id
      // PASSING THE ID TO THE ACTION
      // this.props.getCompanyDetailById(id);
      this.props.getCompanyDatesById(id)
    }
    render () {
      return (
        <div>
          {/* CALLING THE SECONDARY NAVBAR  */}
          <CompanyDetailSecondaryNavbar />
          
        </div>
      )
    }
  }

  const mapStateToProps = state => ({
    // company: state.CompanyDetailReducer.company,
    dates : state.CompanyDetailReducer.dates
  })
  export default connect(
    mapStateToProps,
    { 
      // getCompanyDetailById ,
      getCompanyDatesById}
  )(CompanyDetailFinancial)
