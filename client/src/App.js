import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import home from "./components/Home";
import NavbarDefault from "./components/NavbarDefault";
//nikhil
import CompanyDetail from "./components/CompanyDetail";

function App() {
  return (
    <Router>
      <div>
        <NavbarDefault />
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={home} />
        <Route exact path="/navdemo" component={NavbarDefault} />

        <Route exact path="/companydetail" component={CompanyDetail} />
      </div>
    </Router>
  );
}

export default App;
