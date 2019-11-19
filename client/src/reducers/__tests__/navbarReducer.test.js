import navbarReducer from "../navbarReducer";
import { SEARCH_CONTENT } from "../../actions/Types";

describe("Testing Navbar Reducer", () => {
  // Test for search results array storing the results of search
  it("should return a state object with search results array equal to the payload in the action when the action type is SEARCHCONTENT (when the returned state is initial state)", () => {
    const action = {
      type: SEARCH_CONTENT
    };
    const returnedState = navbarReducer(undefined, action);
    expect(returnedState).toEqual({ results: action.payload });
  });

  // Test for the empty array of search results if some other action called
  it("should return the initial state object when the action type is not mentioned or doesn't concern the reducer (when the returned state is initial state", () => {
    let action = {
      results: []
    };
    let returnedState = navbarReducer(undefined, action);
    expect(returnedState).toEqual({
      results: []
    });
    action = {
      type: "SOME_TYPE",
      payload: []
    };
  });
});
