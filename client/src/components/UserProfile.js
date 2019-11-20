import React, { Component } from "react";
import "../styles/UserProfile.css";

export default class UserProfile extends Component {
  render() {
    return (
      <div>
        <div id="userProfileContainer">
          <div id="userNavigation">
            <h1>Hi Nikhil !</h1>
          </div>
          <div id="userSearch"></div>
        </div>
      </div>
    );
  }
}
