import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import { getTIPByKeywords } from "../reducers/getTIPInfo";
import "./Navbar.css";
import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";

const searchTIP = (instance, e) => {
  e.preventDefault();
  // get a handle on inputted search values (for now, address is the only one used)
  const address = e.target.querySelector("#navSearch").value;
  let validAddress = true;

  // TODO: validate the search input BEFORE pushing to history
  // TODO pt. 2: Consider making the validator a function and importing it in from utils.js.
  if (validAddress) {
    // hit the dispatch
    instance.props.getTIPByKeywords(address);
    instance.props.history.push(`/main/${address}`);
  } else {
    // do something to prompt re-entry from a user
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navBar">
        <a href="/">
          <img src={TIP_logo} alt="TIP logo" />
          <img src={logo} alt="DVRPC logo" />
        </a>
        <form id="nav-search-form" onSubmit={linkEvent(this, searchTIP)}>
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
