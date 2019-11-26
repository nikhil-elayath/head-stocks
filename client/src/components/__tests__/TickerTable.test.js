import React from "react";
import { shallow, mount } from "enzyme";
import { TickerTable } from "../Common/TickerTable";

const tickerTable = jest.fn();
const tableHeaders = ["Ticker", "Chng%", "MarketCap", "Share PRice"];
const tableData = [
  { ticker_name: "AAPL" },
  {
    tickerValues: { chng: "+2.13", marketCap: "213456.00", sharePrice: "2.13" }
  }
];
const wrapper = shallow(
  <TickerTable
    tickerTable={tickerTable}
    tableHeaders={tableHeaders}
    tableData={tableData}
  />
);
describe("Testing Ticker Table Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a container with name table__containerr", () => {
    expect(wrapper.find("#table__containerr")).toBeTruthy();
  });

  it("should have a table with name ticker__table", () => {
    expect(wrapper.find("#ticker__table")).toBeTruthy();
  });

  it("should have a thead with name ticker__tableHeader", () => {
    expect(wrapper.find("#ticker__tableHeader")).toBeTruthy();
  });

  it("should have a Link", () => {
    expect(wrapper.find("Link")).toBeTruthy();
  });

  it("should have a table headers in each row ", () => {
    expect(wrapper.find("#TickerHeaders0").props().children).toBe(
      tableHeaders[0]
    );
  });

  it("should have a table values in each row ", () => {
    expect(wrapper.find("#tickerValues0").props().children).toBe("+2.13");
  });

  it("should have a ticker name in each row ", () => {
    var isIndex = false;
    expect(wrapper.find("#tcikerNameReuse0").props().children).toBe(
      tableData[0].ticker_name
    );
  });
});
