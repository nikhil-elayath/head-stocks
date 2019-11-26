import React from "react";
import { shallow, mount } from "enzyme";
import { UserNavigation } from "../Common/UserNavigation";

const userNavigation = jest.fn();

const wrapper = shallow(
  <UserNavigation userNavigation={userNavigation} name={name} />
);

describe("Testing User  Secondary navbar Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("checks for on Buy Srtocks to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#buyStocks-active").simulate("click", e);
  });

  it("checks for on Buy Srtocks to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#buyStocks-active").simulate("click", e);
  });

  it("checks for on My Srtocks to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#myStocks").simulate("click", e);
  });

  it("checks for on History Srtocks to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#historyStocks").simulate("click", e);
  });
});
