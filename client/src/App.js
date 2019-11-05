import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Bhavana
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
// Piyush
import home from "./components/Home";
// Harshal
import NavbarDefault from "./components/NavbarDefault";
//nikhil
import CompanyDetail from "./components/CompanyDetail";
//aditya
import StocksLanding from "./components/StocksLanding";

function App() {
  return (
    <Router>
      <div>
        {/* Harshal */}
        <NavbarDefault />
        {/* Bhavana */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/login" component={Login} />
        {/* Piyush */}
        <Route exact path="/" component={home} />
        {/* Nikhil */}
        <Route exact path="/companydetail" component={CompanyDetail} />
        {/* aditya */}
        <Route exact path="/stocks" component={StocksLanding} />
      </div>
    </Router>
  );
}

export default App;
