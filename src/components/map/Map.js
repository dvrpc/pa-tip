import Inferno, { Component } from "inferno";
import mapboxgl from "mapbox-gl";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import { getTIPByMapBounds, setMapState } from "../reducers/getTIPInfo";
import { updateBounds, keywordBounds } from "../../utils/updateMap";
import { colors } from "../../utils/tileGeometryColorType.js";
import { setCurrentProject } from "../reducers/getTIPInfo";
import { clickTile } from "../../utils/clickTile.js";
import "./Map.css";
import mapStyle from "./style.json";

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
      markerReference: {},
      keyFilter: ["!=", "MPMS_ID", ""],
      catFilter: ["!=", "DESCRIPTIO", ""]
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

  buildCategoryFilter = cat => {
    switch (cat) {
      case "All Categories":
        this.state.catFilter = ["!=", "DESCRIPTIO", ""];
        break;
      default:
        this.state.catFilter = ["==", "DESCRIPTIO", cat];
    }
  };

  buildKeywordFilter = projects => {
    let ids = projects.features.map(feature => feature.attributes.MPMS_ID);
    if (projects.features && projects.features.length) {
      return ["in", "MPMS_ID"].concat(ids);
    }
    return ["!=", "MPMS_ID", ""];
  };

  componentDidMount() {
    const { history } = this.props;
    const position =
      this.props.position && this.props.position.center
        ? { center: this.props.position.center, zoom: this.props.position.zoom }
        : { center: this.props.center || [-75.148, 40.018], zoom: 9 };

    //TODO: replace the accessToken with a process.ENV variable
    mapboxgl.accessToken =
      "pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA";
    this.map = new mapboxgl.Map({
      container: this.tipMap,
      style: mapStyle,

      // default to center city - flyTo new co-ordinates on search
      center: position.center,
      zoom: position.zoom,
      dragRotate: false
    });

    this.map.on("load", () => {
      //map ready - get features
      updateBounds(this);

      // check for keyword search?
      if (this.props.keywordProjects && this.props.keywordProjects.features) {
        let mpms = this.buildKeywordFilter(this.props.keywordProjects);
        this.state.keyFilter = mpms;
      }

      this.buildCategoryFilter(this.props.category);

      this.map.setFilter("pa-tip-projects", [
        "all",
        this.state.catFilter,
        this.state.keyFilter
      ]);

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

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: {
        top: [0, 0],
        "top-left": [0, 0],
        "top-right": [0, 0],
        bottom: [0, -38],
        "bottom-left": [0, -38],
        "bottom-right": [0, -38],
        left: [15, -26],
        right: [-15, -26]
      }
    });

    this.map.on("click", "pa-tip-projects", e =>
      clickTile({
        props: {
          history,
          setCurrentProject,
          data: { id: e.features[0].properties.MPMS_ID }
        }
      })
    );

    // Change the cursor to a pointer when the mouse is over the projects layer.
    this.map.on("mousemove", "pa-tip-projects", e => {
      this.map.getCanvas().style.cursor = "pointer";
      const coordinates = e.features[0].geometry.coordinates.slice();
      const category = e.features[0].properties.DESCRIPTIO;
      const mpms = e.features[0].properties.MPMS_ID;
      const name = e.features[0].properties.ROAD_NAME;

      popup
        .setLngLat(coordinates)
        .setHTML(
          `<h2>${mpms}</h2><p style="border-bottom: 8px solid #${
            colors[category].forMap
          };">${name}</p>`
        )
        .addTo(this.map);
    });

    // Change it back to a pointer when it leaves.
    this.map.on("mouseleave", "pa-tip-projects", () => {
      this.map.getCanvas().style.cursor = "";
      popup.remove();
    });

    // handle user events to update map results
    this.map.on("zoomend", () => updateBounds(this));
    this.map.on("moveend", () => updateBounds(this));
  }

  componentWillReceiveProps(nextProps) {
    // console.log('props received by map')
    if (nextProps.keywordProjects !== this.props.keywordProjects) {
      let ids = keywordBounds(this, nextProps.keywordProjects);
      this.state.keyFilter = ids;
    }

    this.buildCategoryFilter(nextProps.category);

    this.map.setFilter("pa-tip-projects", [
      "all",
      this.state.catFilter,
      this.state.keyFilter
    ]);

    // check if center has been updated by the search bar and flyTo if so
    if (nextProps.center !== this.props.center)
      this.map.flyTo({
        center: [nextProps.center.lng, nextProps.center.lat],
        zoom: 13
      });
  }

  componentDidUpdate() {}

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
    keywordProjects: state.getTIP.keyword,
    category: state.getTIP.category,
    position: state.getTIP.position
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTIPByMapBounds: bounds => dispatch(getTIPByMapBounds(bounds)),
    setMapState: position => dispatch(setMapState(position))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapComponent)
);
