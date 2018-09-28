import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import { clickTile } from "../../utils/clickTile.js";
import { getMarkerInfo } from "../reducers/connectTilesToMap.js";

import "./listItem.css";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: ""
    };
  }

  componentWillMount() {
    let category = this.props.data.category;

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
    const project = this.props.data;
    let thumbnailAlign;

    // formatting
    this.props.length < 3
      ? (thumbnailAlign = "baseline")
      : (thumbnailAlign = "center");

    // set the category thumbnail
    let imgStyle = {
      width: "44px",
      height: "42px",
      objectFit: "none",
      objectPosition: this.state.coords,
      alignSelf: thumbnailAlign
    };

    return (
      <div
        className="list-item"
        onClick={linkEvent(this, clickTile)}
        onMouseEnter={linkEvent(this.props.data, this.props.getMarkerInfo)}
        onMouseLeave={linkEvent(null, this.props.getMarkerInfo)}
      >
        <img
          src="https://tiles.dvrpc.org/data/styles/dvrpc-streets/sprite.png"
          className="list-category-thumbnail"
          style={imgStyle}
          alt={`icon for ${project.category} projects`}
        />

        <div className="list-text">
          <h2 className="name">{project.name}</h2>
          <h2 className="county-and-funding">
            <em>{project.cnty} County</em>
          </h2>
          <h2 className="mpms">MPMS ID: {project.mpms}</h2>
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
