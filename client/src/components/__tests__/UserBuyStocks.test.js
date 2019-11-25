import React from "react";
import { shallow, mount } from "enzyme";
import { UserBuyStocks } from "../UserBuyStocks";

const userBuyStocks = jest.fn();
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
      },
      {
        buy: true,
        buy_date: "2019-11-22T10:22:26.502Z",
        buying_quantity: "6",
        current_price: 135.68,
        sell: false,
        ticker_name: "MSFT"
      }
    ]
  }
];

const wrapper = shallow(
  <UserBuyStocks userBuyStocks={userBuyStocks} users={users} />
);

describe("Testing UserbuyStocks Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a tickername in each row ", () => {
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
        value: 2
      }
    };
    expect(wrapper.state().total).toBe(undefined);
  });

  it("expect to change state", () => {
    const total = 1;
    const price = 231.55;
    const e = {
      target: {
        value: 2
      }
    };
    expect(
      wrapper.instance().setState(total.toBe(e.target.value * Number(price)))
    );
  });
});
