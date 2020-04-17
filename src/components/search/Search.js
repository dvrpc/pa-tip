import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";

import { connect } from "react-redux";
import {
  searchTIPByKeywords,
  clearKeywords
} from "../../redux/reducers/getTIPInfo";

const formatGroupLabel = section => <strong>{section.label}</strong>;

const transformLocationSuggestions = data => {
  let options;
  if (data) {
    options = data.map(location => ({
      label: location.description,
      value: location.place_id,
      type: "location"
    }));
  } else {
    options = [];
  }

  return {
    label: "Location",
    options
  };
};

const transformKeywordSuggestions = data => {
  let options;

  if (data) {
    options = data.map(project => ({
      label: `${project.id}: ${project.name}`,
      value: `${project.id}`,
      type: "expanded"
    }));
  } else {
    options = [];
  }

  return {
    label: "TIP Projects",
    options
  };
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
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
    this.props.searchTIPByKeywords(input);
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
    let newType = suggestion.type;

    // clear keyword projects from store for non-keyword searches
    if (newType !== "keyword") this.props.clearKeywords();

    // let routing handle data
    this.props.history.push(
      `/${newType}/${suggestion.value.replace(/\s/g, "_")}`
    );
  };

  render() {
    const suggestions = [];
    const locations = transformLocationSuggestions(this.state.locations);
    const keywords = transformKeywordSuggestions(this.props.keywordProjects);

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
    suggestions.push(keywords);

    // because google wont let you limit results to > 5
    locations.options = locations.options.slice(0, 2);
    suggestions.push(locations);

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
  searchTIPByKeywords: keywords => dispatch(searchTIPByKeywords(keywords)),
  clearKeywords: () => dispatch(clearKeywords())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
