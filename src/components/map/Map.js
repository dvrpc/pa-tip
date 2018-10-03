import Inferno, { Component } from "inferno";
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
import layers from "./layers.js";
import mapStyle from "./style.json";
import Legend from "../legend/legend.js";

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
      toggleLayerList: false,
      toggleLegendList: false,
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
    e.target.id === "layerMenuButton"
      ? this.setState({ toggleLayerList: !this.state.toggleLayerList })
      : this.setState({ toggleLegendList: !this.state.toggleLegendList });
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
    let ids = projects.features.map(feature => feature.properties.MPMS_ID);
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
      this.map.addLayer(layers.ipd, "water shadow");
      this.map.addLayer(layers.cmp, "water shadow");
      this.map.addLayer(layers.connections, "admin-3-4-boundaries-bg");
      this.map.addLayer(layers.freight, "admin-3-4-boundaries-bg");
      this.map.addLayer(layers.landUse, "water shadow");
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
      const LONGITUDE = coordinates[0];
      const LATITUDE = coordinates[1];

      const marker = { ...e.features[0].properties, LONGITUDE, LATITUDE };
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
    this.map.on("data", () => {
      if (this.map.isStyleLoaded()) updateBounds(this);
    });

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

    // check if center has been updated by the search bar and flyTo if so (adjust zoom level if on mobile/tablet)
    if (nextProps.center !== this.props.center)
      this.map.flyTo({
        center: [nextProps.center.lng, nextProps.center.lat],
        zoom: window.innerWidth > 900 ? 12.5 : 11
      });

    if (nextProps.markerFromTiles) {
      const marker = nextProps.markerFromTiles;
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
          <div class="dropdown-layers">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="layerMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={this.state.toggleLayerList}
              onClick={this.toggleDropdown}
            >
              Layers
            </button>
            <div
              className={
                "layer-menu " + (this.state.toggleLayerList ? "show" : "")
              }
            >
              {Object.keys(this.state.layers).map(layer => {
                return (
                  <p
                    className={
                      "dropdown-item " +
                      (this.state.layers[layer].show ? "selected" : "")
                    }
                    onClick={() => this.updateLayerVisibility(layer)}
                  >
                    {layer}
                  </p>
                );
              })}
            </div>
          </div>
          <div class="dropdown-legend">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="legendMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded={this.state.toggleLegendList}
              onClick={this.toggleDropdown}
            >
              Legend
            </button>
            {this.state.toggleLegendList ? <Legend show={"show"} /> : null}
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
