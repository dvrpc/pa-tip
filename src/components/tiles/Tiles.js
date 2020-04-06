import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Tiles.css";
import { tileDetails } from "../../utils/tileDetails.js";
import { clickTile } from "../../utils/clickTile.js";
import { getMarkerInfo } from "../reducers/connectTilesToMap.js";

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
        onClick={e => clickTile(this, e)}
        onMouseEnter={e => this.props.getMarkerInfo(project, e)}
        onMouseLeave={e => this.props.getMarkerInfo(null, e)}
        style={{ background: `url(${calculatedProjectInfo.background})` }}
        ref={tile => (this.tileRef = tile)}
      >
        <div
          className="tile-caption"
          style={calculatedProjectInfo.borderBottom}
        >
          <h2 className="tile-caption-text">
            {calculatedProjectInfo.projectName}
          </h2>
          <p className="tile-caption-text">DB #{project.DBNUM}</p>
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
