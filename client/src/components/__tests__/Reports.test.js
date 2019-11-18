import React from "react";
import Reports from "../Reports";
import { shallow, mount } from "enzyme";

const reports = jest.fn();
const headers = [
    "date","test2","test3","Total Assets","Total Liabilities"
  ];
const reportdata = [{
    date:"123",
    test2:"123",
    test3:null,
    'Total Assets':"123",
    "Total Liabilities":null,

  }];

const wrapper = shallow(<Reports reports={reports} headers={headers} reportdata={reportdata} />);

describe("Testing Navbar Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
