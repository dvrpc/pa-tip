import Inferno, { Component } from "inferno";
import "./AppContainer.css";

import Navbar from "../navbar/Navbar.js";
import MapComponent from "../map/Map.js";
import TilesContainer from "../tiles-container/TilesContainer.js";

class AppContainer extends Component {
  render() {
    const background =
      "background: linear-gradient( to right, white 35%, #E8E8E8 45%, #666)";
    return (
      <div>
        <Navbar backgroundGradient={background} />
        <div className="appContainer">
          <MapComponent />
          <TilesContainer />
        </div>
      </div>
    );
  }
}

export default AppContainer;
