import React, { Component } from "react";
import { connect } from "react-redux";
import SecondaryNavbar from "../components/Common/CompanyDetailSecondaryNavbar";
import "../styles/CompanyDetailFinancial.css";
// importing action
import { getCompanyDatesById } from "../actions/CompanyDetail";
// images for the sidebar
import balanceSheet from "./bl.png";
import cashFlow from "./cf.png";
import profitloss from "./pl.png";
import ratios from "./ratios.png";

import ReportsTable from "./Reports";
export class CompanyDetailFinancial extends Component {
  state = {
    balanceSheetOption: true,
    cashflowOption: false,
    profitLossOption: false,
    ratiosOption: false,
  };

  componentDidMount() {
    // getting the id from the params
    const id = this.props.match.params.id;
    // PASSING THE ID TO THE ACTION
    this.props.getCompanyDatesById(id);
  }
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
                    ratiosOption: false,
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
                    ratiosOption: false,
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
                    ratiosOption: false,
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
                    ratiosOption: true,
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
                "Equity Before Minorities",
              ]}
              reportdata={report}
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
                "Change in Working Capital",
              ]}
              reportdata={report}
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
                "Income Taxes",
              ]}
              reportdata={report}
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
                "Operating Income / EV",
              ]}
              reportdata={report}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dates: state.CompanyDetailReducer.dates,
});
export default connect(mapStateToProps, {
  getCompanyDatesById,
})(CompanyDetailFinancial);
