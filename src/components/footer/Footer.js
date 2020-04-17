import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div>
          <address>
            190 N. Independence Mall West, 8th Floor,
            <br />
            Philadelphia, PA 19106-1520
            <br />
            215.592.1800
          </address>
          <br />© Delaware Valley Regional Planning Commission
        </div>
        <div id="footer-mailing">
          <p>
            <a href="https://signup.e2ma.net/signup/1808352/1403728/">
              Sign up for our email lists
            </a>
          </p>
          <p>
            <a href="/Policies/">Policies</a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
