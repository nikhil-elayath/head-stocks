import React, { Component } from "react";
// import Navbar from "./NavbarDefault";
import "../styles/StocksLanding.css";
import companylogo from "./apple--big.svg";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";

export default class StocksLanding extends Component {
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        <div id="stocks_main_container">
          <p>STOCKS</p>
          <div id="stocks_main_grid_container">
            <div id="stocks_grid_container">
              {/* -------------------------------------------------------------------------------------- */}
              <div id="stocks_grid_details">
                <img src={companylogo} id="stocks_img" />
                <div id="stocks_name">APPLE INC</div>
                <div id="stocks_ticker">(APPL)</div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Closed Price:</div>
                  <div id="stocks_details">249.05 USD</div>
                </div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Market Cap:</div>
                  <div id="stocks_details">1114.39B</div>
                </div>
              </div>
              {/* -------------------------------------------------------------------------------------- */}
              <div id="stocks_grid_details">
                <img src={companylogo} id="stocks_img" />
                <div id="stocks_name">APPLE INC</div>
                <div id="stocks_ticker">(APPL)</div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Closed Price:</div>
                  <div id="stocks_details">249.05 USD</div>
                </div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Market Cap:</div>
                  <div id="stocks_details">1114.39B</div>
                </div>
              </div>
              {/* -------------------------------------------------------------------------------------- */}
              <div id="stocks_grid_details">
                <img src={companylogo} id="stocks_img" />
                <div id="stocks_name">APPLE INC</div>
                <div id="stocks_ticker">(APPL)</div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Closed Price:</div>
                  <div id="stocks_details">249.05 USD</div>
                </div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Market Cap:</div>
                  <div id="stocks_details">1114.39B</div>
                </div>
              </div>
              {/* -------------------------------------------------------------------------------------- */}
              <div id="stocks_grid_details">
                <img src={companylogo} id="stocks_img" />
                <div id="stocks_name">APPLE INC</div>
                <div id="stocks_ticker">(APPL)</div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Closed Price:</div>
                  <div id="stocks_details">249.05 USD</div>
                </div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Market Cap:</div>
                  <div id="stocks_details">1114.39B</div>
                </div>
              </div>
              {/* -------------------------------------------------------------------------------------- */}
              <div id="stocks_grid_details">
                <img src={companylogo} id="stocks_img" />
                <div id="stocks_name">APPLE INC</div>
                <div id="stocks_ticker">(APPL)</div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Closed Price:</div>
                  <div id="stocks_details">249.05 USD</div>
                </div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Market Cap:</div>
                  <div id="stocks_details">1114.39B</div>
                </div>
              </div>
              {/* -------------------------------------------------------------------------------------- */}
              <div id="stocks_grid_details">
                <img src={companylogo} id="stocks_img" />
                <div id="stocks_name">APPLE INC</div>
                <div id="stocks_ticker">(APPL)</div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Closed Price:</div>
                  <div id="stocks_details">249.05 USD</div>
                </div>
                <div id="stocks_flex_details">
                  <div id="stocks_details_title">Market Cap:</div>
                  <div id="stocks_details">1114.39B</div>
                </div>
              </div>
              {/* -------------------------------------------------------------------------------------- */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
