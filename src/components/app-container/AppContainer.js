import Inferno, { Component } from "inferno";
import "./AppContainer.css";

import Navbar from "../navbar/Navbar.js";
import MapComponent from "../map/Map.js";
import TilesContainer from "../tiles-container/TilesContainer.js";

class AppContainer extends Component {
  //TODO: add props, lifecycle hooks, other stuff
  render() {
    return (
      <div>
        <Navbar />
        <div className="appContainer">
          <MapComponent />
          <TilesContainer />
        </div>
      </div>
    );
  }
}

export default AppContainer;
