import React from "react";
import { shallow, mount } from "enzyme";
import { CompanyDetailSecondaryNavbar } from "../Common/CompanyDetailSecondaryNavbar";

const getCompanyDetailById = jest.fn();

const click = jest.fn();
const getVolatility = jest.fn();

const company = [
  {
    last_share_price: "aapl",
    share_date: "123456",
    last_market_cap: "123456",
  },
];

const wrapper = shallow(
  <CompanyDetailSecondaryNavbar
    getCompanyDetailById={getCompanyDetailById}
    company={company}
    click={click}
    getVolatility={getVolatility}
  />
);

describe("Testing Company Detail Secondary navbar Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("Should display the sector of the company", () => {
    expect(wrapper.find("#CompanyDetailsIndexClose").text()).toBe("aaplUSD");
  });

  it("It should display the Market Cap of the company", () => {
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
});
