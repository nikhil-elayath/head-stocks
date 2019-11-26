/* useer history component test case -piyush*/
import React from "react";
import { shallow, mount } from "enzyme";
import { UserHistory } from "../UserHistory";

const userHistory = jest.fn();
const userhistory = [
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
  <UserHistory userhistory={userhistory} userHistory={userHistory} />
);

describe("Testing User History Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a tickername in each row ", () => {
    expect(wrapper.find("#tickerName0").props().children).toBe(
      userhistory[0].company[0].ticker_name
    );
  });

  it("should have a tickerPrice in each row ", () => {
    expect(wrapper.find("#tickerPrice0").props().children).toBe(
      userhistory[0].company[0].current_price
    );
  });

  it("should have a tickerOty in each row ", () => {
    expect(wrapper.find("#tickerQty0").props().children).toBe(
      userhistory[0].company[0].buying_quantity
    );
  });

  it("should have a tickerDate in each row ", () => {
    expect(wrapper.find("#tickerDate0").props().children).toBe(
      new Date(userhistory[0].company[0].buy_date).toLocaleDateString("en-In", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      })
    );
  });
});
