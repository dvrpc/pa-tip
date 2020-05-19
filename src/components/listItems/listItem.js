import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./listItem.css";

import { getMarkerInfo } from "../../redux/reducers/connectTilesToMap.js";
import { setProjectScope } from "../../redux/reducers/getTIPInfo";

import { clickTile } from "../../utils/clickTile.js";
import counties from "./counties.js";
import { fetchSprite } from "./fetchSprite.js";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: ""
    };
  }

  componentDidMount() {
    let category =
      this.props.data.DESCRIPTIO === "null"
        ? "Other"
        : this.props.data.DESCRIPTIO;
    fetchSprite.then(response => {
      this.setState({
        coords: `-${response[category].x}px -${response[category].y}px`
      });
    });
  }

  render() {
    const project = this.props.data;
    const clickProps = {
      history: this.props.history,
      data: {
        LONGITUDE: project.LONGITUDE,
        LATITUDE: project.LATITUDE,
        MPMS_ID: project.MPMS_ID
      }
    };

    // formatting
    const thumbnailAlign = this.props.length < 3 ? "baseline" : "center";

    // set the category thumbnail
    let imgStyle = {
      width: "62px",
      height: "62px",
      objectFit: "none",
      objectPosition: this.state.coords,
      alignSelf: thumbnailAlign
    };

    return (
      <div
        className="list-item"
        onClick={e => clickTile(clickProps, this.props.setProjectScope)}
        onMouseEnter={e => this.props.getMarkerInfo(this.props.data, e)}
        onMouseLeave={e => this.props.getMarkerInfo(null, e)}
      >
        <img
          src="https://tiles.dvrpc.org/data/styles/dvrpc-pa-tip/sprite.png"
          className="list-category-thumbnail"
          style={imgStyle}
          alt={`icon for ${project.DESCRIPTIO} projects`}
        />

        <div className="list-text">
          <h2 className="name">{project.ROAD_NAME}</h2>
          <h2 className="county-and-funding">
            <em>
              {project.CTY}
              {counties.indexOf(project.CTY) > -1 ? " County" : ""}
            </em>
          </h2>
          <h2 className="mpms">MPMS: {project.MPMS_ID}</h2>
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

export default withRouter(connect(null, mapDispatchToProps)(ListItem));
