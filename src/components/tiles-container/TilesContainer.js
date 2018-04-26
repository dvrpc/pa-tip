import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./TilesContainer.css";
import Tile from "../tiles/Tiles.js";
import Footer from "../footer/Footer.js";
import loading from "./loading.gif";
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

    // soon keyword projects and bounds projects will have the exact same properties...
    // handle keyword and bounds projects concurrently
    let keywordProjects = this.props.keywordProjects || [];
    let boundsProjects =
      this.props.boundsProjects && this.props.boundsProjects.features
        ? this.props.boundsProjects.features
        : [];

    // determine whether to display all projects, or filtered projects
    if (this.state.filtered) {
      projects = keywordProjects.concat(boundsProjects).filter(project => {
        // handle bounds projects
        if (project.attributes)
          return project.attributes.DESCRIPTIO === this.state.categoryToFilter;
        else {
          // handle keyword projects
          return project.category === this.state.categoryToFilter;
        }
      });

      // display all projects when no filter is selected
    } else {
      projects = keywordProjects.concat(boundsProjects);
    }

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
            <Tile
              data={feature}
              key={feature.id || feature.attributes.OBJECTID}
            />
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

export default connect(mapStateToProps, null)(TilesContainer);
