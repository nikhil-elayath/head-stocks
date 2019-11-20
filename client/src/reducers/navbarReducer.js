import { SEARCH_CONTENT } from "../actions/Types";

// sets initial state as Empty array
const initialstate = {
  results: []
};

export default function(state = initialstate, action) {
  // Switches between actions
  switch (action.type) {
    // if search action called
    case SEARCH_CONTENT:
      // returns the new state along with both previous and new values from the action
      return { ...state, results: action.payload };
    // the default action
    default:
      return state;
  }
}
