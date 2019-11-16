import {
  COMPANY_DETAIL_BY_ID,
  BALANCE_SHEET,
  OHLC_CHART,
  GET_SIMILAR_TABLE,
  COMPANY_DATES_BY_ID,
  GET_DROP_DOWN,
  GET_GAUGE_COMPANY1
} from "../actions/Types";

const initialState = {
  company: [],
  balance_sheet: [],
  ohlc_chart: [],
  similar_company: [],
  dates: [],
  drop_down_data: [],
  gauge1: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_DETAIL_BY_ID:
      return {
        ...state,
        company: action.payload
      };
    case COMPANY_DATES_BY_ID:
      return {
        ...state,
        dates: action.payload
      };
    case GET_SIMILAR_TABLE:
      return {
        ...state,
        similar_company: action.payload
      };
    case BALANCE_SHEET:
      return {
        ...state,
        balance_sheet: action.payload
      };
    case GET_DROP_DOWN:
      return {
        ...state,
        drop_down_data: action.payload
      };
    case OHLC_CHART:
      return { ...state, ohlc_chart: action.payload };
    case GET_GAUGE_COMPANY1:
      return { ...state, gauge1: action.payload };
    default:
      return state;
  }
}
