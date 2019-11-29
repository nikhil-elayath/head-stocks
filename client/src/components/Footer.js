import React, { Component } from "react";
import "../styles/Footer.css";
export default class Footer extends Component {
  render() {
    return (
      // Start of Footer -Bhavana
      <div className="footer">
        <p className="footer-p" id="footerInfo">
          {" "}
          © Powered By headStocks
        </p>
        {/* Social media logos -Bhavana */}
        <div className="footer-follow">
          <i className="fab fa-twitter footer-fab"></i>
          <i className="fab fa-facebook footer-fab"></i>
          <i className="fab fa-instagram footer-fab"></i>
          <i className="fab fa-pinterest footer-fab"></i>
        </div>
      </div>
      // End of footer-Bhavana
    );
  }
}
