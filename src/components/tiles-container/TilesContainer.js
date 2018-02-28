import Inferno, { Component } from "inferno";
import { connect } from "inferno-redux";

import "./TilesContainer.css";
import Tile from "../tiles/Tiles.js";
import Footer from "../footer/Footer.js";
import { colors } from "../../utils/tileGeometryColorType.js";
import loading from "./loading.gif";

class TilesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const projects = this.props.projects ? this.props.projects : [];
    return (
      <div className="tilesContainer">
        <div className="header">
          <div className="header-content header-head">
            <h1>Pennsylvania TIP Results</h1>
            <p>{projects.length} results.</p>
          </div>
          <div className="header-content header-filter">
            <h2 className="active">Buttons</h2>
            <h2>To</h2>
            <h2>Filter</h2>
            <h2>Results</h2>
          </div>
        </div>
        {projects && projects.length ? (
          projects.map(feature => <Tile data={feature} key={feature.id} />)
        ) : (
          <img id="no-results" src={loading} alt="loading" />
        )}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.address
  };
};

export default connect(mapStateToProps, null)(TilesContainer);
