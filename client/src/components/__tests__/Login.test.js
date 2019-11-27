import React from "react";
import { shallow, mount } from "enzyme";
import { Login } from "../Login";
const login = jest.fn();

const wrapper = shallow(<Login login={login} />);

describe("Testing Login Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a container with name loginMainContainer", () => {
    expect(wrapper.find("#loginMainContainer")).toBeTruthy();
  });

  it("should have a container with name loginLeftContainer", () => {
    expect(wrapper.find("#loginLeftContainer")).toBeTruthy();
  });

  it("should have a container with name loginRightContainer", () => {
    expect(wrapper.find("#loginRightContainer")).toBeTruthy();
  });

  it("should simulate button click on Login button tab ", () => {
    wrapper.find("#loginComponentButton-active").simulate("click");
    expect(wrapper.state().login).toBe(false);
    expect(wrapper.state().signup).toBe(true);
  });

  it("checks for on edit button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#loginFormButton").simulate("click", e);
    expect(e.preventDefault).toBeCalled();
  });

  it("should check for presense of onLogin function", () => {
    let onLogin = jest.spyOn(wrapper.instance(), "onLogin");
    expect(onLogin).toBeTruthy();
  });

  it("should check for presense of OnChange function", () => {
    let OnChange = jest.spyOn(wrapper.instance(), "OnChange");
    expect(OnChange).toBeTruthy();
  });
});
