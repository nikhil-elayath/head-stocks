import {
  COMPANY_DETAIL_BY_ID,
  BALANCE_SHEET,
  OHLC_CHART,
  GET_SIMILAR_TABLE,
} from "../actions/Types";

const initialState = {
  company: [],
  balance_sheet: [],
  ohlc_chart: [],
  similar_company: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_DETAIL_BY_ID:
      return {
        ...state,
        company: action.payload,
      };
    case GET_SIMILAR_TABLE:
      return {
        ...state,
        similar_company: action.payload,
      };
    case BALANCE_SHEET:
      return {
        ...state,
        balance_sheet: action.payload,
      };
    case OHLC_CHART:
      return { ...state, ohlc_chart: action.payload };
    default:
      return state;
  }
}
