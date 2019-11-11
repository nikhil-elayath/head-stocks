import React from "react";
import { StocksLanding } from "../StocksLanding";
import { getCompany } from "../../actions/Stocks";
import { shallow, mount } from "enzyme";

const stocks = jest.fn();

const wrapper = shallow(
  <StocksLanding stocks={stocks} getCompany={getCompany} />
);

describe("Testing stocks Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
