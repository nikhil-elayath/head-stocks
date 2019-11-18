import React from "react";
import { shallow, mount } from "enzyme";
import { IndicesProfile } from "../IndicesProfile";
const indicesProfile = jest.fn();
const singleIndex = [];
let match = { params: { id: 1 }, isExact: true, path: "", url: "" };
const getIndicesById = jest.fn();
const getOhlcChartIndex = jest.fn();
const ohlcdata = [
  {
    date: "29-Nov-2019",
    open: 2546.0,
    high: 2546.0,
    low: 2546.0,
    close: 2546.0,
    adjclose: 2546.0,
    volume: 2546.0
  },
  {
    date: "29-Nov-2019",
    open: 2546.0,
    high: 2546.0,
    low: 2546.0,
    close: 2546.0,
    adjclose: 2546.0,
    volume: 2546.0
  }
];

const wrapper = shallow(
  <IndicesProfile
    indicesProfile={indicesProfile}
    singleIndex={singleIndex}
    match={match}
    getIndicesById={getIndicesById}
    getOhlcChartIndex={getOhlcChartIndex}
    ohlcdata={ohlcdata}
  />
);

describe("Testing IndicesProfile Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should check for presense of weekClick function", () => {
    let weekClick = jest.spyOn(wrapper.instance(), "weekClick");
    expect(weekClick).toBeTruthy();
  });

  it("should check for presense of monthClick function", () => {
    let monthClick = jest.spyOn(wrapper.instance(), "monthClick");
    expect(monthClick).toBeTruthy();
  });

  it("should have a container with name historicTable", () => {
    expect(wrapper.find("#historicTable")).toBeTruthy();
  });

  it("should have a date in matches ", () => {
    expect(wrapper.find("#date0").props().children).toBe(singleIndex.date);
  });
});
