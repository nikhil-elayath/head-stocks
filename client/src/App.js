import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import home from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={home} />
      </div>
    </Router>
  );
}

export default App;
