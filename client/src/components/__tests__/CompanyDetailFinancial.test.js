import React from "react";
import { shallow } from "enzyme";
import { CompanyDetailFinancial } from "../CompanyDetailFinancial";

const getCompanyDatesById = jest.fn();
const getByYear = jest.fn();

const wrapper = shallow(
  <CompanyDetailFinancial
    getCompanyDatesById={getCompanyDatesById}
    getByYear={getByYear}
    match={{ params: { id: 1 } }}
  />
);

describe("Testing Company Detail Financial Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display the market cap", () => {
    expect(wrapper.find("#table1").text()).toBe("Balance Sheet");
  });
  it("should display the Sector", () => {
    expect(wrapper.find("#table2").text()).toBe("Cash Flow");
  });
  it("should display the industry", () => {
    expect(wrapper.find("#table3").text()).toBe("Profit And Loss");
  });
  it("should display the employee", () => {
    expect(wrapper.find("#table4").text()).toBe("Ratios");
  });

  it("should simulate button click on balance Sheet Option button tab ", () => {
    wrapper.find("#item1").simulate("click");
    expect(wrapper.state().balanceSheetOption).toBe(true);
    expect(wrapper.state().cashflowOption).toBe(false);
    expect(wrapper.state().profitLossOption).toBe(false);
    expect(wrapper.state().ratiosOption).toBe(false);
  });
  it("should simulate button click on cash flow Option button tab ", () => {
    wrapper.find("#item2").simulate("click");
    expect(wrapper.state().balanceSheetOption).toBe(false);
    expect(wrapper.state().cashflowOption).toBe(true);
    expect(wrapper.state().profitLossOption).toBe(false);
    expect(wrapper.state().ratiosOption).toBe(false);
  });
  it("should simulate button click on profit Loss Option button tab ", () => {
    wrapper.find("#item3").simulate("click");
    expect(wrapper.state().balanceSheetOption).toBe(false);
    expect(wrapper.state().cashflowOption).toBe(false);
    expect(wrapper.state().profitLossOption).toBe(true);
    expect(wrapper.state().ratiosOption).toBe(false);
  });
  it("should simulate button click on ratios Option button tab ", () => {
    wrapper.find("#item4").simulate("click");
    expect(wrapper.state().balanceSheetOption).toBe(false);
    expect(wrapper.state().cashflowOption).toBe(false);
    expect(wrapper.state().profitLossOption).toBe(false);
    expect(wrapper.state().ratiosOption).toBe(true);
  });

  it("should check for presense of onSearch function", () => {
    let getByYear = jest.spyOn(wrapper.instance(), "getByYear");
    expect(getByYear).toBeTruthy();
  });

  it("checks for on getByYear to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#financialsYearsOptionID").simulate("click", e);
  });
  it("should check for All years Data", () => {
    const e = {
      target: {
        name: "yearInput",
        value: "All"
      }
    };
    expect(wrapper.state().search_term).toBe(undefined);
    wrapper.instance().getByYear(e);
    expect(getCompanyDatesById).toBeCalledTimes(2);
  });

  it("should check for a single year data", () => {
    const e = {
      target: {
        name: "yearInput",
        value: "2019"
      }
    };
    expect(wrapper.state().search_term).toBe(undefined);
    wrapper.instance().getByYear(e);
    expect(getCompanyDatesById).toBeCalledTimes(3);
  });
});
