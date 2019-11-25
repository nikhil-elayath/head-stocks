import React from "react";
import { shallow, mount } from "enzyme";
import { UserProfile } from "../UserProfile";

const userProfile = jest.fn();
const searchContent = jest.fn();
const results = [
  {
    industry: "Retail - Apparel & Specialty",
    price: 156.59,
    ticker_id: 8,
    ticker_name: "AAP"
  },
  {
    industry: "Retail - Apparel & Specialty",
    price: 156.59,
    ticker_id: 8,
    ticker_name: "AAP"
  }
];
const wrapper = shallow(
  <UserProfile
    userProfile={userProfile}
    searchContent={searchContent}
    results={results}
  />
);

describe("Testing User Profile Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("shoudl check for input value", () => {
    const e = {
      target: {
        name: "searchInput",
        value: "aapl"
      }
    };
    expect(wrapper.state().searchInput).toBe("");
    wrapper.instance().OnChange(e);
    expect(wrapper.state().results).toBe(undefined);
    expect(searchContent).toBeCalledTimes(1);
  });

  it("checks for on Buy Stocks to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#buySpecificStock").simulate("click", e);
  });

  it("should map tickers from search result", () => {
    expect(wrapper.find("#tickerName0").props().children).toBe(
      results.ticker_name
    );
  });
});
