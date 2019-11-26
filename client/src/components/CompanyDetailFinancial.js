import React, { Component } from "react";
import { connect } from "react-redux";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";
import "../styles/CompanyDetailFinancial.css";
// importing action
import { getCompanyDatesById } from "../actions/CompanyDetail";
// images for the sidebar
import balanceSheet from "./Common/bl.png";
import cashFlow from "./Common/cf.png";
import profitloss from "./Common/pl.png";
import ratios from "./Common/ratios.png";

import ReportsTable from "./Reports";

let yearSelected = {};
export class CompanyDetailFinancial extends Component {
  constructor(props) {
    super(props);
    const year = new Date().getFullYear();
    this.years = Array.from(new Array(20), (val, index) => year - index);
    this.state = {
      balanceSheetOption: true,
      cashflowOption: false,
      profitLossOption: false,
      ratiosOption: false,

      // selecting yearly data
      yearInput: "All"
    };
  }

  // state = {

  // };

  componentDidMount() {
    // getting the id from the params
    const id = this.props.match.params.id;
    yearSelected = { yearInput: "All" };
    // PASSING THE ID TO THE ACTION
    this.props.getCompanyDatesById(id, yearSelected);
  }

  getByYear = e => {
    this.setState({
      yearInput: e.target.value
    });

    const id = this.props.match.params.id;

    if (this.state.yearInput === "All") {
      yearSelected = { yearInput: "All" };
    } else {
      yearSelected = {
        yearInput: e.target.value
      };
    }
    this.props.getCompanyDatesById(id, yearSelected);
  };

  render() {
    let report = this.props
      ? this.props.dates
        ? this.props.dates.length > 0
          ? this.props.dates
          : []
        : []
      : [];

    return (
      <div>
        {/* CALLING THE SECONDARY NAVBAR  */}
        <SecondaryNavbar selected="financial" />
        <div className="financialYearsDropdown">
          <select
            type="text"
            className="financialsYearsOption"
            id="financialsYearsOptionID"
            name="yearInput"
            value={this.state.yearInput}
            onChange={this.getByYear}
          >
            <option name="choice">All</option>

            {this.years.map((year, index) => {
              return (
                <option key={`year${index}`} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        <div className="financialsMainGrid">
          <sidebar className="financialsSidebar">
            <div
              className="financialsSidebarOptions"
              id="financialsSidebarMain"
            >
              <a
                id="item1"
                href="#table1"
                className={
                  this.state.balanceSheetOption ? "financialsSidebarItem" : null
                }
                onClick={() =>
                  this.setState({
                    balanceSheetOption: true,
                    cashflowOption: false,
                    profitLossOption: false,
                    ratiosOption: false
                  })
                }
              >
                <img
                  src={balanceSheet}
                  alt="Balance Sheet"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Balance Sheet</p>
              </a>
              <a
                id="item2"
                href="#table2"
                className={
                  this.state.cashflowOption ? "financialsSidebarItem" : null
                }
                onClick={() =>
                  this.setState({
                    balanceSheetOption: false,
                    cashflowOption: true,
                    profitLossOption: false,
                    ratiosOption: false
                  })
                }
              >
                <img
                  src={cashFlow}
                  alt="Cash Flow"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Cash Flow</p>
              </a>
              <a
                id="item3"
                href="#table3"
                className={
                  this.state.profitLossOption ? "financialsSidebarItem" : null
                }
                onClick={() =>
                  this.setState({
                    balanceSheetOption: false,
                    cashflowOption: false,
                    profitLossOption: true,
                    ratiosOption: false
                  })
                }
              >
                <img
                  src={profitloss}
                  alt="Profit & Loss"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Profit & Loss</p>
              </a>
              <a
                id="item4"
                href="#table4"
                className={
                  this.state.ratiosOption ? "financialsSidebarItem" : null
                }
                onClick={() =>
                  this.setState({
                    balanceSheetOption: false,
                    cashflowOption: false,
                    profitLossOption: false,
                    ratiosOption: true
                  })
                }
              >
                <img
                  src={ratios}
                  alt="Ratios"
                  width="80px"
                  height="80px"
                  style={{ margin: "20px 10px 10px 10px" }}
                />
                <p className="financialsSidebarOptionsP">Ratios</p>
              </a>
            </div>
          </sidebar>

          <div className="financialsAllTablesDiv">
            <h1 className="financialsTitle" id="table1">
              Balance Sheet
            </h1>

            <ReportsTable
              headers={[
                "date",
                "Current Assets",
                "Intangible Assets",
                "Cash & Cash Equivalents",
                "Goodwill",
                "Total Assets",
                "Accounts Payable",
                "Receivables",
                "Current Liabilities",
                "Total Liabilities",
                "Preferred Equity",
                "Total Noncurrent Liabilities",
                "Equity Before Minorities"
              ]}
              reportdata={report}
              yearValue={this.state.yearInput}
            />
            {/* </div> */}
            <h1 className="financialsTitle" id="table2">
              Cash Flow
            </h1>
            <ReportsTable
              headers={[
                "date",
                "Depreciation & Amortisation",
                "PP&E & Intangibles",
                "Net Change in PP&E & Intangibles",
                "Net Change in Cash",
                "Cash From Operating Activities",
                "Cash From Investing Activities",
                "Cash From Financing Activities",
                "Change in Working Capital"
              ]}
              reportdata={report}
              yearValue={this.state.yearInput}
            />

            <h1 className="financialsTitle" id="table3">
              Profit And Loss
            </h1>
            <ReportsTable
              headers={[
                "date",
                "Revenues",
                "EBIT",
                "Net Profit",
                "R&D",
                "Income Taxes"
              ]}
              reportdata={report}
              yearValue={this.state.yearInput}
            />

            <h1 className="financialsTitle" id="table4">
              Ratios
            </h1>
            <ReportsTable
              headers={[
                "date",
                "Liabilities to Equity Ratio",
                "Debt to Assets Ratio",
                "Current Ratio",
                "EV / EBITDA",
                "EV / Sales",
                "Operating Income / EV"
              ]}
              reportdata={report}
              yearValue={this.state.yearInput}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dates: state.CompanyDetailReducer.dates
});
export default connect(mapStateToProps, {
  getCompanyDatesById
})(CompanyDetailFinancial);
