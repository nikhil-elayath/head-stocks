import { COMPANY_DETAIL, BALANCE_SHEET } from "../actions/Types";

const initialState = {
  company: [],
  balance_sheet: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_DETAIL:
      return {
        ...state,
        company: action.payload,
      };
    case BALANCE_SHEET:
      return {
        ...state,
        balance_sheet: action.payload,
      };
    default:
      return state;
  }
}
