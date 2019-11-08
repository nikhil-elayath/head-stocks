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
// nikhil
import CompanyDetail from "./components/CompanyDetail";
import CompanyDetailSecondaryNavbar from "./components/Common/CompanyDetailSecondaryNavbar";
// aditya
import StocksLanding from "./components/StocksLanding";
import CompanyDetailFinancial from "./components/CompanyDetailFinancial";
import CompanyDetailAnalysis from "./components/CompanyDetailAnalysis";
import Footer from "./components/Footer";

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
        <Route exact path="/companydetail/:id" component={CompanyDetail} />
        {/* aditya */}
        <Route exact path="/stocks" component={StocksLanding} />
        <Route
          exact
          path="/secondarynavbar"
          component={CompanyDetailSecondaryNavbar}
        />
        <Route exact path="/financial" component={CompanyDetailFinancial} />
        <Route exact path="/analysis" component={CompanyDetailAnalysis} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
