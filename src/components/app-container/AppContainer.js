import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./AppContainer.css";

import Navbar from "../navbar/Navbar.js";
import MapComponent from "../map/Map.js";
import TilesContainer from "../tiles-container/TilesContainer.js";

class AppContainer extends Component {
  render() {
    const MapComponentWithRouter = withRouter(MapComponent);
    const TilesContainerWithRouter = withRouter(TilesContainer);
    const background =
      "background: linear-gradient( to right, white 35%, #E8E8E8 45%, #666)";
    return (
      <div className="overflow-wrap">
        <Navbar backgroundGradient={background} />
        <div className="appContainer">
          <MapComponentWithRouter />
          <TilesContainerWithRouter />
        </div>
      </div>
    );
  }
}

export default AppContainer;
