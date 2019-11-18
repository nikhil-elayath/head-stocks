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
    MarketCap: "21223.9902",
    "Share Price": "51.35"
  }
];
const gainersLosers = [
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
];
const sectors = ["Technology", "Healthcare"];
const industries = ["Compauter H/w", "online Media"];

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

  it("should check for component did mount as a function", () => {
    const componentDidMount = jest.spyOn(
      StocksLanding.prototype,
      "componentDidMount"
    );
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
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
  it("should simulate change on selector dropdown ", () => {
    wrapper.find("#stocks_dropdown_sectors").simulate("change");
  });
  it("should simulate click on stocks card ", () => {
    wrapper.find("#stocks_grid_details0").simulate("click");
  });
  it("Company logo should be shown in each stocks card", () => {
    expect(wrapper.find("#stocks_img").text()).toBe("image");
  });
  it("Ticker Name should be shown in each stocks card", () => {
    expect(wrapper.find("#stocks_ticker").props().children).toBe("ANTM");
  });
  it("Closed price should be shown in each stocks card", () => {
    expect(wrapper.find("#stocks_closed_price").text()).toBe("51.35");
  });
  it("Market cap should be shown in each stocks card", () => {
    expect(wrapper.find("stocks_market_cap").text).toBe("21223.9902");
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

  it("Ticker Name should be shown in each stocks card", () => {
    expect(wrapper.find("#industry0").props().children).toBe(industries[0]);
  });

  it("Ticker Name should be shown in each stocks card", () => {
    expect(wrapper.find("#sectors0").props().children).toBe(sectors[0]);
  });

  it("should have ticker_name click on stocks card ", () => {
    expect(wrapper.find("#stocks_ticker").props().children).toBe(sectors[0]);
  });
});
