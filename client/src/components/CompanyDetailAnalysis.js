import React, { Component } from "react";
import CompanyDetailSecondaryNavbar from "./Common/CompanyDetailSecondaryNavbar";
import {
  getCompanyDetailById,
  getSimilarTable,
  getDropDownData,
  getGaugeCompany1,
  getGaugeCompany2,
  getmonteCarloCompany1,
  getmonteCarloCompany2,
  getAssetsCompany1,
  getAssetsCompany2
} from "../actions/CompanyDetail";
import { connect } from "react-redux";
import "../styles/CompanyDetailAnalysis.css";
import gauge from "./Common/gauge.png";

export class CompanyDetailAnalysis extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    console.log("From analysis component", id);
    this.props.getCompanyDetailById(id);
    // this.props.getGaugeCompany1("AAPL");
    // this.props.getGaugeCompany2("ACN");
    this.props.getAssetsCompany1("AAPL");
    this.props.getAssetsCompany2("ACN");
  }

  //function that would change the state value with the value selected and inside which the action function will be called and that ticker name will passed
  // this action is to plot the graph
  OnSelectTicker = e => {
    this.setState({
      ticker_name: e.target.value
    });
    this.props.getGaugeCompany2(e.target.value);
    this.props.getAssetsCompany2(e.target.value);
  };

  render() {
    console.log(this.props.assets1);
    return (
      <div>
        {/* checking whether the data has been loaded into the reducer and if it is then getSimilarTabl which will have a parameter sector from the data loaded in the reducer  */}
        <CompanyDetailSecondaryNavbar />
        {/* <div style={{ width: "1000px", margin: "auto" }}>
          {this.props.similar_company["0"] ? (
            <>
              {console.log(this.props.similar_company["0"].similar_sector_data)}
              <Table
                tableHeaders={[
                  "Ticker",
                  "Dividends",
                  "Market Cap",
                  "Net Profit",
                  "P/E ratio",
                  "Share Price",
                  "ROCE%"
                ]}
                tableData={this.props.similar_company["0"]}
              />
            </>
          ) : (
            <p>Loading </p>
          )}
        </div> */}
        {/* DROPDOWN FOR SIMILAR COMPANIES  */}
        <div id="company-analysis-similar-cimpany-dropdown">
          <select
            type="text"
            id="stocks_dropdown"
            name="sector"
            onChange={this.OnSelectTicker}
          >
            {this.props.drop_down_data.map(companies => (
              <>
                <option name="choice">{companies.ticker_name}</option>
              </>
            ))}
          </select>
        </div>
        <div id="analysis-stock-chart">stock chart</div>
        <div id="analysis-price-summary">price summary</div>
        Recommendation
        <div id="analysis-recommendation-grid-container">
          <div id="analysis-recommendation-1">
            <img
              id="analysis-gauge-1"
              src={
                this.props.gauge1
                  ? "data:image/jpeg;base64," + this.props.gauge1
                  : gauge
              }
            />
          </div>
          <div id="analysis-recommendation-2">
            <img
              id="analysis-gauge-2"
              src={
                this.props.gauge2
                  ? "data:image/jpeg;base64," + this.props.gauge2
                  : gauge
              }
            />
          </div>
        </div>
        <div id="analysis-financial-positional-grid-container">
          <div id="analysis-financial-positional-1">
            <iframe
              id="assets1"
              src={this.props.assets1}
              style={{
                width: "500px",
                height: "500px",
                outline: "none",
                border: "none"
              }}
            />
          </div>
          <div id="analysis-financial-positional-2">
            <iframe
              src={this.props.assets2}
              style={{
                width: "500px",
                height: "500px",
                outline: "none",
                border: "none"
              }}
            />
          </div>
        </div>
        {/* parent div  */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  company: state.CompanyDetailReducer.company,
  similar_company: state.CompanyDetailReducer.similar_company,
  drop_down_data: state.CompanyDetailReducer.drop_down_data,
  gauge1: state.CompanyDetailReducer.gauge1,
  gauge2: state.CompanyDetailReducer.gauge2,
  maonteCarlo1: state.CompanyDetailReducer.maonteCarlo1,
  maonteCarlo2: state.CompanyDetailReducer.drop_down_data,
  assets1: state.CompanyDetailReducer.assets1,
  assets2: state.CompanyDetailReducer.assets2
});
export default connect(mapStateToProps, {
  getCompanyDetailById,
  getSimilarTable,
  getDropDownData,
  getGaugeCompany1,
  getGaugeCompany2,
  getmonteCarloCompany1,
  getmonteCarloCompany2,
  getAssetsCompany1,
  getAssetsCompany2
})(CompanyDetailAnalysis);
