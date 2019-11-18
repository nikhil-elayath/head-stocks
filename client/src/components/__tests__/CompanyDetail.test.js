import React from "react";
import { shallow, mount } from "enzyme";
import { CompanyDetail } from "../CompanyDetail";

const getCompanyDetailById = jest.fn();
const getOhlcChart = jest.fn();
const getGaugeCompany1 = jest.fn();

const company = [
  {
    last_market_cap: "123456",
    sector: "technology",
    industry: "Computer",
    employees: "132",
    profile: "profile",
  },

  // employees: "123456",
  // profile: "profile",
];

const wrapper = shallow(
  <CompanyDetail
    getCompanyDetailById={getCompanyDetailById}
    company={company}
    match={{ params: { id: 1 } }}
    getOhlcChart={getOhlcChart}
    getGaugeCompany1={getGaugeCompany1}
  />
);

describe("Testing Company Detail Component", () => {
  //   afterEach(() => {
  //     jest.clearAllMocks()

  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should display the market cap", () => {
    expect(wrapper.find("#market_cap").text()).toBe("123456");
  });
  it("should display the Sector", () => {
    expect(wrapper.find("#sector").text()).toBe("technology");
  });
  it("should display the industry", () => {
    expect(wrapper.find("#industry").text()).toBe("Computer");
  });
  it("should display the employee", () => {
    expect(wrapper.find("#employee").text()).toBe("132");
  });
  it("should display the profile", () => {
    expect(wrapper.find("#profile").text()).toBe("profile");
  });
});
