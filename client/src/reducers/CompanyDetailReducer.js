import { COMPANY_DETAIL } from "../actions/Types";

const initialState = {
  company: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_DETAIL:
      return {
        ...state,
        company: action.payload,
      };
    default:
      return state;
  }
}
