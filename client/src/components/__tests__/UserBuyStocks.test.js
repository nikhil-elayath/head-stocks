import React from "react";
import { shallow, mount } from "enzyme";
import { UserBuyStocks } from "../UserBuyStocks";

const userBuyStocks = jest.fn();
const sellStocks = jest.fn();
const getAllStocks = jest.fn();
let total = 0;
const users = [
  {
    company: [
      {
        buy: true,
        buy_date: "2019-11-22T07:27:35.875Z",
        buying_quantity: "7",
        current_price: 201.55,
        sell: false,
        ticker_name: "AAPL"
      }
    ]
  }
];

const wrapper = shallow(
  <UserBuyStocks
    userBuyStocks={userBuyStocks}
    users={users}
    sellStocks={sellStocks}
    getAllStocks={getAllStocks}
  />
);

describe("Testing UserbuyStocks Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a tickername in each row ", () => {
    console.log(localStorage.getItem("token"));
    expect(wrapper.find("#tickerName0").props().children).toBe(
      users[0].company[0].ticker_name
    );
  });

  it("should have a tickerPrice in each row ", () => {
    expect(wrapper.find("#tickerPrice0").props().children).toBe(
      users[0].company[0].current_price
    );
  });

  it("should have a tickerOty in each row ", () => {
    expect(wrapper.find("#tickerQty0").props().children).toBe(
      users[0].company[0].buying_quantity
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
      .find("#sellingQuantity")
      .simulate("change", { target: { value: 0 } });
    expect(wrapper.state().total).toBe(0);
  });

  it("should simulate onClick on sell stock button ", () => {
    wrapper.find("#sellSpecificStock").simulate("click");
  });

  it("should get toekn from localstorage ", () => {
    expect(localStorage.getItem("token")).toBe(null);
  });
});
