import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Tiles.css";
import { tileDetails } from "../../utils/tileDetails.js";
import { getFullTIP, setCurrentProject } from "../reducers/getTIPInfo";
import { clickTile } from "../../utils/clickTile.js";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  componentDidMount() {
    const details = tileDetails(
      this.props.data,
      this.tileRef.clientWidth,
      this.tileRef.clientHeight
    );
    this.setState({
      details: details
    });
  }

  render() {
    const project = this.state.details;
    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickTile)}
        style={`background: url(${project.background})`}
        ref={tile => (this.tileRef = tile)}
      >
        <div className="tile-caption" style={project.borderBottom}>
          <h2 className="tile-caption-text">{project.projectName}</h2>
          <p className="tile-caption-text">
            {project.county} County | {project.id}
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id)),
    setCurrentProject: props => dispatch(setCurrentProject(props))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Tile));
