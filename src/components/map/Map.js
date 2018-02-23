import Inferno, { Component } from "inferno";
import mapboxgl from "mapbox-gl";
import { connect } from "inferno-redux";
import "./Map.css";

class MapComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //TODO: replace the accessToken with a process.ENV variable
    //TODO: replace center with address as props
    mapboxgl.accessToken =
      "pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA";
    this.map = new mapboxgl.Map({
      container: this.tipMap,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-75.2273, 40.071],
      zoom: 14
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div className="map" ref={e => (this.tipMap = e)} />;
  }
}

const mapStateToProps = state => {
  console.log("state is ", state);
  return {
    center: state.address
  };
};

export default connect(mapStateToProps, null)(MapComponent);
