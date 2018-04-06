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
      // mount w/searched co-ordinates or default to center
      center: this.props.center
        ? [this.props.center.lng, this.props.center.lat]
        : [-75.1633, 39.9522],
      zoom: 13
    });
  }

  componentDidUpdate() {
    this.map.flyTo({ center: [this.props.center.lng, this.props.center.lat] });

    // wait for the map to zoom to its location before
    this.map.on("zoomend", () => {
      // now that the map is centered on the right location, use dispatch the arcGIS call w/the bounding box of the current map window
      updateBounds(this);
    });
    // call the 'update markers' function here - hopefully it'll only invoke *after* zoomend
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
    center: state.center
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTIPByMapBounds: bounds => dispatch(getTIPByMapBounds(bounds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
