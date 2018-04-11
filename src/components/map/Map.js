import Inferno, { Component } from "inferno";
import mapboxgl from "mapbox-gl";
import { connect } from "inferno-redux";

import { getTIPByMapBounds } from "../reducers/getTIPInfo";
import { updateBounds, updateMarkers } from "../../utils/updateMap";
import "./Map.css";

class MapComponent extends Component {
  constructor(props) {
    super(props);
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

  componentWillReceiveProps(nextProps) {
    // check if center has been updated by the search bar and flyTo if so
    if (nextProps.center != this.props.center)
      this.map.flyTo({ center: [nextProps.center.lng, nextProps.center.lat] });
  }

  componentDidUpdate() {
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
