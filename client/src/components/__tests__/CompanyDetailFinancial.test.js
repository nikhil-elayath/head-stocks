import React from "react";
// import { Home } from '../Home'
import { shallow, mount } from "enzyme";
import { CompanyDetailFinancial } from "../CompanyDetailFinancial";

const getCompanyDatesById = jest.fn();

// const balancesheet = [
//   {
//     sector: 'technology',
//     industry: 'Computer',
//     employees: '123456',
//     profile: 'profile',
//     cashequivalents: '123',
//     currentassests: '123',
//     totalassests: '123',
//     accountpayable: '123',
//     receivables: '123',
//     totalliabilities: '123',
//     currentliabilities: '123',
//     preferredequity: '123',
//     equitybeforeminorities: '123',
//     minorityinterests: '123',
//     noncurrentliabilities: '123',
//     netincome: '123',
//     revenues: '123',
//     FOIT: '123',
//     netprofit: '123',
//     RandD: '123',
//     incometax: '123',
//     currentliabilities: '123',
//     preferredequity: '123',
//     equitybeforeminorities: '123',
//     minorityinterests: '123',
//     noncurrentliabilities: '123',
//     netincome: '123',
//     revenues: '123',
//     FOIT: '123',
//     netprofit: '123',
//     RandD: '123',
//     incometax: '123',
//     currentliabilities: '123',
//     preferredequity: '123'
//   }
// ]
// const company=[]
// const financialsText = [
//   {
//     table1: "Balance Sheet",
//     table2: "Cash Flow",
//     table3: "Profit Ans Loss",
//     table4: "Ratios"
//    }
// ];

const wrapper = shallow(
  <CompanyDetailFinancial
    getCompanyDatesById={getCompanyDatesById}
    match={{ params: { id: 1 } }}

    // balancesheet={balancesheet}
    // match={{ params: { id: 1 } }}
    // company={company}
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
});
