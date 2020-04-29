import React, { Component } from "react";
import { connect } from "react-redux";

import "./TilesContainer.css";

import Project from "../project/Project.js";
import Results from "../results/Results.js";
import Footer from "../footer/Footer.js";

class TilesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProject: true,
      params: this.props.match.params,
      mpms: null
    };
  }

  componentDidMount() {
    let { type, value } = this.state.params;
    type = type.toLowerCase();

    // show project
    if (type === "project") {
      this.setState({
        isProject: true,
        mpms: value
      });
    } else {
      // show results
      this.setState({ isProject: false });
    }
  }

  render() {
    return (
      <div className="tilesContainer">
        {this.state.isProject ? (
          <Project mpms={this.state.mpms} />
        ) : (
          <Results />
        )}
        <Footer />
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

export default connect(mapStateToProps, null)(TilesContainer);
