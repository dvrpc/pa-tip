import Inferno, { Component, render } from "inferno";
import mapboxgl from "mapbox-gl";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import {
  getTIPByKeywords,
  getTIPByMapBounds,
  setMapCenter,
  setMapState
} from "../reducers/getTIPInfo";
import { updateBounds, keywordBounds, showPopup } from "../../utils/updateMap";
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
        "Freight Centers": false,
        "DVRPC Land Use (2015)": false
      },
      toggleDropdown: false,
      keyFilter: ["!=", "MPMS_ID", ""],
      catFilter: ["!=", "DESCRIPTIO", ""],
      tilePopup: {}
    };

    this.Places = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
  }

  updateLayerVisibility = selectedLayer => {
    let { layers } = this.state;

    //toggle selected layer state
    Object.keys(layers).forEach(layer => {
      let isVisible = this.map.getLayoutProperty(layer, "visibility");

      // set other layer states to false
      if (layer !== selectedLayer) {
        layers[layer] = false;

        if (isVisible) {
          this.map.setLayoutProperty(layer, "visibility", "none");
        }
      } else {
        // set currently active layer to true or false depending on its current state
        layers[layer] ? (layers[layer] = false) : (layers[layer] = true);

        this.map.setLayoutProperty(
          layer,
          "visibility",
          layers[layer] ? "visible" : "none"
        );
      }
    });

    this.setState({ layers });
  };

  toggleDropdown = e => {
    e.preventDefault();
    this.setState({ toggleDropdown: !this.state.toggleDropdown });
  };

  buildCategoryFilter = cat => {
    switch (cat) {
      case "All Categories":
        this.setState({ catFilter: ["!=", "DESCRIPTIO", ""] });
        break;
      default:
        this.setState({ catFilter: ["==", "DESCRIPTIO", cat || ""] });
    }
  };

  buildKeywordFilter = projects => {
    let ids = projects.features.map(feature => feature.attributes.MPMS_ID);
    if (projects.features && projects.features.length) {
      return ["in", "MPMS_ID"].concat(ids);
    }
    return ["!=", "MPMS_ID", ""];
  };

  componentWillMount() {
    if (this.props.category) this.buildCategoryFilter(this.props.category);
  }

  componentDidMount() {
    const { history } = this.props;
    const position =
      this.props.position && this.props.position.center
        ? { center: this.props.position.center, zoom: this.props.position.zoom }
        : { center: this.props.center || [-75.148, 40.018], zoom: 9 };

    mapboxgl.accessToken =
      "pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA";
    this.map = new mapboxgl.Map({
      container: this.tipMap,
      style: mapStyle,
      center: position.center,
      zoom: position.zoom,
      dragRotate: false
    });

    this.map.on("load", () => {
      //map ready - get features
      updateBounds(this);

      // check for keyword search
      if (this.props.keywordProjects && this.props.keywordProjects.features) {
        let keyFilter = this.buildKeywordFilter(this.props.keywordProjects);
        this.setState({ keyFilter });
      }

      // add zoom controls
      let zoom = new mapboxgl.NavigationControl();
      this.map.addControl(zoom, "bottom-left");

      // TODO: re-write this whole section. DRY shit
      this.map.addSource("IPD", {
        type: "geojson",
        data:
          "https://opendata.arcgis.com/datasets/ab586640e7ab40e58c0615f9355cb35a_0.geojson"
      });
      this.map.addSource("CMP", {
        type: "geojson",
        data:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/DVRPC_CMP_2015/FeatureServer/1/query?where=1%3D1&outFields=WEB_COLOR&returnGeometry=true&geometryPrecision=4&outSR=4326&f=pgeojson"
      });
      this.map.addSource("Connections", {
        type: "geojson",
        data:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Connections_2045_Planning_Centers/FeatureServer/0/query?where=1%3D1&outFields=LUP_TYPE&geometryPrecision=4&outSR=4326&f=pgeojson"
      });
      this.map.addSource("Freight", {
        type: "geojson",
        data:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Connections_2045_Freight_Centers/FeatureServer/0/query?where=1%3D1&outFields=TYPES&outSR=4326&f=geojson"
      });
      this.map.addSource("LandUse", {
        type: "vector",
        url: "https://tiles.dvrpc.org/data/dvrpc-landuse-2015.json"
      });

      // add layers and set initial visibility for each one to 'none'
      this.map.addLayer(
        {
          id: "Indicators of Potential Disadvantage",
          type: "fill",
          source: "IPD",
          layout: {
            visibility: "none"
          },
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
        "water shadow"
      );
      this.map.addLayer(
        {
          id: "CMP Corridors",
          type: "fill",
          source: "CMP",
          layout: {
            visibility: "none"
          },
          paint: {
            "fill-color": ["get", "WEB_COLOR"],
            "fill-opacity": 0.8
          }
        },
        "water shadow"
      );
      this.map.addLayer(
        {
          id: "Connections 2045 Centers",
          type: "fill",
          source: "Connections",
          layout: {
            visibility: "none"
          },
          paint: {
            "fill-color": [
              "case",
              ["==", ["get", "LUP_TYPE"], "Metropolitan Center"],
              "#f26522",
              ["==", ["get", "LUP_TYPE"], "Metropolitan Subcenter"],
              "#223860",
              ["==", ["get", "LUP_TYPE"], "Suburban Center"],
              "#0b6d32",
              ["==", ["get", "LUP_TYPE"], "Town Center"],
              "#729faa",
              ["==", ["get", "LUP_TYPE"], "Rural Center"],
              "#ed1c24",
              ["==", ["get", "LUP_TYPE"], "Planned Town Center"],
              "#9d1d20",
              "#cccccc"
            ],
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              7,
              0.75,
              9,
              0.5,
              11,
              0.25
            ]
          }
        },
        "admin-3-4-boundaries-bg"
      );
      this.map.addLayer(
        {
          id: "Freight Centers",
          type: "fill",
          source: "Freight",
          layout: {
            visibility: "none"
          },
          paint: {
            "fill-color": [
              "case",
              ["==", ["get", "TYPES"], "International Gateway"],
              "#f4bd48",
              ["==", ["get", "TYPES"], "Heavy Industrial"],
              "#ef7e51",
              ["==", ["get", "TYPES"], "Distribution and Logistics"],
              "#ca4b66",
              ["==", ["get", "TYPES"], "High Tech Manufacturing"],
              "#883272",
              ["==", ["get", "TYPES"], "Local Manufacturing and Distribution"],
              "#312867",
              "#cccccc"
            ],
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              7,
              0.75,
              9,
              0.5,
              11,
              0.25
            ]
          }
        },
        "admin-3-4-boundaries-bg"
      );
      this.map.addLayer(
        {
          id: "DVRPC Land Use (2015)",
          type: "fill",
          source: "LandUse",
          layout: {
            visibility: "none"
          },
          "source-layer": "lu2015",
          paint: {
            "fill-color": [
              "step",
              ["to-number", ["get", "lu15sub"]],
              "rgb(255, 255, 0)",
              3000,
              "rgb(194,158,215)",
              4000,
              "rgb(104,104,104)",
              5000,
              "rgb(255,190,190)",
              6000,
              "rgb(255,0,0)",
              7000,
              "rgb(190,232,255)",
              8000,
              "rgb(0,132,168)",
              9000,
              "rgb(230,230,0)",
              10000,
              "rgb(215,215,158)",
              11000,
              "rgb(168,0,0)",
              12000,
              "rgb(76,230,0)",
              13000,
              "rgb(0,197,255)",
              14000,
              "rgb(165,245,122)"
            ],
            "fill-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              7,
              0.75,
              9,
              0.5,
              11,
              0.25
            ]
          }
        },
        "water shadow"
      );
    });

    this.map.on("click", "pa-tip-points", e => {
      clickTile({
        props: {
          history,
          data: { id: e.features[0].properties.MPMS_ID }
        }
      });
    });

    let popup;

    // show popup when a user hovers over a marker.
    this.map.on("mouseenter", "pa-tip-points", e => {
      this.map.getCanvas().style.cursor = "pointer";
      const coordinates = e.features[0].geometry.coordinates.slice();
      const long = coordinates[0];
      const lat = coordinates[1];
      const category = e.features[0].properties.DESCRIPTIO;
      const mpms = e.features[0].properties.MPMS_ID;
      const name = e.features[0].properties.ROAD_NAME;

      const marker = { long, lat, mpms, category, name };
      popup = showPopup(marker, this.map);
    });

    // remove popup when the user leaves
    this.map.on("mouseleave", "pa-tip-points", () => {
      this.map.getCanvas().style.cursor = "";
      popup.remove();
    });

    // handle user events to update map results
    this.map.on("zoomend", () => updateBounds(this));
    this.map.on("moveend", () => updateBounds(this));

    const { type, value } = this.props.match.params;

    if (type === "location") {
      this.context.store.getState().getTIP.keyword = [];
      this.Places.getDetails(
        { placeId: value, fields: ["geometry.location"] },
        results => {
          this.props.setMapCenter({
            lng: results.geometry.location.lng(),
            lat: results.geometry.location.lat()
          });
        }
      );
    } else {
      this.context.store.getState().getTIP.bounds = [];
      this.props.getTIPByKeywords(value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keywordProjects !== this.props.keywordProjects) {
      let keyFilter = keywordBounds(this, nextProps.keywordProjects);
      this.setState({ keyFilter });
    }

    if (nextProps.category) this.buildCategoryFilter(nextProps.category);

    // check if center has been updated by the search bar and flyTo if so
    if (nextProps.center !== this.props.center)
      this.map.flyTo({
        center: [nextProps.center.lng, nextProps.center.lat],
        zoom: 13
      });

    if (nextProps.markerFromTiles) {
      const marker = nextProps.markerFromTiles;
      console.log("marker at props ", marker);
      const tilePopup = showPopup(marker, this.map);
      this.setState({ tilePopup });
    }

    // remove any existing popups from hover
    if (Object.keys(this.state.tilePopup).length) {
      this.state.tilePopup.remove();
      this.setState({ tilePopup: {} });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    if (this.map) {
      let lines = this.map.getLayer("pa-tip-lines");
      let points = this.map.getLayer("pa-tip-points");

      if (points && lines) {
        ["pa-tip-points", "pa-tip-lines"].forEach(layer => {
          this.map.setFilter(layer, [
            "all",
            this.state.catFilter,
            this.state.keyFilter
          ]);
        });
      }
    }

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
                <p
                  className={
                    "dropdown-item " +
                    (this.state.layers[layer] ? "selected" : "")
                  }
                  onClick={() => this.updateLayerVisibility(layer)}
                >
                  {layer}
                </p>
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
    position: state.getTIP.position,
    markerFromTiles: state.connectTilesToMap.markerInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTIPByKeywords: keywords => dispatch(getTIPByKeywords(keywords)),
    getTIPByMapBounds: features => dispatch(getTIPByMapBounds(features)),
    setMapCenter: latlng => dispatch(setMapCenter(latlng)),
    setMapState: position => dispatch(setMapState(position))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapComponent)
);
