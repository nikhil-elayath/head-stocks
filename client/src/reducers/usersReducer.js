import { CREATE_USER, LOGIN } from "../actions/Types";

const initialstate = {
  users: []
};

export default function(state = initialstate, action) {
  switch (action.type) {
    case CREATE_USER:
      return state;
    case LOGIN:
      return state;
    default:
      return state;
  }
}
