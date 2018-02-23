import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import { getTIP } from "../reducers/getTIPInfo";
import "./Navbar.css";
import dvrpclogo from "./dvrpclogo.png";

// since this function exists in navbar and homepage, the possibility of extracting it as a UTILITIES function
// is now real. TODO: this^ (would need to make whatever is pushed to history a paramater
// from homepage you'd push main + queryInformation and from navBar you'd just push queryInformation

const searchTIP = (instance, e) => {
  e.preventDefault();
  const address = e.target.querySelector("input").value;
  let validAddress = true;

  // TODO: validate the search input BEFORE pushing to history
  if (validAddress) {
    // hit the dispatch
    instance.props.getTIP(address);
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
        <h2>FY2018 PA TIP</h2>
        <form onSubmit={linkEvent(this, searchTIP)}>
          <input type="textarea" placeholder="Enter Address" />
          <select name="funds">
            <option value="" selected>
              Fund
            </option>
            <option value="1">A FUND</option>
            <option value="2">ANOTHER FUND</option>
            <option value="3">3RD FUND</option>
          </select>
          <select name="category">
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
    getTIP: address => {
      dispatch(getTIP(address));
    }
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
