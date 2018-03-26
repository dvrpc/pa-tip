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

  render() {
    // Get a background image for the project according to its type (function needs coords & category)
    const project = this.props.data.attributes || this.props.data;
    // this.props.attributes is for arcGIS searches
    // this.props.data is for keyword searches
    const path = geometryColorType(project);

    //TODO: replace this API key with a process.ENV secret
    const background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${
      this.state.width
    }x${this.state.height}&maptype=hybrid${path}`;

    // TODO: find out why this is global default view and not the specific point...
    console.log("background of the tile is ", background);

    // based on the project type, assign the gradient value for the caption text
    const projectType =
      this.props.data.attributes.DESCRIPTIO || this.props.data.category;
    const gradient = `background: linear-gradient(to bottom, ${
      colors[projectType].lightest
    }, ${colors[projectType].middle} 75%)`;

    // TODO: refactor this to work with the output of the arcGIS call
    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickTile)}
        style={`background: url(${background})`}
      >
        <div className="tile-caption" style={gradient}>
          <h2 className="tile-caption-text">{this.props.data.road_name}</h2>
          <p className="tile-caption-text">
            {this.props.data.county} County, PA
          </p>
        </div>
        <a href="#" class="tile-link" />
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
