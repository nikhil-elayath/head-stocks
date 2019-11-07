import { SEARCH_CONTENT } from "../actions/Types";

const initialstate = {
    results: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case SEARCH_CONTENT:
      return { ...state, results: action.payload };
    default:
      return state;
  }
}
