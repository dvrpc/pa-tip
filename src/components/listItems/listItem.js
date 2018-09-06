import Inferno, { Component, linkEvent } from "inferno";
import { withRouter } from "inferno-router";

import { clickTile } from "../../utils/clickTile.js";

import "./listItem.css";

/*
workflow:
    list itmes will become the new default view w/in tilesContainer
    Toggle switch needs to be added to tilesContainer header
    Tiles DO NOT GENERATE until they are toggled - don't want to load all the google maps imagery until/if necessary
*/

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const project = this.props.data.attributes;

    // temporary - replace w/utils function later
    let projectName = project.ROAD_NAME;
    if (projectName.length > 40) projectName = projectName.slice(0, 36) + "...";

    return (
      <div className="list-item" onClick={linkEvent(this, clickTile)}>
        <img className="list-category-thumbnail" />

        <div className="list-text">
          <h2>
            {projectName} MPMS ID: {project.MPMS_ID}
          </h2>

          <h3>County/Operator | Total Funding first 4 years</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(ListItem);
