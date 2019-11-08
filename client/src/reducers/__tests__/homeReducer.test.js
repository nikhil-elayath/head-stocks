import { NEWS_BY_ID, ALL_NEWS } from "../../actions/Types";
import homeReducer from "../homeReducer";

describe("Testing Home reducer", () => {
  //get news by id - piyush
  it("should return  state object with news Details array equal to the payload in the action when the action type is NEWS_BY_ID(when the state is initial state)", () => {
    const action = {
      type: NEWS_BY_ID,
      payload: []
    };
    const returnedState = homeReducer(undefined, action);
    expect(returnedState).toEqual({
      news: action.payload,
      indices: [],
      singleNews: []
    });
  });

  // for get news -piyush
  it("should return a state object with user array equal to the payload in the action when the action type is GET_USER (when the returned state is initial state)", () => {
    const action = {
      type: ALL_NEWS,
      payload: [{}, {}, {}]
    };
    const returnedState = homeReducer(undefined, action);
    expect(returnedState).toEqual({
      news: action.payload,
      singleNews: [{}],
      indices: []
    });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is GET_USER (when the returned state is not an initial state)", () => {
    const initialState = {
      news: [1, 2, 3, 4, 5]
    };
    const action = {
      type: ALL_NEWS,
      payload: [{}, {}, {}]
    };
    const returnedState = homeReducer(initialState, action);
    expect(returnedState).toEqual({ news: action.payload });
  });

  it("should return the initial state object when the action type is not mentioned or doesn't concern the reducer (when the returned state is initial state)", () => {
    let action = {
      payload: [{}, {}, {}]
    };
    action = {
      type: "SOME_TYPE",
      payload: [{}, {}, {}]
    };
    let returnedState = homeReducer(undefined, action);
    expect(returnedState).toEqual({ news: [], singleNews: [{}], indices: [] });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is GET_USERS (when the returned state is not an initial state)", () => {
    const initialState = {
      news: [1, 2, 3, 4, 5]
    };
    let action = {
      payload: [{}, {}, {}]
    };
    let returnedState = homeReducer(initialState, action);
    expect(returnedState).toEqual({ news: initialState.news });
    action = {
      type: "SOME_TYPE",
      payload: [{}, {}, {}]
    };
    returnedState = homeReducer(initialState, action);
    expect(returnedState).toEqual({ news: initialState.news });
  });
});
