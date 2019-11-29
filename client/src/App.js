import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// Bhavana
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import UserBuyStocks from "./components/UserBuyStocks";
// Piyush
import home from "./components/Home";
import UserHistory from "./components/UserHistory";
import Kafka from "./components/Kafka";
// Harshal
import NavbarDefault from "./components/NavbarDefault";
// import UpdateCompany from "./components/UpdateCompany";
// nikhil
import CompanyDetail from "./components/CompanyDetail";
import CompanyDetailSecondaryNavbar from "./components/Common/CompanyDetailSecondaryNavbar";
// aditya
import StocksLanding from "./components/StocksLanding";
import CompanyDetailFinancial from "./components/CompanyDetailFinancial";
import CompanyDetailAnalysis from "./components/CompanyDetailAnalysis";
import Footer from "./components/Footer";
import IndicesProfile from "./components/IndicesProfile";

function App() {
  return (
    <Router>
      <div>
        {/*piyush */}
        <Kafka />
        {/* Harshal */}
        <NavbarDefault />
        {/* <Route exact path="/updatecompany" component={UpdateCompany} /> */}

        {/* Bhavana */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/buyStocks" component={UserBuyStocks} />
        {/* Piyush */}
        <Route exact path="/" component={home} />
        <Route exact path="/companydetail/:id" component={CompanyDetail} />
        <Route exact path="/userhistory" component={UserHistory} />
        {/* aditya */}
        <Route exact path="/stocks" component={StocksLanding} />
        <Route
          exact
          path="/secondarynavbar"
          component={CompanyDetailSecondaryNavbar}
        />
        <Route exact path="/financial/:id" component={CompanyDetailFinancial} />
        <Route exact path="/analysis/:id" component={CompanyDetailAnalysis} />
        <Route exact path="/indexProfile/:id" component={IndicesProfile} />
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
