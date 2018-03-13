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
      style: "mapbox://styles/mapbox/streets-v9",
      center: [-75.1633, 39.9522],
      zoom: 14
    });
  }

  componentDidUpdate() {
    // receive the center props
    console.log("updated props are ", this.props);
    // TODO: look into updating the map center, but all the information is here!
    this.map.center = this.props.center[0];
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

export default connect(mapStateToProps, null)(MapComponent);
