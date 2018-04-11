import Inferno, { Component } from "inferno";
import { connect } from "inferno-redux";

import "./TilesContainer.css";
import Tile from "../tiles/Tiles.js";
import Footer from "../footer/Footer.js";
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
      : this.props.boundsProjects ? this.props.boundsProjects.features : null;
    return (
      <div className="tilesContainer">
        <div className="header">
          <h2>filter results...</h2>
          <select id="selectedCategory" name="category">
            <option value="" selected>
              category
            </option>
            <option value="1">Bicycle/Pedestrian Improvement</option>
            <option value="2">Bridge Replacement</option>
            <option value="3">Streetscape</option>
            <option value="4">Transit Improvements</option>
            <option value="5">Signal/ITS Improvements</option>
            <option value="6">Roadway Rehabilitation</option>
            <option value="7">Roadway New Capacity</option>
            <option value="8">Intersection Improvements</option>
            <option value="9">Other</option>
          </select>
          <span className="vr" />
          <p>{projects ? projects.length : 0} results.</p>
        </div>
        {projects ? (
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
