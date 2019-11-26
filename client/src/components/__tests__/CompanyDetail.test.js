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
    profile: "profile"
  }
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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a container with name company detal grid container", () => {
    expect(wrapper.find("#company-detail-grid-container")).toBeTruthy();
  });

  it("should have a container with name loginRightContainer", () => {
    expect(wrapper.find("Loader")).toBeTruthy();
  });

  it("should have a container with name company graph container", () => {
    expect(wrapper.find("#ohlcCompanyGraph")).toBeTruthy();
  });
  it("should display the Sector", () => {
    expect(wrapper.find(".sector0").props().children).toBe("technology");
  });
  it("should display the industry", () => {
    expect(wrapper.find(".industry0").props().children).toBe("Computer");
  });
  it("should display the employee", () => {
    expect(wrapper.find(".employee0").props().children).toBe("132");
  });
  it("should display the profile", () => {
    expect(wrapper.find(".profile0").props().children).toBe("profile");
  });
});
