import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Tiles.css";
import { tileDetails } from "../../utils/tileDetails.js";
import { clickTile } from "../../utils/clickTile.js";
import { getMarkerInfo } from "../reducers/connectTilesToMap.js";
import counties from "../../utils/counties.js";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  componentDidMount() {
    // get extra tile info only if it doesn't aleady exist
    if (!this.state.details.length) {
      tileDetails(
        this.props.data,
        this.tileRef.clientWidth,
        this.tileRef.clientHeight
      ).then(details => this.setState({ details }));
    }
  }

  render() {
    const calculatedProjectInfo = this.state.details;
    const project = this.props.data;

    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickTile)}
        onMouseEnter={linkEvent(project, this.props.getMarkerInfo)}
        onMouseLeave={linkEvent(null, this.props.getMarkerInfo)}
        style={`background: url(${calculatedProjectInfo.background})`}
        ref={tile => (this.tileRef = tile)}
      >
        <div
          className="tile-caption"
          style={calculatedProjectInfo.borderBottom}
        >
          <h2 className="tile-caption-text">
            {calculatedProjectInfo.projectName}
          </h2>
          <p className="tile-caption-text">
            {project.CTY} {counties.indexOf(project.CTY) > -1 ? " County" : ""}{" "}
            | {project.MPMS_ID}
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMarkerInfo: tile => dispatch(getMarkerInfo(tile))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Tile));
