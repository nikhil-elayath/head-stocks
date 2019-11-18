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
{
  console.log();
}
describe("Testing Register Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a table headers in each row ", () => {
    expect(wrapper.find("#TickerHeaders0").props().children).toBe(
      tableHeaders[0]
    );
  });

  it("should have a table headers in each row ", () => {
    expect(wrapper.find("#tickerValues0").props().children).toBe(
      tableData.tickerValues["chng"]
    );
  });
});
