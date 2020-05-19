import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./AppContainer.css";

import Navbar from "../navbar/Navbar.js";
import MapComponent from "../map/Map.js";
import ContentContainer from "../content-container/ContentContainer.js";

class AppContainer extends Component {
  render() {
    // @UPDATE:
    // Pass params to map as props as well because it needs to be able to not listen to it
    // clickTile and back both pass a bool that tells map not to reload
    // unless the bool is present, all map does is receive props and set filters

    const ContentContainerWithRouter = withRouter(ContentContainer);
    return (
      <div className="overflow-wrap">
        <Navbar />

        <div className="appContainer">
          <MapComponent />

          <ContentContainerWithRouter params={this.props.match.params} />
        </div>
      </div>
    );
  }
}

export default AppContainer;
