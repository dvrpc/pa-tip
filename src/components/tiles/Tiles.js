import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./Tiles.css";
import { geometryColorType } from "../../utils/tileGeometryColorType.js";
import { getFullTIP } from "../reducers/getTIPInfo";

const clickTile = instance => {
  // this function will eventually handle transition animation as well as the URL change
  // TODO: link to the expanded page so that I can do the re-design for it
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
    /*  
    // The following has been refactored to work from utils:

    const path = geometryColorType(this.props.data)
    //TODO: replace this API key with a process.ENV secret
    const background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${
      this.state.width
    }x${this.state.height}&maptype=hybrid${path}`;
    */

    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickTile)}
        /*style={`background: url(${background})`}*/
      >
        <div className="tile-caption">
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

export default connect(null, mapDispatchToProps)(Tile);
