import IndicesReducer from "../IndicesReducer";
import {
  GET_INDICES_BYID,
  OHLC_CHART_INDEX,
  OHLC_INDICES_DATA
} from "../../actions/Types";

describe("Testing IndicesProfile Reducer", () => {
  it("GET_INDICES_BY_ID should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_COMPANY (when the returned state is initial state", () => {
    const action = {
      type: GET_INDICES_BYID,
      singleIndex: [],
      ohlcChart: [],
      ohlcdata: []
    };
    const returnedState = IndicesReducer(undefined, action);
    expect(returnedState).toEqual({
      singleIndex: action.payload,
      ohlcChart: [],
      ohlcdata: []
    });
  });

  it("GET_OHLC_CHART should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_COMPANY (when the returned state is initial state", () => {
    const action = {
      type: OHLC_CHART_INDEX,
      singleIndex: [],
      ohlcChart: [],
      ohlcdata: []
    };
    const returnedState = IndicesReducer(undefined, action);
    expect(returnedState).toEqual({
      singleIndex: [],
      ohlcChart: action.payload,
      ohlcdata: []
    });
  });

  it("GET_INDICES_DAT should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_COMPANY (when the returned state is initial state", () => {
    const action = {
      type: OHLC_INDICES_DATA,
      singleIndex: [],
      ohlcChart: [],
      ohlcdata: []
    };
    const returnedState = IndicesReducer(undefined, action);
    expect(returnedState).toEqual({
      singleIndex: [],
      ohlcChart: [],
      ohlcdata: action.payload
    });
  });

  it("should return the initial state object when the action type is not mentioned or doesn't concern the reducer (when the returned state is initial state", () => {
    let action = {
      singleIndex: [],
      ohlcChart: [],
      ohlcdata: []
    };
    let returnedState = IndicesReducer(undefined, action);
    expect(returnedState).toEqual({
      singleIndex: [],
      ohlcChart: [],
      ohlcdata: []
    });
    action = {
      type: "SOME_TYPE",
      payload: []
    };
  });
});
