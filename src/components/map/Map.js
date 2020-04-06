import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getTIPByKeywords,
  getTIPByMapBounds,
  setMapCenter,
  setMapState,
  setBounds
} from "../reducers/getTIPInfo";
import { updateBounds, showPopup } from "../../utils/updateMap";
import { clickTile } from "../../utils/clickTile.js";

import "./Map.css";
import layers from "./layers.js";
import mapStyle from "./style.json";
import Legend from "../legend/legend.js";

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownLayers: {
        "Indicators of Potential Disadvantage": false,
        "CMP Corridors": false,
        "Connections 2045 Centers": false,
        "Freight Centers": false,
        "DVRPC Land Use (2015)": false,
        "Urbanized Areas": false
      },
      toggleLayerList: false,
      toggleLegendList: false,
      keyFilter: ["!=", "DBNUM", ""],
      catFilter: ["!=", "TYPE_DESC", ""],
      tilePopup: {}
    };

    this.Places = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
  }

  updateLayerVisibility = selectedLayer => {
    let { dropdownLayers } = this.state;

    const srcLookup = {
      "Indicators of Potential Disadvantage": "IPD",
      "CMP Corridors": "CMP",
      "Connections 2045 Centers": "Connections",
      "Freight Centers": "Freight",
      "DVRPC Land Use (2015)": "LandUse",
      "Urbanized Areas": "UrbanizedAreas"
    };

    const selectedSrc = srcLookup[selectedLayer];
    const hasSrc = this.map.getSource(selectedSrc);

    // if the layer doesn't exist yet, add it
    if (!hasSrc) {
      const srcInfo = layers[selectedSrc].source;

      // handle different addSource() format for vector tiles and geojsons
      if (srcInfo.type === "geojson") {
        this.map.addSource(selectedSrc, {
          type: srcInfo.type,
          data: srcInfo.data
        });
      } else {
        this.map.addSource(selectedSrc, {
          type: srcInfo.type,
          url: srcInfo.url
        });
      }

      this.map.addLayer(layers[selectedSrc].layout, "water shadow");
    }

    //toggle selected layer state
    Object.keys(dropdownLayers).forEach(layer => {
      let layerCheck = this.map.getLayer(layer);

      // move on to the next one if the layer hasn't been added yet
      if (!layerCheck) return;

      // set other layer states to false
      if (layer !== selectedLayer) {
        dropdownLayers[layer] = false;

        // if a layer does exist, check it's visibility and set it to none if it was previously on
        if (layerCheck) {
          let isVisible = this.map.getLayoutProperty(layer, "visibility");
          if (isVisible)
            this.map.setLayoutProperty(layer, "visibility", "none");
        }

        // turn currently active layer on or off depending on its current state
      } else {
        dropdownLayers[layer]
          ? (dropdownLayers[layer] = false)
          : (dropdownLayers[layer] = true);

        this.map.setLayoutProperty(
          layer,
          "visibility",
          dropdownLayers[layer] ? "visible" : "none"
        );
      }
    });

    this.setState({ dropdownLayers });
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
        this.setState({ catFilter: ["!=", "TYPE_DESC", ""] });
        break;
      default:
        this.setState({ catFilter: ["==", "TYPE_DESC", cat || ""] });
    }
  };

  buildKeywordFilter = projects => {
    let ids = projects.features.map(feature => feature.properties.DBNUM);
    if (projects.features && projects.features.length) {
      return ["in", "DBNUM"].concat(ids);
    }
    return ["!=", "DBNUM", ""];
  };

  componentDidMount() {
    if (this.props.category) this.buildCategoryFilter(this.props.category);

    // check if center has been updated by the search bar and flyTo if so (adjust zoom level if on mobile/tablet)
    /*if (this.props.center !== this.props.center)
      this.map.flyTo({
        center: [this.props.center.lng, this.props.center.lat],
        zoom: window.innerWidth > 900 ? 12.5 : 11
      });
*/
    if (this.props.markerFromTiles) {
      const marker = this.props.markerFromTiles;
      const tilePopup = showPopup(marker, this.map);
      this.setState({ tilePopup });
    }

    // remove any existing popups from hover
    if (Object.keys(this.state.tilePopup).length) {
      this.state.tilePopup.remove();
      this.setState({ tilePopup: {} });
    }

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
      // check for keyword search
      if (this.props.keywordProjects && this.props.keywordProjects.features) {
        let keyFilter = this.buildKeywordFilter(this.props.keywordProjects);
        this.setState({ keyFilter });
      }

      // add zoom controls
      let zoom = new mapboxgl.NavigationControl();
      this.map.addControl(zoom, "bottom-left");
    });

    this.map.on("click", "nj-tip-points", e => {
      clickTile({
        props: {
          history,
          data: { id: e.features[0].properties.DBNUM }
        }
      });
    });

    let popup;

    // show popup when a user hovers over a marker.
    this.map.on("mouseenter", "nj-tip-points", e => {
      this.map.getCanvas().style.cursor = "pointer";

      const coordinates = e.features[0].geometry.coordinates.slice();
      const LONGITUDE = coordinates[0];
      const LATITUDE = coordinates[1];

      const marker = { ...e.features[0].properties, LONGITUDE, LATITUDE };
      popup = showPopup(marker, this.map);
    });

    // remove popup when the user leaves
    this.map.on("mouseleave", "nj-tip-points", () => {
      this.map.getCanvas().style.cursor = "";
      popup.remove();
    });

    // handle user events to update map results
    this.map.on("zoomend", () => updateBounds(this));
    this.map.on("moveend", () => updateBounds(this));

    // this handles the edge case of setting a filter without map movement, but only sometimes.
    this.map.on("data", () => {
      if (this.map.isStyleLoaded()) updateBounds(this);
    });

    const { type, value } = this.props.match.params;

    if (type === "location") {
      //@TODO: add getTIP to Connect
      //this.context.store.getState().getTIP.keyword = [];
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
      //@TODO: add getTIP to Connect
      this.props.setBounds([]);
      this.props.getTIPByKeywords(value);
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    if (this.map) {
      let lines = this.map.getLayer("nj-tip-lines");
      let points = this.map.getLayer("nj-tip-points");

      if (points && lines) {
        ["nj-tip-points", "nj-tip-lines"].forEach(layer => {
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
          <div className="dropdown-layers">
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
              {Object.keys(this.state.dropdownLayers).map(layer => {
                return (
                  <p
                    key={layer}
                    className={
                      "dropdown-item " +
                      (this.state.dropdownLayers[layer].show ? "selected" : "")
                    }
                    onClick={() => this.updateLayerVisibility(layer)}
                  >
                    {layer}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="dropdown-legend">
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
    setMapState: position => dispatch(setMapState(position)),
    setBounds: bounds => dispatch(setBounds(bounds))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MapComponent)
);
