import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";

import { connect } from "react-redux";
import {
  fetchTIPByKeywords,
  getFullTIP,
  hydrateGeometry
} from "../reducers/getTIPInfo";

const formatGroupLabel = section => <strong>{section.label}</strong>;

const transformLocationSuggestions = data => ({
  label: "Location",
  options: data.map(location => ({
    label: location.description,
    value: location.place_id,
    type: "location"
  }))
});

const transformKeywordSuggestions = data => ({
  label: "TIP Projects",
  options: data.features.slice(0, 5).map(project => ({
    label: `${project.properties.DBNUM}: ${project.properties.PROJECTNAM}`,
    value: `${project.properties.DBNUM}`,
    type: "expanded"
  }))
});

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      keywordProjects: { features: [] },
      locations: []
    };

    this.Autocomplete = new window.google.maps.places.AutocompleteService();
  }

  loadLocationSuggestions = input =>
    new Promise(resolve => {
      this.Autocomplete.getQueryPredictions(
        {
          input,
          bounds: new window.google.maps.LatLngBounds(
            { lat: 39.513289, lng: -75.433101 },
            { lat: 40.423627, lng: -74.383175 }
          )
        },
        data => resolve(data)
      );
    });

  loadKeywordSuggestions = input => {
    this.props.fetchTIPByKeywords(input);
  };

  onChange = newValue => {
    this.setState({ value: newValue });
    this.loadKeywordSuggestions(newValue);
    this.loadLocationSuggestions(newValue).then(locations => {
      if (locations !== null) {
        this.setState({ locations });
      }
    });
  };

  onSelect = suggestion => {
    console.log("selected: ", suggestion);
    let oldPath = this.props.history.location.pathname.split("/")[1];
    let newPath = suggestion.type;

    this.props.history.push(
      `/${suggestion.type}/${suggestion.value.replace(/\s/g, "_")}`
    );

    if (oldPath === "expanded" && newPath === "expanded") {
      let id = this.props.history.location.pathname.split("/")[2];
      this.props.getFullTIP(id);
      this.props.hydrateGeometry(id);
    }
  };

  static getDerivedStateFromProps({ keywordProjects }, state) {
    if (
      keywordProjects &&
      keywordProjects.hasOwnProperty("features") &&
      keywordProjects.features.length !== state.keywordProjects.features.length
    ) {
      return { keywordProjects };
    }
    return null;
  }

  render() {
    const suggestions = [];
    const locations = transformLocationSuggestions(this.state.locations);
    const keywords = transformKeywordSuggestions(this.state.keywordProjects);
    const search = {
      label: "Keyword",
      options: [
        {
          label: this.state.value,
          value: this.state.value,
          type: "keyword"
        }
      ]
    };
    suggestions.push(search);

    if (keywords.options.length) {
      suggestions.push(keywords);
    }

    if (locations.options.length) {
      // because google wont let you limit results to > 5
      locations.options = locations.options.slice(0, 2);
      suggestions.push(locations);
    }

    return (
      <Select
        options={suggestions}
        formatGroupLabel={formatGroupLabel}
        onInputChange={this.onChange}
        onChange={(value, { action }) => {
          action === "select-option" && this.onSelect(value);
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  keywordProjects: state.getTIP.fetchedKeywords
});

const mapDispatchToProps = dispatch => ({
  fetchTIPByKeywords: keywords => dispatch(fetchTIPByKeywords(keywords)),
  getFullTIP: id => dispatch(getFullTIP(id)),
  hydrateGeometry: id => dispatch(hydrateGeometry(id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
