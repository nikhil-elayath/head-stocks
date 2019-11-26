/*kafka component test case */
import React from "react";
import { shallow, mount } from "enzyme";
import Kafka from "../Kafka";

const data = [{ tickerName: "DJI" }];

const wrapper = shallow(<Kafka />);

describe("test for the text, input, css properties and icons on the navbar and snapshot testing", () => {
  it("renders the component for snapshot testing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("checks for the mapping condition", () => {
    wrapper.setState({ data: data });
    // Testing the Div with a particular ID and expecting its Text to be the Declared One[ piysuh]
    expect(wrapper.find("#kafka_indices").text()).toBe("DJI");
  });

  it("checks for onError setState", () => {
    const onError = jest.spyOn(wrapper.instance(), "onError");
    const e = {
      target: {
        error: "Not Found!"
      }
    };
    wrapper.instance().onError(e);
  });

  it("checks for the onConnected setState", () => {
    const onConnected = jest.spyOn(wrapper.instance(), "onConnected");
    const d = {
      target: {
        data: []
      }
    };
    wrapper.instance().onConnected(d);
  });
  //json parse error
  // it("checks for the onMessageRecieved setState", () => {
  //   const onMessageReceived = jest.spyOn(
  //     wrapper.instance(),
  //     "onMessageReceived"
  //   );
  //   let msg = { body: "value" };
  //   // const c = {
  //   //   target: {
  //   //     data: body
  //   //   }
  //   // };
  //   wrapper.instance().onMessageReceived(msg);
  // });
});
