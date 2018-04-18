import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import {
  getTIPByKeywords,
  setMapCenter,
  getTIPByMapBounds
} from "../reducers/getTIPInfo";
import { search, generateAutocomplete } from "../../utils/search.js";
import "./Navbar.css";
import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  componentDidMount() {
    generateAutocomplete(this.input, () => {
      this.handleChange.call(this, { target: { value: this.input.value } });
      search(this, new Event(null));
    });
  }

  handleChange = e => {
    console.log(e);
    this.setState({ value: e.target.value });
  };

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
            value={this.state.value}
            onInput={this.handleChange}
            ref={i => {
              this.input = i;
            }}
          />
          <input id="navBarButton" type="submit" value="search" />
        </form>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTIPByKeywords: address => dispatch(getTIPByKeywords(address)),
    setMapCenter: latlng => dispatch(setMapCenter(latlng))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
