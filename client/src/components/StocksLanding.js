import React, { Component } from "react";
import Navbar from "./NavbarDefault";
import "../styles/StocksLanding.css";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

export default class StocksLanding extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="stocks_main_container">
          <p>STOCKS</p>
          <div id="stocks_grid_container">grid here</div>
        </div>
      </div>
    );
  }
}
