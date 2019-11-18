import React from "react";
import { shallow, mount } from "enzyme";
import CompanyDetailAnalysis from "../CompanyDetailAnalysis";

const companyDetailAnalysis = jest.fn();

const getCompanyDetailById = jest.fn();
const getGaugeCompany1 = jest.fn();

const getGaugeCompany2 = jest.fn();

const getAssetsCompany1 = jest.fn();
const getAssetsCompany2 = jest.fn();

const wrapper = shallow(
  <CompanyDetailAnalysis companyDetailAnalysis={companyDetailAnalysis} />
);

describe("Testing Footer Component", () => {
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
