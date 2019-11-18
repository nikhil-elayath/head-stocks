import React from "react";
import { shallow, mount } from "enzyme";
import { CompanyDetailSecondaryNavbar } from "../Common/CompanyDetailSecondaryNavbar";

const getCompanyDetailById = jest.fn();
const getOhlcChart = jest.fn();
const getGaugeCompany1 = jest.fn();
const click = jest.fn();

const company = [
  {
    last_share_price: "aapl",
    share_date: "123456",
    last_market_cap: "123456",
    // industry: "Computer",
    // employees: "132",
    // profile: "profile",
  },
];

const wrapper = shallow(
  <CompanyDetailSecondaryNavbar
    getCompanyDetailById={getCompanyDetailById}
    company={company}
    click={click}
  />
);

describe("Testing Company Detail Secondary navbar Component", () => {
  //   afterEach(() => {
  //     jest.clearAllMocks()

  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should display the market cap", () => {
    expect(wrapper.find("#indexClose").text()).toBe("aaplUSD");
  });

  it("should display the market cap", () => {
    expect(wrapper.find("#market_cap").text()).toBe(" 123456 ");
  });

  //   download button
  it("checks for on edit button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#downloadButton").simulate("click", e);
  });

  //overview
  it("checks for on edit button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#company-detail-overview-click").simulate("click", e);
  });

  //financial
  it("checks for on edit button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#company-financial-click").simulate("click", e);
  });

  //analysis
  it("checks for on edit button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#company-detail-analysis").simulate("click", e);
  });

  it("should display the market cap", () => {
    expect(wrapper.find("#volatility").text()).toBe(
      "Volatility is a statistical measure of the dispersion of returns for a given security or market index. In most cases, the higher the volatility, the riskier the security. Volatility is often measured as either the standard deviation or variance between returns from that same security or market index."
    );
  });
  it("should display the market cap", () => {
    expect(wrapper.find("#kk").text()).toBe("VOLATILITY");
  });

  //on click function
});
