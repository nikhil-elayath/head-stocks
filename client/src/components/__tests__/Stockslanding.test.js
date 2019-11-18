import React from "react";
import { StocksLanding } from "../StocksLanding";
import {
  getCompany,
  getSectors,
  getIndustries,
  getGainersLosers
} from "../../actions/Stocks";
import { shallow, mount } from "enzyme";

var stocks = [],
  gainersLosers = [],
  sectors = [],
  industries = [];

const wrapper = shallow(
  <StocksLanding
    stocks={stocks}
    gainersLosers={gainersLosers}
    sectors={sectors}
    industries={industries}
    getCompany={getCompany}
    getSectors={getSectors}
    getIndustries={getIndustries}
    getGainersLosers={getGainersLosers}
  />
);

describe("Testing stocks Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
