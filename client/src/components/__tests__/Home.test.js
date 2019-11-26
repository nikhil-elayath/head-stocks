import React from "react";
import { Home } from "../Home";
import { shallow, mount } from "enzyme";

const home = jest.fn();
const allNews = jest.fn();
const newsById = jest.fn();
const getIndices = jest.fn();
const news = [{ new_id: 1, headline: "Master Blaster Sachin baby" }];
const singleNews = [];
const indices = [];
const wrapper = mount(
  <Home
    home={home}
    news={news}
    singleNews={singleNews}
    allNews={allNews}
    newsById={newsById}
    getIndices={getIndices}
    indices={indices}
  />
);

describe("Testing home Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should mount the component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("checks for componenetDidMount  to be called", () => {
    const componentDidMount = jest.spyOn(Home.prototype, "componentDidMount");
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
  });

  it("should have a container with name homecontainer", () => {
    expect(wrapper.find("#homecontainer")).toBeTruthy();
  });

  it("should have a container with name homeleftsidecontainer", () => {
    expect(wrapper.find("#homeleftsidecontainer")).toBeTruthy();
  });

  it("should have a container with name homemiddlecontainer", () => {
    expect(wrapper.find("#homemiddlecontainer")).toBeTruthy();
  });

  it("should have a container with name homerightsidecontainer", () => {
    expect(wrapper.find("#homerightsidecontainer")).toBeTruthy();
  });

  it("should check for headline description in news section", () => {
    expect(wrapper.find(".recent-news-title0")).toBeTruthy();
  });
});
