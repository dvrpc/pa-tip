import Inferno, { Component } from "inferno";
import mapboxgl from "mapbox-gl";
import { connect } from "inferno-redux";

import { getTIPByMapBounds } from "../reducers/getTIPInfo";
import { updateBounds, updateMarkers } from "../../utils/updateMap";
import "./Map.css";

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layers: {
        "Indicators of Potential Disadvantage": false,
        "CMP Corridors": false,
        "Connections 2045 Centers": false,
        "Freight Centers": false
      },
      toggleDropdown: false,
      markerReference: {}
    };
  }

  updateLayerVisibility = selectedLayer => {
    let { layers } = this.state;

    //toggle selected layer state
    if (selectedLayer !== null) {
      layers = {
        ...this.state.layers,
        [selectedLayer]: !this.state.layers[selectedLayer]
      };
    }

    Object.keys(layers).forEach(layer => {
      //set other layer states to false
      if (layer !== selectedLayer) layers[layer] = false;

      //update layers
      this.map.setLayoutProperty(
        layer,
        "visibility",
        layers[layer] ? "visible" : "none"
      );
    });

    this.setState({ layers });
  };

  toggleDropdown = () =>
    this.setState({ toggleDropdown: !this.state.toggleDropdown });

  componentDidMount() {
    //TODO: replace the accessToken with a process.ENV variable
    mapboxgl.accessToken =
      "pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA";
    this.map = new mapboxgl.Map({
      container: this.tipMap,
      style: "mapbox://styles/mapbox/streets-v9",

      // default to center city - flyTo new co-ordinates on search
      center: this.props.center || [-75.1633, 39.9522],
      zoom: 13
    });

    this.map.on("load", () => {
      this.map.addSource("IPD", {
        type: "geojson",
        data:
          "https://opendata.arcgis.com/datasets/ab586640e7ab40e58c0615f9355cb35a_0.geojson"
      });
      this.map.addLayer(
        {
          id: "Indicators of Potential Disadvantage",
          type: "fill",
          source: "IPD",
          paint: {
            "fill-color": [
              "interpolate",
              ["linear"],
              ["get", "IPD_Score"],
              9,
              "#ffffd9",
              13,
              "#edf8b1",
              15,
              "#c7e9b4",
              17,
              "#7fcdbb",
              19,
              "#41b6c4",
              21,
              "#1d91c0",
              24,
              "#225ea8",
              27,
              "#253494",
              30,
              "#081d58"
            ],
            "fill-opacity": 0.5
          }
        },
        "water-shadow"
      );

      this.map.addSource("CMP", {
        type: "geojson",
        data:
          "https://opendata.arcgis.com/datasets/80cc2057a84f4b63b3745eaa46417507_1.geojson"
      });
      this.map.addLayer(
        {
          id: "CMP Corridors",
          type: "fill",
          source: "CMP",
          paint: {
            "fill-color": "#0078ae",
            "fill-opacity": 0.5
          }
        },
        "water-shadow"
      );

      this.map.addSource("Connections", {
        type: "geojson",
        data:
          "https://opendata.arcgis.com/datasets/75a9bee3b74e44c791388a2cd775f3b7_0.geojson"
      });
      this.map.addLayer(
        {
          id: "Connections 2045 Centers",
          type: "fill",
          source: "Connections",
          paint: {
            "fill-color": "#0078ae",
            "fill-opacity": 0.5
          }
        },
        "water-shadow"
      );

      this.map.addSource("Freight", {
        type: "geojson",
        data:
          "https://opendata.arcgis.com/datasets/ca3d5b2b76514ca29a038714f0fa6136_0.geojson"
      });
      this.map.addLayer(
        {
          id: "Freight Centers",
          type: "fill",
          source: "Freight",
          paint: {
            "fill-color": "#0078ae",
            "fill-opacity": 0.5
          }
        },
        "water-shadow"
      );

      this.updateLayerVisibility(null);
    });

    // handle user events to update map results
    this.map.on("zoomend", () => updateBounds(this));
    this.map.on("moveend", () => updateBounds(this));

    // populate map on initial load && for navigating back to the page
    updateBounds(this);
    updateMarkers(this);
  }

  componentWillReceiveProps(nextProps) {
    // check if center has been updated by the search bar and flyTo if so
    if (nextProps.center !== this.props.center)
      this.map.flyTo({ center: [nextProps.center.lng, nextProps.center.lat] });
  }

  componentDidUpdate() {
    // update markers with the fetched projects
    updateMarkers(this);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className="map" ref={e => (this.tipMap = e)}>
        <nav className="dropdown-nav">
          <button
            className="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={this.state.toggleDropdown}
            onClick={this.toggleDropdown}
          >
            Layers
          </button>
          <div
            className={
              "layer-menu " + (this.state.toggleDropdown ? "show" : "")
            }
          >
            {Object.keys(this.state.layers).map(layer => {
              return (
                <a
                  href="#"
                  className={
                    "dropdown-item " +
                    (this.state.layers[layer] ? "selected" : "")
                  }
                  onClick={() => this.updateLayerVisibility(layer)}
                >
                  {layer}
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    center: state.getTIP.center,
    projects: state.getTIP.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTIPByMapBounds: bounds => dispatch(getTIPByMapBounds(bounds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
