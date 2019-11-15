import StocksReducer from "../StocksReducer";
import {
  GET_ALL_COMPANY,
  GET_ALL_SECTORS,
  GET_ALL_INDUSTRIES,
  GAINERS_LOSERS
} from "../../actions/Types";

describe("Testing Stocks Reducer", () => {
  it("GET_ALL_COMPANY should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_COMPANY (when the returned state is initial state", () => {
    const action = {
      type: GET_ALL_COMPANY,
      payload: [],
      stocks: [],
      gainersLosers: [],
      sectors: [],
      industries: []
    };
    const returnedState = StocksReducer(undefined, action);
    expect(returnedState).toEqual({
      stocks: action.payload,
      gainersLosers: action.payload,
      sectors: action.payload,
      industries: action.payload
    });
  });
  it("GET_ALL_COMPANY should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_COMPANY (when the returned state is not an initial state", () => {
    const initialState = {
      stocks: [1, 2, 3, 4, 5]
    };
    const action = {
      type: GET_ALL_COMPANY,
      payload: [{}, {}, {}]
    };
    const returnedState = StocksReducer(initialState, action);
    expect(returnedState).toEqual({ stocks: action.payload });
  });

  it("GET_ALL_SECTORS should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_SECTORS (when the returned state is initial state", () => {
    const action = {
      type: GET_ALL_SECTORS,
      payload: [],
      stocks: [],
      gainersLosers: [],
      sectors: [],
      industries: []
    };
    const returnedState = StocksReducer(undefined, action);
    expect(returnedState).toEqual({
      stocks: action.payload,
      gainersLosers: action.payload,
      sectors: action.payload,
      industries: action.payload
    });
  });
  it("GET_ALL_SECTORS should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_SECTORS (when the returned state is not an initial state", () => {
    const initialState = {
      sectors: [1, 2, 3, 4, 5]
    };
    const action = {
      type: GET_ALL_SECTORS,
      payload: [{}, {}, {}]
    };
    const returnedState = StocksReducer(initialState, action);
    expect(returnedState).toEqual({ sectors: action.payload });
  });

  it("GET_ALL_INDUSTRIES should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_INDUSTRIES (when the returned state is initial state", () => {
    const action = {
      type: GET_ALL_INDUSTRIES,
      payload: [],
      stocks: [],
      gainersLosers: [],
      sectors: [],
      industries: []
    };
    const returnedState = StocksReducer(undefined, action);
    expect(returnedState).toEqual({
      stocks: action.payload,
      gainersLosers: action.payload,
      sectors: action.payload,
      industries: action.payload
    });
  });
  it("GET_ALL_INDUSTRIES should return a state object with teams array equal to the payload in the action when the action type is GET_ALL_INDUSTRIES (when the returned state is not an initial state", () => {
    const initialState = {
      industries: [1, 2, 3, 4, 5]
    };
    const action = {
      type: GET_ALL_INDUSTRIES,
      payload: [{}, {}, {}]
    };
    const returnedState = StocksReducer(initialState, action);
    expect(returnedState).toEqual({ industries: action.payload });
  });
  it("GAINERS_LOSERS should return a state object with teams array equal to the payload in the action when the action type is GAINERS_LOSERS (when the returned state is initial state", () => {
    const action = {
      type: GAINERS_LOSERS,
      payload: [],
      stocks: [],
      gainersLosers: [],
      sectors: [],
      industries: []
    };
    const returnedState = StocksReducer(undefined, action);
    expect(returnedState).toEqual({
      stocks: action.payload,
      gainersLosers: action.payload,
      sectors: action.payload,
      industries: action.payload
    });
  });
  it("GAINERS_LOSERS should return a state object with teams array equal to the payload in the action when the action type is GAINERS_LOSERS (when the returned state is not an initial state", () => {
    const initialState = {
      gainersLosers: [1, 2, 3, 4, 5]
    };
    const action = {
      type: GAINERS_LOSERS,
      payload: [{}, {}, {}]
    };
    const returnedState = StocksReducer(initialState, action);
    expect(returnedState).toEqual({ gainersLosers: action.payload });
  });

  it("should return the initial state object when the action type is not mentioned or doesn't concern the reducer (when the returned state is initial state", () => {
    let action = {
      payload: [],
      stocks: [],
      gainersLosers: [],
      sectors: [],
      industries: []
    };
    let returnedState = StocksReducer(undefined, action);
    expect(returnedState).toEqual({
      stocks: [],
      gainersLosers: [],
      sectors: [],
      industries: []
    });
    action = {
      type: "SOME_TYPE",
      payload: []
    };
    returnedState = StocksReducer(undefined, action);
    expect(returnedState).toEqual({
      stocks: [],
      gainersLosers: [],
      sectors: [],
      industries: []
    });
  });
});
