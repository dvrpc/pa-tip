import Inferno, { Component } from "inferno";
import mapboxgl from "mapbox-gl";
import { connect } from "inferno-redux";

import { getTIPByMapBounds } from "../reducers/getTIPInfo";
import { updateBounds, updateMarkers } from "../../utils/updateMap";
import "./Map.css";

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

  // look into having the flyTo check would be more performant as a willupdate or a didupdate
  // same applies for the zoomend and moveend. UpdateMarkers could be the only thing that's needed in didUpdate...
  componentWillUpdate() {}

  componentDidUpdate() {
    // only flyTo if a new center has been established by the search function
    if (this.state.searchedCenter != this.props.center) {
      this.map.flyTo({
        center: [this.props.center.lng, this.props.center.lat]
      });
      // this triggers a re-render which is not optimal. It works, but a better solution for only updating on search has to exist.
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
