import Inferno, { Component, linkEvent } from "inferno";
import { withRouter } from "inferno-router";

import "./Tiles.css";
import { tileDetails } from "../../utils/tileDetails.js";
import { clickTile } from "../../utils/clickTile.js";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    /*    console.log('this props at will receive ', this.props.data)
    console.log('next props at will receive ', nextProps.data)

    // paint again if a new project comes into view
    if(!Object.is(nextProps.data.attributes, this.props.data.attributes)) {
      tileDetails(
        nextProps.data,
        this.tileRef.clientWidth,
        this.tileRef.clientHeight
      ).then(details => this.setState({ details }));
    }*/
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

export default withRouter(Tile);
