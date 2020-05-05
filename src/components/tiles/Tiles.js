import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Tiles.css";

import { getMarkerInfo } from "../../redux/reducers/connectTilesToMap.js";
import { setProjectScope } from "../../redux/reducers/getTIPInfo";

import { tileDetails } from "./tileDetails.js";
import { clickTile } from "../../utils/clickTile.js";

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
    const clickProps = {
      history: this.props.history,
      data: {
        LONGITUDE: project.LONGITUDE,
        LATITUDE: project.LATITUDE,
        MPMS_ID: project.MPMS_ID
      }
    };
    return (
      <div
        className="tile"
        onClick={e => clickTile(clickProps, this.props.setProjectScope)}
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
          <p className="tile-caption-text">MPMS #{project.MPMS_ID}</p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMarkerInfo: tile => dispatch(getMarkerInfo(tile)),
    setProjectScope: projectScope => dispatch(setProjectScope(projectScope))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Tile));
