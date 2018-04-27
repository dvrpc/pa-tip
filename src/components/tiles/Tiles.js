import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Tiles.css";
import { tileDetails } from "../../utils/tileDetails.js";
import { setCurrentProject } from "../reducers/getTIPInfo";
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
    const calculatedProjectInfo = this.state.details;
    const project = this.props.data.attributes;
    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickTile)}
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
            {project.CTY} County | {project.MPMS_ID}
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentProject: props => dispatch(setCurrentProject(props))
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Tile));
