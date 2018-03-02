import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import { getTIP } from "../reducers/getTIPInfo";
import "./Navbar.css";
import dvrpclogo from "./dvrpclogo.png";

const searchTIP = (instance, e) => {
  e.preventDefault();
  const fundsSelector = e.target.querySelector("#selectedFunds");
  const categorySelector = e.target.querySelector("#selectedCategory");

  // get a handle on inputted search values (for now, address is the only one used)
  const address = e.target.querySelector("#navSearch").value;
  const funds = fundsSelector.options[fundsSelector.selectedIndex].text;
  const category =
    categorySelector.options[categorySelector.selectedIndex].text;

  let validAddress = true;

  // TODO: validate the search input BEFORE pushing to history
  // TODO pt. 2: Consider making the validator a function and importing it in from utils.js.
  if (validAddress) {
    // hit the dispatch
    instance.props.getTIP(address);
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
          <img src={dvrpclogo} alt="logo" />
        </a>
        <form onSubmit={linkEvent(this, searchTIP)}>
          <input id="navSearch" type="textarea" placeholder="Enter Address" />
          <select id="selectedFunds" name="funds">
            <option value="" selected>
              Fund
            </option>
            <option value="1">A FUND</option>
            <option value="2">ANOTHER FUND</option>
            <option value="3">3RD FUND</option>
          </select>
          <select id="selectedCategory" name="category">
            <option value="" selected>
              Category
            </option>
            <option value="1">A CATEGORY</option>
            <option value="2">ANOTHER CATEGORY</option>
            <option value="3">3RD CATEGORY</option>
          </select>
          <input type="button" value="search" />
        </form>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTIP: address => dispatch(getTIP(address))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
