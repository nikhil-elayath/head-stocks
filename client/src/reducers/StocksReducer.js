import { GET_ALL_COMPANY } from "../actions/Types";

const initialstate = {
  stocks: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case GET_ALL_COMPANY:
      return { ...state, stocks: action.payload };
    default:
      return state;
  }
}
