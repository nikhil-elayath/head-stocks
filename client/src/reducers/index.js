import { combineReducers } from "redux";
import users from "./usersReducer";
import home from "./homeReducer";
import company from "./CompanyDetailReducer";
import searchResults from "./navbarReducer";
import LoadingReducer from "./LoadingReducer";
export default combineReducers({
  //piyush
  homeReducer: home,
  LoadingReducer,

  //bhavana
  usersReducer: users,
  //nikhil
  CompanyDetailReducer: company,
  // Harshal
  navbarReducer: searchResults
});
