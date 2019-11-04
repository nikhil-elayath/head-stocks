import { combineReducers } from "redux";
import users from "./usersReducer";
import company from "./CompanyDetailReducer";
export default combineReducers({
  //bhavana
  usersReducer: users,
  //nikhil
  CompanyDetailReducer: company,
});
