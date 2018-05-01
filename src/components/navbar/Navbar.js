import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import {
  getTIPByKeywords,
  setMapCenter,
  setMapState
} from "../reducers/getTIPInfo";
import { search, generateAutocomplete } from "../../utils/search.js";
import { handleRadioChange } from "../../utils/handleRadioChange.js";
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

    this.handleChange.bind(this);
  }

  componentDidMount() {
    generateAutocomplete(this.input, () => {
      this.handleChange({ target: { value: this.input.value } });
      search(this, new Event(null));
    });
  }

  handleChange = e => this.setState({ value: e.target.value });

  render() {
    return (
      <nav className="navBar" style={this.props.backgroundGradient}>
        <a href="/TIP/Draft/">
          <img className="navbar-logos" src={TIP_logo} alt="TIP logo" />
          <img className="navbar-logos" src={logo} alt="DVRPC logo" />
        </a>
        <form id="nav-search-form" onSubmit={linkEvent(this, search)}>
          <select
            id="navbarSelector"
            name="navbarSearch"
            onChange={linkEvent(this, handleRadioChange)}
          >
            <option value="false">Search Type...</option>
            <option value="Location">Location</option>
            <option value="MPMS">MPMS ID</option>
            <option value="Keyword">Keyword</option>
          </select>
          <div className="mini-input-stack">
            <input
              id="navSearch"
              type="textarea"
              placeholder="enter address, location, building, etc"
              value={this.state.value}
              onInput={this.handleChange}
              ref={i => {
                this.input = i;
              }}
            />
            <input id="navBarButton" type="submit" value="search" />
          </div>
        </form>
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
