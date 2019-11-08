import React from "react";
import { shallow, mount } from "enzyme";
import { NavbarDefault } from "../NavbarDefault";

const navbar = jest.fn();
const wrapper = shallow(<NavbarDefault navbar={navbar} />);

describe("Testing Navbar Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
