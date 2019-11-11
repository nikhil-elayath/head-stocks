import { combineReducers } from "redux";
import users from "./usersReducer";
import home from "./homeReducer";
import company from "./CompanyDetailReducer";
import searchResults from "./navbarReducer";
import LoadingReducer from "./LoadingReducer";
import stocks from "./StocksReducer";
import singleIndex from "./IndicesReducer";
export default combineReducers({
  //piyush
  homeReducer: home,
  LoadingReducer,

  //bhavana
  usersReducer: users,
  //nikhil
  CompanyDetailReducer: company,
  // Harshal
  navbarReducer: searchResults,
  stocksReducer: stocks,
  indexReducer: singleIndex
});
