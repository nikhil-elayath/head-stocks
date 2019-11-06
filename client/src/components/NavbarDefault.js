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

  render() {
    return (
      <div className="navbarHS" id="navbarID">
        <Link to="/Headstocks">
          <div className="navbarLogoName">
            <span className="active">
              <img
                className="navbarlogoimage"
                src={logo}
                alt="logo"
                width="30px"
                height="30px"
              />
              HEAD<b>STOCKS</b>
            </span>
          </div>
        </Link>

        <div className="navbarLoginOptions">
          <span>
            <Link to="/Login" className="linkdecornone">
              Login
            </Link>
          </span>
        </div>

        <div className="navbarStockOptions">
          <span>
            <Link to="/stocks" className="linkdecornone">
              Stocks
            </Link>
          </span>
        </div>

        <div className="navbarSearchBox">
          <input
            type="text"
            placeholder="Search for a company or ticker"
          ></input>
        </div>

        <span className="icon" onClick={this.myhamburgfunction}>
          <i className="fa fa-bars"></i>
        </span>
      </div>
    );
  }
}
