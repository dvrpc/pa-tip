import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";
import geocoder from "geocoder";

import "./Homepage.css";
import { getTIPByKeywords, setMapCenter } from "../reducers/getTIPInfo";
// TODO: get illustrator to properly export and SVG so I don't have to store PNG
import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";
import philly from "./philly.mp4";

// TODO: refactor this function as a UTILS function and plug it in to here and navbar.js
const changePage = (instance, e) => {
  e.preventDefault();
  const input = {
    value: e.target.querySelector("input").value,
    // TODO: find a way to dynamically judge and replace the type of input
    /*
      option 1:
      standardize the input & compare it to the municipal dictionary. if it's in there, input.type = municipal
      if it's not in the municipal dictionary, input.type = geocode and then:
        if error in geocoding, run the keyword API call
        if success, call the address geocode jawnnnnn
    */
    type: "address"
  };
  let validAddress = true;

  if (validAddress) {
    if (input.type === "municipal boundary") {
      // get tip by municipal boundaries
      // TBD on updating the map cause the JSON municipals might already have the jawns jawned out
    } else if (input.type === "address") {
      // geocode address to get the lat/long of it
      geocoder.geocode(input.value, (err, data) => {
        // TODO: error handling
        const northeast = data.results[0].geometry.bounds.northeast;
        const southwest = data.results[0].geometry.bounds.southwest;
        instance.props.setMapCenter([northeast, southwest]);
      });
    } else {
      instance.props.getTIPByKeywords(input.value);
    }

    // TODO: validate the search input BEFORE pushing to history
    instance.props.history.push(`/main/${input.value}`);
  } else {
    // do something to prompt re-entry from a user
  }
};

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="landing">
          <div className="homepage-banner">
            <img id="banner-logo" src={logo} alt="dvrpc logo" />
            <img src={TIP_logo} alt="Transportation Improvement Program logo" />
            <div className="stacked-headers">
              <h1>FY19 PA Transportation</h1>
              <h1>Improvement Program</h1>
            </div>
          </div>

          <div className="homepage-main">
            <video
              playsinline
              autoplay
              muted
              loop
              poster="https://cdn10.phillymag.com/wp-content/uploads/sites/3/2017/11/philadelphia-skyline-sean-pavone-900x600.jpg"
              id="bgvid"
            >
              <source src={philly} type="video/mp4" />
            </video>
            <form id="search-form" onSubmit={linkEvent(this, changePage)}>
              <input
                type="text"
                placeholder="Search by municipality, city, zip code or neighborhood"
              />
            </form>
          </div>

          <div className="homepage-bottom-bar" />
        </div>
        <div className="tip-info">
          <h2>About DVRPC</h2>
          <h2>and the TIP</h2>
          <p>
            The Delaware Valley Regional Planning Commission is the federally
            designated Metropolitan Planning Organization for a diverse
            nine-county region in two states: Bucks, Chester, Delaware,
            Montgomery, and Philadelphia in Pennsylvania; and Burlington,
            Camden, Gloucester, and Mercer in New Jersey.
          </p>
          <p>
            DVRPC’s vision for the Greater Philadelphia Region is a prosperous,
            innovative, equitable, resilient, and sustainable region that
            increases mobility choices by investing in a safe and modern
            transportation system; that protects and preserves our natural
            resources while creating healthy communities; and that fosters
            greater opportunities for all.
          </p>
          <p>
            DVRPC’s mission is to achieve this vision by convening the widest
            array of partners to inform and facilitate data-driven
            decision-making. We are engaged across the region, and strive to be
            leaders and innovators, exploring new ideas and creating best
            practices.
          </p>

          <hr />

          <h2>How to Use</h2>
          <h2>this Application</h2>
          <p>
            The Delaware Valley Regional Planning Commission is the federally
            designated Metropolitan Planning Organization for a diverse
            nine-county region in two states: Bucks, Chester, Delaware,
            Montgomery, and Philadelphia in Pennsylvania; and Burlington,
            Camden, Gloucester, and Mercer in New Jersey. DVRPC fully complies
            with Title VI of the Civil Rights Act of 1964 and related
            nondiscrimination statutes in all activities. For more information,
            visit www.dvrpc.org/GetInvolved/TitleVI. The authors are solely
            responsible for the findings and conclusions herein, which may not
            represent the official views or policies of the funding agencies.
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTIPByKeywords: keywords => {
      dispatch(getTIPByKeywords(keywords));
    },
    setMapCenter: latlng => {
      dispatch(setMapCenter(latlng));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Homepage));
