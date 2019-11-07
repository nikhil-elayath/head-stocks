import { combineReducers } from "redux";
import users from "./usersReducer";
import home from "./homeReducer";
import company from "./CompanyDetailReducer";
import searchResults from "./navbarReducer"
export default combineReducers({
  //piyush
  homeReducer: home,

  //bhavana
  usersReducer: users,
  //nikhil
  CompanyDetailReducer: company,
  // Harshal
  navbarReducer: searchResults
});
