import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Tiles.css";
import {
  geometryColorType,
  colors
} from "../../utils/tileGeometryColorType.js";
import { getFullTIP } from "../reducers/getTIPInfo";

// TODO: refactor this to accept the inputs given by the arcGIS call
const clickTile = (instance, e) => {
  e.preventDefault();
  // TODO: animated transition from results page to expanded page
  const county = instance.props.data.county;
  const id = instance.props.data.id;
  instance.props.getFullTIP(id);
  instance.props.history.push(`/expanded/${county}/${id}`);
};

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 300,
      width: 300
    };
  }

  componentDidMount() {
    const tile = document.querySelector(".tile");
    // TODO: add setState to window resizing like in the analytics dashboard page
    this.setState({
      height: tile.clientHeight,
      width: tile.clientWidth
    });
  }

  // TODO: consider moving all of this into the componentDidMount hook and having background, gradient, county & roadname be local state
  render() {
    let projectName;
    let background;
    let gradient;
    let projectType;
    let county;
    let id;

    // this.props.attributes is for arcGIS searches
    // this.props.data is for keyword searches
    let project = this.props.data.attributes || this.props.data;

    if (project) {
      county = project.county || project.CTY;
      // limit project names to 80 characters
      projectName = project.road_name || project.ROAD_NAME;
      if (projectName.length > 40)
        projectName = projectName.slice(0, 36) + "...";

      //TODO: replace this API key with a process.ENV secret
      // Get a background image for the project according to its type (function needs coords & category)
      const path = geometryColorType(project);
      background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${
        this.state.width
      }x${this.state.height}&maptype=satellite${path}`;

      // based on the project type, assign the gradient value for the caption text
      projectType = project.DESCRIPTIO || project.category;
      gradient = `background: linear-gradient(to bottom, ${
        colors[projectType].lightest
      }, ${colors[projectType].darkest} 45%)`;
    } else {
      project = false;
    }

    // render tiles or a 'no results found for ____' jawn
    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickTile)}
        style={`background: url(${background})`}
      >
        <div className="tile-caption" style={gradient}>
          <h2 className="tile-caption-text">{projectName}</h2>
          <p className="tile-caption-text">{county} County, PA</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Tile));
