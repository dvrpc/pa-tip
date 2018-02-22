import Inferno, { Component } from "inferno";
import "./Map.css";
import mapboxgl from "mapbox-gl";

class MapComponent extends Component {
  componentDidMount() {
    //TODO: replace this with a process.ENV variable
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

export default MapComponent;
