import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { clickTile } from "../../utils/clickTile.js";
import { getMarkerInfo } from "../../redux/reducers/connectTilesToMap.js";
import counties from "../../utils/counties.js";
import { fetchSprite } from "../../utils/fetchSprite.js";

import "./listItem.css";

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
        onClick={e => clickTile(this, e)}
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
          <h2 className="mpms">DB #{project.MPMS_ID}</h2>
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

export default withRouter(connect(null, mapDispatchToProps)(ListItem));
