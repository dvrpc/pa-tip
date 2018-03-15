import Inferno, { Component } from "inferno";
import { connect } from "inferno-redux";

import "./TilesContainer.css";
import Tile from "../tiles/Tiles.js";
import Footer from "../footer/Footer.js";
import { colors } from "../../utils/tileGeometryColorType.js";
import loading from "./loading.gif";
import { getTIPByMunicipalBoundaries } from "../reducers/getTIPInfo.js";

class TilesContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const test = this.props.projects
      ? this.props.projects.map(project => this.props.geometry(project.id))
      : "fail or whatever";
    console.log("test is ", test);
  }

  // TODO: add a 'no results found' message when the API request comes up blank
  render() {
    const projects = this.props.projects ? this.props.projects : [];
    return (
      <div className="tilesContainer">
        <div className="header">
          <h2>filter results...</h2>
          <select id="selectedCategory" name="category">
            <option value="" selected>
              Category
            </option>
            <option value="1">A CATEGORY</option>
            <option value="2">ANOTHER CATEGORY</option>
            <option value="3">3RD CATEGORY</option>
          </select>
          <span className="vr" />
          <p>{projects.length} results.</p>
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
    projects: state.keyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    geometry: id => dispatch(getTIPByMunicipalBoundaries(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TilesContainer);
