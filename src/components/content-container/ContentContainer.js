import React, { Component } from "react";

import "./ContentContainer.css";

import firstFrame from "../homepage/firstFrame.jpg";

import Project from "../project/Project.js";
import Footer from "../footer/Footer.js";

class ContentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProject: false,
      params: this.props.match.params,
      mpms: null
    };
  }

  componentDidMount() {
    let { type, value } = this.state.params;
    type = type.toLowerCase();

    // determine if a project or results should be rendered
    if (type === "project") {
      this.setState({
        isProject: true,
        mpms: value
      });
    } else {
      this.setState({ isProject: false });
    }
  }

  render() {
    return (
      <div className="contentContainer">
        {this.state.isProject ? (
          <Project mpms={this.state.mpms} history={this.props.history} />
        ) : (
          <section
            id="hideResults"
            style={{ backgroundImage: `url(${firstFrame})` }}
          >
            <div>Please select a project to view more details.</div>
          </section>
        )}
        <Footer />
      </div>
    );
  }
}

export default ContentContainer;
