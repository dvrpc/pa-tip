import Inferno, { Component } from "inferno";
import mapboxgl from "mapbox-gl";
import { connect } from "inferno-redux";

import { getTIPByMapBounds } from "../reducers/getTIPInfo";
import { updateBounds, updateMarkers } from "../../utils/updateMap";
import "./Map.css";

// one option: local state bool of 'flown' initially set to true. have if(flown) in didUpdate -flyTo then set it to false.
// alt: hold searched center in local state as 'searchedCenter'. in didMount (or will update - which ones faster?), check if searchedCenter === props.center
// only flyTo if it doesn't equal
// setSTate as the new jawn - this will trigger a re-render tho so hmmm. maybe best to do in willupdate? fuck if i know the difference in performance
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { searchedCenter: this.props.center || null };
  }

  componentDidMount() {
    //TODO: replace the accessToken with a process.ENV variable
    mapboxgl.accessToken =
      "pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA";
    this.map = new mapboxgl.Map({
      container: this.tipMap,
      style: "mapbox://styles/mapbox/streets-v9",

      // default to center city - flyTo new co-ordinates on search
      center: [-75.1633, 39.9522],
      zoom: 13
    });
  }

  // maybe here we can listen for new center and flip the flown bool? fack
  componentWillUpdate() {}

  componentDidUpdate() {
    // only flyTo if a new center has been established by the search function
    if (this.state.searchedCenter != this.props.center) {
      this.map.flyTo({
        center: [this.props.center.lng, this.props.center.lat]
      });
      this.setState({ searchedCenter: this.props.center });
    }

    // handle user events to update map results
    this.map.once("zoomend", () => updateBounds(this));
    this.map.once("moveend", () => updateBounds(this));

    // update markers with the fetched projects
    updateMarkers(this);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className="map" ref={e => (this.tipMap = e)} />;
  }
}

const mapStateToProps = state => {
  return {
    center: state.center,
    projects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTIPByMapBounds: bounds => dispatch(getTIPByMapBounds(bounds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
