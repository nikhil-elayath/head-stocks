import React from "react";
import { UpdateCompany } from "../UpdateCompany";
import { shallow } from "enzyme";

const updateCompanyData = jest.fn();
const updateCompany = jest.fn();

const wrapper = shallow(
  <UpdateCompany
    updateCompanyData={updateCompanyData}
    updateCompany={updateCompany}
  />
);

describe("Testing Navbar Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a division with name updateCompanyMainDiv", () => {
    expect(wrapper.find("#updateCompanyMainDiv")).toBeTruthy();
  });
  it("should have a division with name updateCompany_tooltip_div", () => {
    expect(wrapper.find("#updateCompany_tooltip_div")).toBeTruthy();
  });
  it("should display the Select a File", () => {
    expect(wrapper.find("#updateCompanyMainDivText1").text()).toBe(
      "Select a File"
    );
  });

  it("should have null in state at the start", () => {
    wrapper.find(".updateCompany_admin_input");
    expect(wrapper.state().selectedFile).toBe(null);
  });

  it("checks for on upload function to be called", () => {
    const e = { preventDefault: () => {} };
    wrapper.find(".updateCompany_admin_button").simulate("click", e);
  });
  it("checks for select file tab click ", () => {
    const e = { preventDefault: () => {} };
    wrapper.find(".updateCompany_admin_input").simulate("click", e);
  });
  it("should check for presense of onClickHandler function function", () => {
    let onClickHandler = jest.spyOn(wrapper.instance(), "onClickHandler");
    expect(onClickHandler).toBeTruthy();
  });

  it("should check for presense of onChangeHandler function", () => {
    let onChangeHandler = jest.spyOn(wrapper.instance(), "onChangeHandler");
    expect(onChangeHandler).toBeTruthy();
  });
});
