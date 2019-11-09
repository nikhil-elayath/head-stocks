import React, { Component } from "react";
import "../styles/IndicesProfile.css";

export default class IndicesProfile extends Component {
  render() {
    return (
      <div>
        <div id="indicesMainContainer">
          <div>INdex</div>
          <div>Graph</div>
          <div id="losersGainersContainer">
            <div>
              <h3>Top Gainers</h3>
            </div>
            <div>
              <h3>Top Loosers</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
