import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Search from "../search/Search";

import {
  getTIPByKeywords,
  setMapCenter,
  setMapState
} from "../reducers/getTIPInfo";
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

          <a href="/TIP/NJ/">
            <img id="TIPlogo" src={TIP_logo} alt="TIP logo" />
          </a>

          <h2 id="NJ-text">FY2020 TIP for NJ</h2>
        </div>

        <div id="nav-search-form">
          <Search />
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTIPByKeywords: address => dispatch(getTIPByKeywords(address)),
    setMapCenter: latlng => dispatch(setMapCenter(latlng)),
    setMapState: position => dispatch(setMapState(position))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
