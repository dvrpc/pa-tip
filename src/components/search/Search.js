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
      type: "Project"
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

    this.Autocomplete = {};
  }

  // @TODO: replace with mapboxgl geocoder
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
    if (!newValue) return;

    this.setState({ value: newValue });
    this.loadKeywordSuggestions(newValue);
    this.loadLocationSuggestions(newValue).then(locations => {
      if (locations !== null) {
        this.setState({ locations });
      }
    });
  };

  onSelect = suggestion => {
    const newType = suggestion.type;
    const newValue = suggestion.value.replace(/\s/g, "_");

    // clear keyword projects from store
    this.props.clearKeywords();

    // let routing handle data
    // @TODO routing is not handling the data. Keywords are never making a call (but the rest fires so it loops over empty response and shows nothing)
    this.props.history.push(`/${newType}/${newValue}`);
  };

  componentDidMount() {
    this.Autocomplete = new window.google.maps.places.AutocompleteService(
      this.search
    );
  }

  render() {
    const suggestions = [];
    const locations = transformLocationSuggestions(this.state.locations);
    const projects = transformKeywordSuggestions(this.props.keywordProjects);

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

    const fund = {
      label: "Fund",
      options: [
        {
          label: this.state.value,
          value: this.state.value,
          type: "keyword"
        }
      ]
    };

    suggestions.push(search);
    suggestions.push(projects);
    suggestions.push(fund);

    // because google wont let you limit results to > 5
    locations.options = locations.options.slice(0, 2);
    suggestions.push(locations);

    return (
      <Select
        placeholder={
          <span>Search TIP by Project, Keywords, Fund or Address</span>
        }
        options={suggestions}
        defaultValue={"bruh"}
        formatGroupLabel={formatGroupLabel}
        onInputChange={this.onChange}
        onChange={(value, { action }) => {
          action === "select-option" && this.onSelect(value);
        }}
        ref={el => (this.search = el)}
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
