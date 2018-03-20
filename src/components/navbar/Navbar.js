import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import { getTIPByKeywords } from "../reducers/getTIPInfo";
import { search } from "../../utils/search.js";
import "./Navbar.css";
import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    console.log("navbar props are ", this.props.backgroundGradient);
  }

  render() {
    return (
      <nav className="navBar" style={this.props.backgroundGradient}>
        <a href="/">
          <img src={TIP_logo} alt="TIP logo" />
          <img src={logo} alt="DVRPC logo" />
        </a>
        <form id="nav-search-form" onSubmit={linkEvent(this, search)}>
          <input
            id="navSearch"
            type="textarea"
            placeholder="search by municipality, city, zip code, project, or fund"
          />
          <input type="button" value="search" />
        </form>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTIPByKeywords: address => dispatch(getTIPByKeywords(address))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
