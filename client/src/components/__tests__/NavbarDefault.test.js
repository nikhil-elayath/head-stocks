import React from "react";
import { shallow } from "enzyme";
import { NavbarDefault } from "../NavbarDefault";

const navbar = jest.fn();
const wrapper = shallow(<NavbarDefault navbar={navbar} />);

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
  it("should simulate button click on Login option ", () => {
    wrapper.find(".navbarLoginOptions").simulate("click");
    expect(wrapper.state().login).toBe(true);
    expect(wrapper.state().stocks).toBe(false);
    expect(wrapper.state().home).toBe(false);
  });
  it("should simulate button click on HOme Logo option ", () => {
    wrapper.find(".navbarHomeLogo").simulate("click");
    expect(wrapper.state().login).toBe(false);
    expect(wrapper.state().stocks).toBe(false);
    expect(wrapper.state().home).toBe(true);
  });
  it("should simulate button click on Stocks option ", () => {
    wrapper.find(".navbarStocksOptions").simulate("click");
    expect(wrapper.state().login).toBe(false);
    expect(wrapper.state().stocks).toBe(true);
    expect(wrapper.state().home).toBe(false);
  });
});
