import React from "react";
import { shallow, mount } from "enzyme";
import { Register } from "../Register";

const register = jest.fn();
const createUser = jest.fn();
const preventDefault = jest.fn();
const wrapper = shallow(
  <Register
    register={register}
    createUser={createUser}
    preventDefault={preventDefault}
  />
);

describe("Testing Register Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a container with name registerMainContainer", () => {
    expect(wrapper.find("#registerMainContainer")).toBeTruthy();
  });

  it("should check for links", () => {
    expect(wrapper.find("#loginButton").text()).toBe("Login");
  });

  it("should check if  Link component is present or not", () => {
    expect(wrapper.find("Link").exists()).toBeTruthy();
  });

  it("should have a container with name registerLeftContainer", () => {
    expect(wrapper.find("#registerLeftContainer")).toBeTruthy();
  });

  it("should have a container with name registerRightContainer", () => {
    expect(wrapper.find("#registerRightContainer")).toBeTruthy();
  });

  it("should have a form with name registerForm", () => {
    expect(wrapper.find("#registerForm")).toBeTruthy();
  });

  it("should simulate button click on Login button tab ", () => {
    wrapper.find("#registerButton-active").simulate("click");
    expect(wrapper.state().login).toBe(false);
    expect(wrapper.state().signup).toBe(true);
  });

  it("should check for Name input ", () => {
    expect(
      wrapper
        .find("#registerInput")
        .at(0)
        .props().placeholder
    ).toBe("Name");
  });

  it("should check for Email input ", () => {
    expect(
      wrapper
        .find("#registerInput")
        .at(1)
        .props().placeholder
    ).toBe("Email");
  });

  it("should check for Mobile No input ", () => {
    expect(
      wrapper
        .find("#registerInput")
        .at(2)
        .props().placeholder
    ).toBe("Mobile No");
  });

  it("should check for Password input ", () => {
    expect(
      wrapper
        .find("#registerInput")
        .at(3)
        .props().placeholder
    ).toBe("Password");
  });

  it("should check for Confirm Password input ", () => {
    expect(
      wrapper
        .find("#registerInput")
        .at(4)
        .props().placeholder
    ).toBe("Confirm Password");
  });

  it("should check for presense of register function", () => {
    let register = jest.spyOn(wrapper.instance(), "register");
    expect(register).toBeTruthy();
  });

  it("should check for presense of onChange function", () => {
    let onChange = jest.spyOn(wrapper.instance(), "onChange");
    expect(onChange).toBeTruthy();
  });

  it("shoudl check for input value", () => {
    const e = {
      target: {
        name: "name",
        value: "Bhavan"
      }
    };
    expect(wrapper.state().search_term).toBe(undefined);
    wrapper.instance().onChange(e);
    expect(createUser).toBeCalledTimes(0);
  });

  it("shoudl check for input value for email", () => {
    const e = {
      target: {
        name: "email",
        value: "testcase@gmail.com"
      }
    };
    expect(wrapper.state().search_term).toBe(undefined);
    wrapper.instance().onChange(e);
    expect(createUser).toBeCalledTimes(0);
  });

  it("there should be type in input fields,search and in select options", () => {
    expect(
      wrapper
        .find("#registerInput")
        .at(0)
        .prop("type")
    ).toBe("text");
    expect(
      wrapper
        .find("#registerInput")
        .at(1)
        .prop("type")
    ).toBe("text");
    expect(
      wrapper
        .find("#registerInput")
        .at(2)
        .prop("type")
    ).toBe("text");
    expect(
      wrapper
        .find("#registerInput")
        .at(3)
        .prop("type")
    ).toBe("password");
    expect(
      wrapper
        .find("#registerInput")
        .at(4)
        .prop("type")
    ).toBe("password");
  });

  it("checks for on edit button function to be called", () => {
    const e = { preventDefault: () => {} };
    jest.spyOn(e, "preventDefault");
    wrapper.find("#registerFormButton").simulate("click", e);
    expect(e.preventDefault).toBeCalled();
  });

  it("checks for Sign Up button click ", () => {
    wrapper.find("#registerFormButton").simulate("click");
  });

  it("testing for name input field", () => {
    const event = {
      target: {
        name: "name",
        value: "Bhavan"
      }
    };
    expect(wrapper.state().name).toBe(event.target.value);
  });
});
