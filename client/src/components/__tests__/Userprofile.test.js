import React from "react";
import { shallow, mount } from "enzyme";
import { UserProfile } from "../UserProfile";

const userProfile = jest.fn();
const searchContent = jest.fn();
const buyStocks = jest.fn();
const results = [
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
    buyStocks={buyStocks}
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
      results[0].ticker_name
    );
  });

  it("shoudl check for input value", () => {
    const e = {
      target: {
        name: "total",
        value: 0
      }
    };
    expect(wrapper.state().total).toBe(e.target.value);
  });

  it("should simulate on Chnage on input change ", () => {
    wrapper
      .find("#buyingQuantity")
      .simulate("change", { target: { value: 0 } });
    expect(wrapper.state().total).toBe(0);
  });

  it("should simulate onClick on sell stock button ", () => {
    wrapper.find("#buySpecificStock").simulate("click");
  });

  it("should simulate onClick on Search button ", () => {
    wrapper.find("#userProfileSearchButton").simulate("click");
  });

  it("checks for on edit button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#userProfileSearchButton").simulate("click", e);
    expect(e.preventDefault).toBeCalledTimes(0);
  });

  it("should get toekn from localstorage ", () => {
    expect(localStorage.getItem("token")).toBe(null);
  });
});
