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
    this.state = {
      coords: ""
    };
  }

  componentWillMount() {
    let category = this.props.data.attributes.DESCRIPTIO;

    fetch("https://tiles.dvrpc.org/data/styles/dvrpc-streets/sprite.json").then(
      response => {
        response.json().then(body => {
          let imgLocation = `-${body[category].x}px -${body[category].y}px`;

          this.setState({
            coords: imgLocation
          });
        });
      }
    );
  }

  render() {
    const project = this.props.data.attributes;

    // set the category thumbnail
    let imgStyle = {
      width: "46px",
      height: "42px",
      objectFit: "none",
      objectPosition: this.state.coords
    };

    return (
      <div className="list-item" onClick={linkEvent(this, clickTile)}>
        <img
          src="https://tiles.dvrpc.org/data/styles/dvrpc-streets/sprite.png"
          className="list-category-thumbnail"
          style={imgStyle}
        />

        <div className="list-text">
          <h2>{project.ROAD_NAME}</h2>
          <h2 className="mpms">MPMS ID: {project.MPMS_ID}</h2>
          <h3>{project.CTY} County | Total Funding first 4 years</h3>
        </div>
      </div>
    );
  }
}

export default withRouter(ListItem);
