import React from "react";
import { shallow, mount } from "enzyme";
import  Navbar  from "../NavbarDefault";

const navbar = jest.fn();
const wrapper = shallow(
  <Navbar/>
);


describe("Testing Navbar Component", () => {
    
    it("should mount the component", () => {
      expect(wrapper).toMatchSnapshot();
    });
})