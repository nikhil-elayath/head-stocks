import React from "react";
import { shallow, mount } from "enzyme";
import { ResetPassword } from "../ResetPassword";

const resetPassword = jest.fn();
const verifyOtp = jest.fn();

const wrapper = shallow(
  <ResetPassword resetPassword={resetPassword} verifyOtp={verifyOtp} />
);

describe("Testing ResetPassword Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a container with name resetPasswordMainContainer", () => {
    expect(wrapper.find("#resetPasswordMainContainer")).toBeTruthy();
  });

  it("checks for on resetPassword button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#resetPasswordButton").simulate("click", e);
    expect(e.preventDefault).toBeCalled();
  });

  it("checks for Sign Up button click ", () => {
    wrapper.find("#resetPasswordButton").simulate("click");
  });
});
