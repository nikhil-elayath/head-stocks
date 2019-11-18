import LoadingReducer from "../LoadingReducer";
import { LOADING_START, LOADING_STOP } from "../../actions/Types";

describe("Testing LoadingReducer Reducer", () => {
  it("should return a state object with search results array equal to the payload in the action when the action type is LOADING_START (when the returned state is initial state)", () => {
    const action = {
      type: LOADING_START
    };
    const returnedState = LoadingReducer(undefined, action);
    expect(returnedState).toEqual({ isLoading: true });
  });

  it("should return a state object with search results array equal to the payload in the action when the action type is LOADING_STOP (when the returned state is initial state)", () => {
    const action = {
      type: LOADING_STOP
    };
    const returnedState = LoadingReducer(undefined, action);
    expect(returnedState).toEqual({ isLoading: false });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is SOME_TYPE (when the returned state is initial state)", () => {
    const action = {
      type: "SOME_TYPE"
    };
    const returnedState = LoadingReducer(undefined, action);
    expect(returnedState).toEqual({ isLoading: false });
  });
});
