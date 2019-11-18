import navbarReducer from "../navbarReducer";
import {
  SEARCH_CONTENT
} from "../../actions/Types";

describe("Testing Navbar Reducer", () => {
    it("should return a state object with search results array equal to the payload in the action when the action type is SEARCHCONTENT (when the returned state is initial state)", () => {
      const action = {
        type: SEARCH_CONTENT,
        payload: [{}, {}, {}]

      };
      
      const returnedState = navbarReducer(undefined, action);
      expect(returnedState).toEqual({ results: action.payload });
    });

    it("should return default state object with no search results array when the action type is Not defined (when the returned state is initial state)", () => {
      let action =  {
        type: "SOME_TYPE",
       };
      let returnedState = navbarReducer(undefined, action);
      expect(returnedState).toEqual({ results: []});
    });
} 
);