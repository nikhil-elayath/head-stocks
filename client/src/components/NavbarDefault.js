import React, { Component } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import logo from "./fakelogo.png";

export default class NavbarDefault extends Component {
  //Displays option inside the hamburger button
  myhamburgfunction() {
    // gets the complete navbar element
    var x = document.getElementById("navbarID");
    // checks if navbar has the required className
    if (x.className === "navbarHS") {
      // adds another className that displays navbar options
      x.className += " responsiveHS";
    } else {
      x.className = "navbarHS";
    }
  }

  removeToken = () => {
    localStorage.removeItem("token");
  };

  render() {
    return (
      <div className="navbarHS" id="navbarID">
        <Link to="/Headstocks">
          <div>
            <img
              className="navbarlogoimage"
              src={logo}
              alt="logo"
              width="30px"
              height="30px"
            />
            <span className="active">
              HEAD<b>STOCKS</b>
            </span>
          </div>
        </Link>
        <span>
          <Link to="/StocksHome" className="linkdecornone">
            Stocks
          </Link>
        </span>
        <span>
          <Link to="/login" className="linkdecornone">
            Login
          </Link>
        </span>
        <span className="icon" onClick={this.myhamburgfunction}>
          <i className="fa fa-bars"></i>
        </span>
      </div>
    );
  }
}
