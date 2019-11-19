import React from "react";
import { Home } from "../Home";
import { shallow, mount } from "enzyme";

const home = jest.fn();
const allNews = jest.fn();
const newsById = jest.fn();
const getIndices = jest.fn();
const news = [
  { new_id: 1, headline: "Master Blaster Sachin baby" },
  { new_id: 2, headline: "BCCI President elections coming up" }
];
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

  it("should check for headline description in news section", () => {
    expect(wrapper.find("#recent-news-title").text()).toBe(news[0].headline);
  });

  it("should simulate  News Click", () => {
    expect(
      wrapper
        .find("#recent-news-title")
        .at(0)
        .simulate("click")
    );
  });
  it("checks for componenetDidMount  to be called", () => {
    const componentDidMount = jest.spyOn(Home.prototype, "componentDidMount");
    wrapper.instance().componentDidMount();
    expect(componentDidMount).toHaveBeenCalled();
  });
});
