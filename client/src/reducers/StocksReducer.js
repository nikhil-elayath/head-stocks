import { GET_ALL_COMPANY, GAINERS_LOSERS } from "../actions/Types";

const initialstate = {
  stocks: [],
  gainersLosers: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case GET_ALL_COMPANY:
      return { ...state, stocks: action.payload };
    case GAINERS_LOSERS:
      return { ...state, gainersLosers: action.payload };
    default:
      return state;
  }
}
