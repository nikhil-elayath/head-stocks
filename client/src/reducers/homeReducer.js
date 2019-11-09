import { ALL_NEWS, NEWS_BY_ID, GET_ALL_INDICES } from "../actions/Types";

const initialstate = {
  news: [],
  singleNews: [{}],
  indices: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case ALL_NEWS:
      return { ...state, news: action.payload };
    case NEWS_BY_ID:
      return { ...state, singleNews: action.payload };
    case GET_ALL_INDICES:
      return { ...state, indices: action.payload };
    default:
      return state;
  }
}
