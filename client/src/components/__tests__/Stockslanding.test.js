import React from "react";
import { StocksLanding } from "../StocksLanding";
import {
  getCompany,
  getSectors,
  getIndustries,
  getGainersLosers
} from "../../actions/Stocks";
import { shallow } from "enzyme";

const stocks = [
    {
      ticker_id: 169,
      ticker_name: "ANTM",
      ticker_logo: "image",
      MarketCap: 21223.9902,
      "Share Price": 51.35
    }
  ],
  gainersLosers = [
    {
      isIndex: false,
      gainers: [
        {
          tickerValues: {
            change_percent: "+30.37",
            "Market Cap": "68.00M",
            "Share Price": "4.38"
          },
          ticker_name: "HPJ",
          ticker_id: 1030
        }
      ],
      losers: [
        {
          tickerValues: {
            change_percent: "-33.33",
            "Market Cap": "13.00M",
            "Share Price": "0.03"
          },
          ticker_name: "TGLO",
          ticker_id: 2007
        }
      ]
    }
  ],
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

describe("Testing Stocks Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("Table should have button with text Gainers", () => {
    expect(wrapper.find("#button_stocks_gainers").text()).toBe("Gainers");
  });
  it("Table should have button with text Losers", () => {
    expect(wrapper.find("#button_stocks_losers").text()).toBe("Losers");
  });
  it("should simulate button click on Gainers tab ", () => {
    wrapper.find("#button_stocks_gainers").simulate("click");
    expect(wrapper.state().gainersClick).toBe(true);
  });
  it("should simulate button click on Gainers tab ", () => {
    wrapper.find("#button_stocks_losers").simulate("click");
    expect(wrapper.state().gainersClick).toBe(false);
  });
  // it("should simulate change on selector dropdown ", () => {
  //   wrapper.find("#stocks_dropdown_sectors").simulate("change");
  // });
  it("should simulate click on stocks card ", () => {
    wrapper.find("stocks_grid_details").simulate("click");
  });
  it("Closed price should be shown in each stocks card", () => {
    expect(wrapper.find("#stocks_ticker").text()).toBe("ANTM");
  });
  it("should check for presense of OnSelectSector function", () => {
    let OnSelectSector = jest.spyOn(wrapper.instance(), "OnSelectSector");
    expect(OnSelectSector).toBeTruthy();
  });
  it("should check for presense of OnSelectSector function", () => {
    let OnSelectSector = jest.spyOn(wrapper.instance(), "OnSelectSector");
    expect(OnSelectSector).toBeTruthy();
  });
  it("should check for presense of OnSelectIndustry function", () => {
    let OnSelectIndustry = jest.spyOn(wrapper.instance(), "OnSelectIndustry");
    expect(OnSelectIndustry).toBeTruthy();
  });
  it("should check for presense of displayCompanies function", () => {
    let displayCompanies = jest.spyOn(wrapper.instance(), "displayCompanies");
    expect(displayCompanies).toBeTruthy();
  });
  it("should check for presense of loadMoreItems function", () => {
    let loadMoreItems = jest.spyOn(wrapper.instance(), "loadMoreItems");
    expect(loadMoreItems).toBeTruthy();
  });
});
