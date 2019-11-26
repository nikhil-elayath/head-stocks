import React from "react";
import { shallow, mount } from "enzyme";
import { IndicesProfile } from "../IndicesProfile";
const indicesProfile = jest.fn();
const singleIndex = [];
let match = { params: { id: 1 }, isExact: true, path: "", url: "" };
const getIndicesById = jest.fn();
const getOhlcChartIndex = jest.fn();
const getOhlcIndicesById = jest.fn();
const data = [
  [
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
  ]
];
console.log(data[0][0].date);
const wrapper = mount(
  <IndicesProfile
    indicesProfile={indicesProfile}
    singleIndex={singleIndex}
    match={match}
    getIndicesById={getIndicesById}
    getOhlcChartIndex={getOhlcChartIndex}
    getOhlcIndicesById={getOhlcIndicesById}
    data={data}
  />
);

describe("Testing IndicesProfile Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should check for component did mount as a function", () => {
    const componentDidMount = jest.spyOn(
      IndicesProfile.prototype,
      "componentDidMount"
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
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

  it("should have a container with name losersGainersContainer", () => {
    expect(wrapper.find("#losersGainersContainer")).toBeTruthy();
  });

  it("should have a date in each row ", () => {
    expect(wrapper.find("#ohlcdate0").props().children).toBe(data[0][0].date);
  });

  it("should have a container with name downloadButton", () => {
    wrapper.find("#downloadButton").simulate("click");
  });
});
