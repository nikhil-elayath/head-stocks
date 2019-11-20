import React, { Component } from "react";
import "../styles/UserProfile.css";

export default class UserProfile extends Component {
  render() {
    return (
      <div>
        <div class="box">
          <a class="button" href="#popup1">
            Let me Pop up
          </a>
        </div>

        <div id="popup1" class="overlay">
          <div class="popup">
            <h2>Ticker : AAPL</h2>
            <a class="close" href="#">
              &times;
            </a>
            <div class="content">
              <input type="number" placeholder="Enter no of Share" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
