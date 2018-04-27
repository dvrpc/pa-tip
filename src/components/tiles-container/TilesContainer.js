import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./TilesContainer.css";
import Tile from "../tiles/Tiles.js";
import Footer from "../footer/Footer.js";
import loading from "./loading.gif";
import { setFilter } from "../reducers/getTIPInfo.js";
import { filterByCategory } from "../../utils/filterByCategory.js";

class TilesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: false,
      categoryToFilter: ""
    };
  }

  render() {
    let projects;

    // handle keyword and bounds projects concurrently
    let keywordProjects =
      this.props.keywordProjects && this.props.keywordProjects.features
        ? this.props.keywordProjects.features
        : [];

    let boundsProjects =
      this.props.boundsProjects && this.props.boundsProjects.features
        ? this.props.boundsProjects.features
        : [];

    projects = keywordProjects.length ? keywordProjects : boundsProjects;

    // determine whether to display all projects, or filtered projects
    if (this.state.filtered) {
      /*projects = keywordProjects
        .concat(boundsProjects)
        .filter(
          project =>
            project.attributes.DESCRIPTIO === this.state.categoryToFilter
        );*/

      projects = projects.filter(
        project => project.attributes.DESCRIPTIO === this.state.categoryToFilter
      );

      // display all projects when no filter is selected
    } else {
      /*projects = keywordProjects.concat(boundsProjects);*/
    }

    console.log("projects at tilesContainer is ", projects);

    return (
      <div className="tilesContainer">
        <div className="header">
          <h2>filter results...</h2>
          <select
            id="selectedCategory"
            name="category"
            onChange={linkEvent(this, filterByCategory)}
            ref={e => (this.categorySelector = e)}
          >
            <option value="false">All Categories</option>
            <option value="1">Bicycle/Pedestrian Improvement</option>
            <option value="2">Bridge Repair/Replacement</option>
            <option value="3">Streetscape</option>
            <option value="4">Transit Improvements</option>
            <option value="5">Signal/ITS Improvements</option>
            <option value="6">Roadway Rehabilitation</option>
            <option value="7">Roadway New Capacity</option>
            <option value="8">Intersection/Interchange Improvements</option>
            <option value="9">Other</option>
          </select>
          <span className="vr" />
          <p>{projects ? projects.length : 0} results.</p>
        </div>
        {projects ? (
          projects.map(feature => (
            <Tile data={feature} key={feature.attributes.FID} />
          ))
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
    keywordProjects: state.getTIP.keyword,
    boundsProjects: state.getTIP.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: category => dispatch(setFilter(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TilesContainer);
