import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./TilesContainer.css";
import Tile from "../tiles/Tiles.js";
import ListItem from "../listItems/listItem.js";
import Footer from "../footer/Footer.js";
import loading from "./loading.gif";
import { setFilter } from "../reducers/getTIPInfo.js";
import { filterByCategory } from "../../utils/filterByCategory.js";

class TilesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: false,
      categoryToFilter: "",
      showList: true
    };
  }

  componentDidMount() {
    if (typeof this.props.category === "undefined")
      this.props.category = "All Categories";

    if (this.props.category !== "All Categories") {
      this.setState({
        filtered: true,
        categoryToFilter: this.props.category
      });
    }
  }

  showList = e => {
    // flip the bool to show tiles
    this.setState({ showList: true });

    // update active-toggle class
    if (!e.target.classList.contains("active-toggle")) {
      e.target.classList.toggle("active-toggle");
      e.target.nextElementSibling.classList.toggle("active-toggle");
    }
  };

  showTiles = e => {
    // flip the bool to show tiles
    this.setState({ showList: false });

    // update active-toggle class
    if (!e.target.classList.contains("active-toggle")) {
      e.target.classList.toggle("active-toggle");
      e.target.previousElementSibling.classList.toggle("active-toggle");
    }
  };

  render() {
    // handle keyword and bounds projects
    let keywordProjects =
      this.props.keywordProjects && this.props.keywordProjects.features
        ? this.props.keywordProjects.features
        : [];
    let boundsProjects =
      this.props.boundsProjects && this.props.boundsProjects.features
        ? this.props.boundsProjects.features
        : [];

    let projects = keywordProjects.length ? keywordProjects : boundsProjects;

    // determine whether to display all projects, or filtered projects
    if (this.state.filtered) {
      projects = projects.filter(
        project => project.DESCRIPTIO === this.state.categoryToFilter
      );
    }

    return (
      <div className="tilesContainer">
        <div className="header">
          <select
            id="selectedCategory"
            name="category"
            onChange={linkEvent(this, filterByCategory)}
            ref={e => (this.categorySelector = e)}
            value={this.props.category}
          >
            <option selected value="All Categories">
              All Categories
            </option>
            <option value="Bicycle/Pedestrian Improvement">
              Bicycle/Pedestrian Improvement
            </option>
            <option value="Bridge Repair/Replacement">
              Bridge Repair/Replacement
            </option>
            <option value="Streetscape">Streetscape</option>
            <option value="Transit Improvements">Transit Improvements</option>
            <option value="Signal/ITS Improvements">
              Signal/ITS Improvements
            </option>
            <option value="Roadway Rehabilitation">
              Roadway Rehabilitation
            </option>
            <option value="Roadway New Capacity">Roadway New Capacity</option>
            <option value="Intersection/Interchange Improvements">
              Intersection/Interchange Improvements
            </option>
            <option value="Other">Other</option>
          </select>

          <span className="vr" />

          <h2 className="numOfResults">
            {projects ? projects.length : 0} results.
          </h2>

          <span className="vr" />

          <span className="results-toggle">
            <h2 onClick={this.showList} className="active-toggle">
              List
            </h2>
            /<h2 onClick={this.showTiles}>Tiles</h2>
          </span>
        </div>
        {projects ? (
          this.state.showList ? (
            projects.map(feature => (
              <ListItem
                data={feature.properties || feature}
                key={feature.mapbox_id}
                length={projects.length}
              />
            ))
          ) : (
            projects.map(feature => (
              <Tile
                data={feature.properties || feature}
                key={feature.mapbox_id}
              />
            ))
          )
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
    boundsProjects: state.getTIP.projects,
    category: state.getTIP.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: category => dispatch(setFilter(category))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TilesContainer);
