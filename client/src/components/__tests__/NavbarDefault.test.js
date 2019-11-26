import React from "react";
import { NavbarDefault } from "../NavbarDefault";
import { shallow, mount } from "enzyme";

const navbar = jest.fn();
const searchContent = jest.fn();
const OnChange = jest.fn();
const onSearch = jest.fn();

const results = [
  { ticker_id: 1, ticker_name: "AAPL", industry: "Computer Hardware" }
];

const wrapper = shallow(
  <NavbarDefault
    navbar={navbar}
    results={results}
    searchContent={searchContent}
    OnChange={OnChange}
    onSearch={onSearch}
    searchInputChanged={true}
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
  it("should have a division with name navbarSearchBoxDiv", () => {
    expect(wrapper.find("#navbarSearchBoxDiv")).toBeTruthy();
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
  it("should display the employee", () => {
    expect(wrapper.find("#navbarVTText").text()).toBe("Virtual Trading");
  });

  it("should simulate button click on Login button tab ", () => {
    wrapper.find("#navbarLoginText").simulate("click");
    expect(wrapper.state().home).toBe(false);
    expect(wrapper.state().stocks).toBe(false);
    expect(wrapper.state().login).toBe(true);
    expect(wrapper.state().vtoption).toBe(false);
  });
  it("should simulate button click on Stocks button tab ", () => {
    wrapper.find("#navbarStocksText").simulate("click");
    expect(wrapper.state().home).toBe(false);
    expect(wrapper.state().stocks).toBe(true);
    expect(wrapper.state().login).toBe(false);
    expect(wrapper.state().vtoption).toBe(false);
  });
  it("should simulate button click on Home button tab ", () => {
    wrapper.find("#navbarLogoText1").simulate("click");
    expect(wrapper.state().home).toBe(true);
    expect(wrapper.state().stocks).toBe(false);
    expect(wrapper.state().login).toBe(false);
    expect(wrapper.state().vtoption).toBe(false);
  });
  it("should simulate button click on Virtual Trading button tab ", () => {
    wrapper.find("#navbarVTText").simulate("click");
    expect(wrapper.state().home).toBe(false);
    expect(wrapper.state().stocks).toBe(false);
    expect(wrapper.state().login).toBe(false);
    expect(wrapper.state().vtoption).toBe(true);
  });

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
  it("should check for presense of my hamburg function function", () => {
    let myhamburgfunction = jest.spyOn(wrapper.instance(), "myhamburgfunction");
    expect(myhamburgfunction).toBeTruthy();
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

  it("1 from onSearch should check for searchContent Action to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    expect(wrapper.state().search_term).toBe(undefined);
    wrapper.instance().onSearch(e);
    expect(searchContent).toBeCalledTimes(1);
  });

  it("2 from OnChange should check for searchContent Action to be called", () => {
    const event = {
      target: {
        name: "searchInput",
        value: "AAPL"
      }
    };
    expect(wrapper.state().search_term).toBe(undefined);
    wrapper.instance().OnChange(event);
    expect(searchContent).toBeCalledTimes(1);
  });

  it("should simulate button click on Cancel Button button tab ", () => {
    // const e = { preventDefault: () => {} };
    // jest.spyOn(e, "preventDefault");
    expect(wrapper.state().searchInputChanged).toEqual(true);
    wrapper.find("#navbarSearchCancelClick").simulate("click");
    expect(wrapper.state().searchInputChanged).toEqual(false);
  });

  // it("should have a search results in each row ", () => {
  //   expect(wrapper.find("#tickerName0").props().children).toBe(
  //     nav[0].result[0].ticker_name
  //   );
  // });

  it("should direct to the company page", () => {
    wrapper.setState({ searchInputChanged: true }); 
    wrapper.find("#linknavbar1").simulate("click");
    expect(wrapper.state().searchInputChanged).toEqual(false);
   });
});
