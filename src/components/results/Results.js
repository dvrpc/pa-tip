import React, { Component } from "react";
import { connect } from "react-redux";

import "./Results.css";

import Tile from "../tiles/Tiles.js";
import ListItem from "../listItems/listItem.js";
import { setFilter } from "../../redux/reducers/getTIPInfo.js";

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtered: false,
      categoryToFilter: "",
      showList: true
    };
  }

  componentDidMount() {
    let { category } = this.props;
    if (typeof category === "undefined") {
      category = "All Categories";
    }
    if (category !== "All Categories") {
      this.setState({
        filtered: true,
        categoryToFilter: category
      });
    }
  }

  showList = e => {
    // update active-toggle class
    if (!e.target.classList.contains("active-toggle")) {
      e.target.classList.toggle("active-toggle");
      e.target.nextElementSibling.classList.toggle("active-toggle");
    }

    // flip the bool to show tiles
    this.setState({ showList: true });
  };

  showTiles = e => {
    // update active-toggle class
    if (!e.target.classList.contains("active-toggle")) {
      e.target.classList.toggle("active-toggle");
      e.target.previousElementSibling.classList.toggle("active-toggle");
    }

    // flip the bool to show tiles
    this.setState({ showList: false });
  };

  filterByCategory = e => {
    // get a handle on the selected option
    const selector = this.categorySelector;
    const categoryToFilter = selector.options[selector.selectedIndex].text;

    // apply or remove filter depending on the selected option
    if (categoryToFilter === "All Categories") {
      this.setState({ filtered: false });
    } else {
      this.setState({
        filtered: true,
        categoryToFilter
      });
    }
    this.props.setFilter(categoryToFilter);
  };

  render() {
    let projects =
      this.props.projects && this.props.projects.features
        ? this.props.projects.features
        : [];

    // determine whether to display all projects, or filtered projects
    if (this.state.filtered) {
      projects = projects.filter(
        project => project.DESCRIPTIO === this.state.categoryToFilter
      );
    }

    return (
      <div id="results">
        <div className="header">
          <select
            id="selectedCategory"
            name="category"
            onChange={e => this.filterByCategory(e)}
            ref={e => (this.categorySelector = e)}
            value={this.props.category}
            defaultValue="All Categories"
          >
            <option value="All Categories">All Categories</option>
            <option
              style={{ color: "#f26522" }}
              value="Bicycle/Pedestrian Improvement"
            >
              Bicycle/Pedestrian Improvement
            </option>
            <option
              style={{ color: "#223860" }}
              value="Bridge Repair/Replacement"
            >
              Bridge Repair/Replacement
            </option>
            <option style={{ color: "#0b6d32" }} value="Streetscape">
              Streetscape
            </option>
            <option style={{ color: "#729faa" }} value="Transit Improvements">
              Transit Improvements
            </option>
            <option
              style={{ color: "#ed1c24" }}
              value="Signal/ITS Improvements"
            >
              Signal/ITS Improvements
            </option>
            <option style={{ color: "#511851" }} value="Roadway Rehabilitation">
              Roadway Rehabilitation
            </option>
            <option style={{ color: "#9d1d20" }} value="Roadway New Capacity">
              Roadway New Capacity
            </option>
            <option
              style={{ color: "#ffc10e" }}
              value="Intersection/Interchange Improvements"
            >
              Intersection/Interchange Improvements
            </option>
            <option style={{ color: "#5abf41" }} value="Other">
              Other
            </option>
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

        {projects.length ? (
          this.state.showList ? (
            projects.map(feature => (
              <ListItem
                data={feature.properties || feature}
                key={feature.mapbox_id}
                length={projects.length}
              />
            ))
          ) : (
            <div id="tiles-wrapper">
              {projects.map(feature => (
                <Tile
                  data={feature.properties || feature}
                  key={feature.mapbox_id}
                />
              ))}
            </div>
          )
        ) : (
          <p id="noResults">
            Sorry! No projects matched your search criteria. Please try again or
            contact Rick Murphy at rmurphy@dvrpc.org. <br /> Thank you for using
            the Draft DVRPC FY2020 TIP for PA.
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.getTIP.projects,
    category: state.getTIP.category
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFilter: filter => dispatch(setFilter(filter))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Results);
