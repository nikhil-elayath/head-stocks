import React from "react";
import { shallow, mount } from "enzyme";
import { CompanyDetailAnalysis } from "../CompanyDetailAnalysis";

const getCompanyDetailById = jest.fn();
const getSimilarTable = jest.fn();

const getOhlcChart = jest.fn();
const getGaugeCompany1 = jest.fn();
const getGaugeCompany2 = jest.fn();
const getAssetsCompany1 = jest.fn();
const getAssetsCompany2 = jest.fn();
let match = { params: { id: 1 }, isExact: true, path: "", url: "" };

const gauge1 = [{ url: "gauge1" }];

const assets1 = [{ url: "sad" }];

const similar_company = [
  {
    ticker_name: "asdsa",
  },
];
const company = [
  {
    ticker_name: "asdsa",
  },
];

const drop_down_data = [
  {
    ticker_name: "aapl",
  },
];
const gauge2 = [{ url: "gauge2" }];

const wrapper = shallow(
  <CompanyDetailAnalysis
    getSimilarTable={getSimilarTable}
    getCompanyDetailById={getCompanyDetailById}
    similar_company={similar_company}
    match={match}
    company={company}
    drop_down_data={drop_down_data}
    getOhlcChart={getOhlcChart}
    gauge1={gauge1}
    gauge2={gauge2}
    assets1={assets1}
    getGaugeCompany1={getGaugeCompany1}
    getGaugeCompany2={getGaugeCompany2}
    getAssetsCompany1={getGaugeCompany1}
    getAssetsCompany1={getAssetsCompany1}
    getAssetsCompany2={getAssetsCompany2}
  />
);
describe("Testing Company Detail Component", () => {
  it("should display the profile", () => {
    expect(wrapper.find("#stocks_dropdown").text()).toBe("aapl");
  });
  it("should display the profile", () => {
    expect(wrapper.find("#analysis-gauge-1").text()).toBe("");
  });
  it("should display the profile", () => {
    expect(wrapper.find("#analysis-gauge-2").text()).toBe("");
  });

  it("should display the profile", () => {
    expect(wrapper.find("#assets1").text()).toBe("");
  });
  // it("should display the profile", () => {
  //   expect(wrapper.find("#analysis-gauge-2").text()).toBe("");
  // });
});
