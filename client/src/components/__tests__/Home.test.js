import React from "react";
import { Home } from "../Home";
import { shallow, mount } from "enzyme";

const home = jest.fn();
const allNews = jest.fn();
const newsById = jest.fn();
const news = [
  { new_id: 1, headline: "Master Blaster Sachin baby" },
  { new_id: 2, headline: "BCCI President elections coming up" }
];
const singleNews = [];
const wrapper = mount(
  <Home
    home={home}
    news={news}
    singleNews={singleNews}
    allNews={allNews}
    newsById={newsById}
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
    expect(wrapper.find("#recent-news-title0").text()).toBe(news[0].headline);
  });
});
