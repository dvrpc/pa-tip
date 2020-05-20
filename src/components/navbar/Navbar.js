import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Search from "../search/Search";

import "./Navbar.css";
import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      selectedButton: "Location"
    };
  }

  render() {
    return (
      <nav className="navBar">
        <div className="navbar-links">
          <a href="https://www.dvrpc.org/" rel="external">
            <img src={logo} alt="DVRPC logo" id="dvrpc-logo" />
          </a>

          <span className="nav-vr"></span>

          <div id="tip-logo-wrapper">
            <a href="/TIP/Draft/">
              <img id="TIPlogo" src={TIP_logo} alt="TIP logo" />
            </a>

            <div>
              <h2 className="pa-text">Draft FY2021</h2>
              <h2 className="pa-text">TIP for PA (FY21-24)</h2>
            </div>
          </div>
        </div>

        <div id="nav-search-form">
          <Search />
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
