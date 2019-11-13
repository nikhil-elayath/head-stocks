import {
  GET_ALL_COMPANY,
  GET_ALL_SECTORS,
  GET_ALL_INDUSTRIES
} from "../actions/Types";

const initialstate = {
  stocks: [],
  sectors: [],
  industries: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case GET_ALL_COMPANY:
      return { ...state, stocks: action.payload };
    case GET_ALL_SECTORS:
      return { ...state, sectors: action.payload };
    case GET_ALL_INDUSTRIES:
      return { ...state, industries: action.payload };
    default:
      return state;
  }
}
