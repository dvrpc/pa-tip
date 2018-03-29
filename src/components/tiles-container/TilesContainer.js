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
    const test = this.props.keywordProjects
      ? this.props.keywordProjects.map(project =>
          this.props.geometry(project.id)
        )
      : "fail or whatever";
  }

  // TODO: add a 'no results found' message when the API request comes up blank
  render() {
    // TODO: a better way than nested ternaries b/c this condition will get more complicated
    const projects = this.props.keywordProjects
      ? this.props.keywordProjects
      : this.props.boundsProjects ? this.props.boundsProjects.features : [];
    return (
      <div className="tilesContainer">
        <div className="header">
          <h2>filter results...</h2>
          <select id="selectedCategory" name="category">
            <option value="" selected>
              category
            </option>
            <option value="1">A CATEGORY</option>
            <option value="2">ANOTHER CATEGORY</option>
            <option value="3">3RD CATEGORY</option>
          </select>
          <span className="vr" />
          <p>{projects.length} results.</p>
        </div>
        {projects && projects.length ? (
          /* issue: keyword search yields info as this.props.data while geocode search yields
          info as this.props.data.attributes. I could trim it here so that Tile (and geoColorType)
          have the same input format to work with..
          An advantage of this is that rn, the keys are undefined. trimming off attributes
          gives access to the key, but doesn't actually change anything else tbh. 
          Seems like the fix at this point is just to make the keys more selective
            
          */
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
    keywordProjects: state.keyword,
    boundsProjects: state.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    geometry: id => dispatch(getTIPByMunicipalBoundaries(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TilesContainer);
