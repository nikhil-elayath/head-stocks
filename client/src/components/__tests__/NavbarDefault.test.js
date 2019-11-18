import React from "react";
import { NavbarDefault } from "../NavbarDefault";
import { shallow, mount } from "enzyme";

const navbar = jest.fn();
const searchContent = jest.fn();
const navbarText = [
  {
    name1: "HEADSTOCKS",
    name2: "STOCKS",
    option1: "Login",
    option2: "Stocks",
    search1: "Search Results"
  }
];

const wrapper = shallow(
  <NavbarDefault
    navbar={navbar}
    searchContent={searchContent}
    navbarText={navbarText}
  />
);

describe("Testing Navbar Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a division with name navbarID", () => {
    expect(wrapper.find("#navbarID")).toBeTruthy();
  });
  it("should display the market cap", () => {
    expect(wrapper.find("#navbarLogoText1").text()).toBe("HEADSTOCKS");
  });
  it("should display the Sector", () => {
    expect(wrapper.find("#navbarLogoText2").text()).toBe("STOCKS");
  });
  it("should display the industry", () => {
    expect(wrapper.find("#navbarLoginText").text()).toBe("Login");
  });
  it("should display the employee", () => {
    expect(wrapper.find("#navbarStocksText").text()).toBe("Stocks");
  });

  it("should simulate button click on Login button tab ", () => {
    wrapper.find("#navbarLoginText").simulate("click");
    expect(wrapper.state().home).toBe(false);
    expect(wrapper.state().stocks).toBe(false);
    expect(wrapper.state().login).toBe(true);
  });
  it("should simulate button click on Stocks button tab ", () => {
    wrapper.find("#navbarStocksText").simulate("click");
    expect(wrapper.state().home).toBe(false);
    expect(wrapper.state().stocks).toBe(true);
    expect(wrapper.state().login).toBe(false);
  });
  it("should simulate button click on Home button tab ", () => {
    wrapper.find("#navbarLogoText1").simulate("click");
    expect(wrapper.state().home).toBe(true);
    expect(wrapper.state().stocks).toBe(false);
    expect(wrapper.state().login).toBe(false);
  });
  // it("should simulate button click on Cancel button click ", () => {
  //   wrapper.find("#navbarSearchCancelClick").simulate("click");
  //   expect(wrapper.state().searchInputChanged).toBe(true);
  // });
  it("checks for on Search function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#navbarSearchResultsSearchButton").simulate("click", e);
    expect(e.preventDefault).toBeCalled();
  });
  it("checks for Search button click ", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#navbarSearchResultsSearchButton").simulate("click", e);
  });
  it("should check for presense of onSearch function", () => {
    let onSearch = jest.spyOn(wrapper.instance(), "onSearch");
    expect(onSearch).toBeTruthy();
  });

  it("should check for presense of OnChange function", () => {
    let OnChange = jest.spyOn(wrapper.instance(), "OnChange");
    expect(OnChange).toBeTruthy();
  });
  it("should check for Search input ", () => {
    expect(
      wrapper
        .find("#navbarSearchInput")
        .at(0)
        .props().placeholder
    ).toBe("Search for ticker");
  });
});


