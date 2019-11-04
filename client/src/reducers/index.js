import { combineReducers } from "redux";
import users from "./usersReducer";
import home from "./homeReducer";
import company from "./CompanyDetailReducer";

export default combineReducers({
  //piyush
  homeReducer: home,

  //bhavana
  usersReducer: users,
  //nikhil
  CompanyDetailReducer: company
});
