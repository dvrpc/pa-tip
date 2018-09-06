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
    /*
            @TODO: category thumbnail on the left
                   title | MPMS Id (top)
                   County/Operator | Total funding for first 4 years**
        */
    const project = this.props.data.attributes;
    console.log("project is ", project);
    return (
      <div className="list-item" onClick={linkEvent(this, clickTile)}>
        <img className="list-category-thumbnail" />

        <div className="list-text">
          <h2>
            {project.ROAD_NAME} | MPMS ID: {project.MPMS_ID}
          </h2>

          <h3>County/Operator | Total Funding first 4 years</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(ListItem);
