import { combineReducers } from "redux";
import users from "./usersReducer";
import home from "./homeReducer";

export default combineReducers({
  usersReducer: users,
  homeReducer: home
});
