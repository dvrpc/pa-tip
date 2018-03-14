import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";
import geocoder from "geocoder";

import "./Homepage.css";
import { getTIPByKeywords, setMapCenter } from "../reducers/getTIPInfo";
import bus from "./bus.svg";
import dna from "./dna.svg";
import globe from "./globe.svg";
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
          <h1>FY19 PA TRANSPORTATION IMPROVEMENT PROGRAM</h1>
          <form id="search-form" onSubmit={linkEvent(this, changePage)}>
            <input
              type="text"
              placeholder="Search by municipality, city, zip code or neighborhood"
            />
          </form>
        </div>
        <div className="tip-info">
          <h1>What is the TIP?</h1>
          <div className="tip-info-row">
            <div className="tip-columns">
              <img src={bus} alt="trendy icon" className="columns-icon" />
              <h2>Trendy</h2>
              <p>
                really informative block of text telling you all you'd need to
                know about the tip in a variety of ways maybe some kind of
                graphic icon above each header would make it extra cool and
                trendy. Writing out all this dummy text is a great use of my
                time im really killing it as far as efficiency is concerned.
              </p>
            </div>
            <div className="tip-columns">
              <img src={dna} alt="trendy icon" className="columns-icon" />
              <h2> Information</h2>
              <p>
                really informative block of text telling you all you'd need to
                know about the tip in a variety of ways maybe some kind of
                graphic icon above each header would make it extra cool and
                trendy. Writing out all this dummy text is a great use of my
                time im really killing it as far as efficiency is concerned.
              </p>
            </div>
            <div className="tip-columns">
              <img src={globe} alt="trendy icon" className="columns-icon" />
              <h2>Columns</h2>
              <p>
                really informative block of text telling you all you'd need to
                know about the tip in a variety of ways maybe some kind of
                graphic icon above each header would make it extra cool and
                trendy. Writing out all this dummy text is a great use of my
                time im really killing it as far as efficiency is concerned.
              </p>
            </div>
          </div>
          <div className="tip-info-big-column">
            <h2>Super Important Header</h2>
            <p>
              A full width information column to define a very important aspect
              of the TIP. Again, I have no idea what kind of content is even
              going here so I'm just making up a layout as I go along. Could be
              great, could be awful. Who knows. Certainly not me. Maybe this
              isn't even necessary. I'm just writing enough text so that this
              temporary layout can work. Seems like it needs more text which
              could be remedied by increasing font size but for now i'm just
              going to write more nonsense. Maybe this section could be used to
              explain how to use the app - what to search for, how to interpret
              the results page, how to filter results, how to share results,
              what everything means, etc.
            </p>
          </div>
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
