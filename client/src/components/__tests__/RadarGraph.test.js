import React from "react";
import { shallow, mount } from "enzyme";
import { RadarGraph } from "../Common/RadarGraph";

const radarGraph = jest.fn();

const wrapper = shallow(<RadarGraph radarGraph={radarGraph} />);

describe("Testing radar graph Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
