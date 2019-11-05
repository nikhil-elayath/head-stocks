import { ALL_NEWS, NEWS_BY_ID } from "../actions/Types";

const initialstate = {
  news: [],
  singleNews: [{}]
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case ALL_NEWS:
      return { ...state, news: action.payload };
    case NEWS_BY_ID:
      return { ...state, singleNews: action.payload };
    default:
      return state;
  }
}
