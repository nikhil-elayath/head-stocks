import {
  GET_COMPANY_BY_SECTOR,
  GET_ALL_COMPANY,
  GAINERS_LOSERS,
  GET_ALL_SECTORS,
  GET_ALL_INDUSTRIES,
  SCREENER_SEARCH,
} from "../actions/Types";

const initialstate = {
  stocks: [],
  gainersLosers: [],
  sectors: [],
  industries: [],
  screener_search: [],
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case GET_COMPANY_BY_SECTOR:
      return { ...state, stocks: action.payload };
    case GET_ALL_COMPANY:
      return { ...state, stocks: action.payload };
    case GAINERS_LOSERS:
      return { ...state, gainersLosers: action.payload };
    case GET_ALL_SECTORS:
      return { ...state, sectors: action.payload };
    case SCREENER_SEARCH:
      return { ...state, screener_search: action.payload };
    case GET_ALL_INDUSTRIES:
      return { ...state, industries: action.payload };
    default:
      return state;
  }
}
