import Inferno, { Component } from "inferno";
import { withRouter } from "inferno-router";
import Autosuggest from "react-autosuggest";

import { connect } from "inferno-redux";
import {
  searchTIPByKeywords,
  getFullTIP,
  hydrateGeometry
} from "../reducers/getTIPInfo";

import "./search.css";

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <span style={{ color: "#000" }}>{suggestion.name}</span>
);

const renderSectionTitle = section => <strong>{section.title}</strong>;

const getSectionSuggestions = section => section.results;

const transformLocationSuggestions = data => ({
  title: "Location",
  results: data.map(location => ({
    name: location.description,
    id: location.place_id,
    type: "location"
  }))
});

const transformKeywordSuggestions = data => {
  return {
    title: "TIP Projects",
    results: data
  };
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      TIPProjects: [],
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
            { lat: 39.514909, lng: -76.13659 },
            { lat: 40.608542, lng: -74.389531 }
          )
        },
        data => resolve(data)
      );
    });

  loadKeywordSuggestions = input => {
    this.props.searchTIPByKeywords(input);
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSelect = (event, { suggestion }) => {
    let oldPath = this.props.history.location.pathname.split("/")[1];
    let newPath = suggestion.type;

    this.props.history.push(`/${suggestion.type}/${suggestion.id}`);

    if (oldPath === "expanded" && newPath === "expanded") {
      let id = this.props.history.location.pathname.split("/")[2];
      this.props.getFullTIP(id);
      this.props.hydrateGeometry(id);
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.loadKeywordSuggestions(value);
    this.loadLocationSuggestions(value).then(locations => {
      if (locations !== null) {
        this.setState({ locations });
      }
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentWillReceiveProps({ TIPProjects }) {
    if (typeof TIPProjects !== "STRING") {
      this.setState({ TIPProjects });
    }
  }

  render() {
    const suggestions = [];
    const locations = transformLocationSuggestions(this.state.locations);
    const projects = transformKeywordSuggestions(this.state.TIPProjects);

    const search = {
      title: "Keyword",
      results: [
        {
          name: this.state.value,
          id: this.state.value,
          type: "keyword"
        }
      ]
    };

    // add text input to Keywords header
    suggestions.push(search);

    // add fetched projects to TIP Projects header (if applicable)
    if (projects) suggestions.push(projects);

    // add geolocated areas to Locations header (if applicable)
    if (locations.results.length) {
      // because google wont let you limit results to > 5
      locations.results = locations.results.slice(0, 2);
      suggestions.push(locations);
    }

    const inputProps = {
      placeholder: "Search by address or keywords",
      value: this.state.value,
      onChange: this.onChange,
      id: "homepage-search-bar"
    };

    return (
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionSelected={this.onSelect}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        highlightFirstSuggestion={true}
        inputProps={inputProps}
      />
    );
  }
}

const mapStateToProps = state => ({
  TIPProjects: state.getTIP.fetchedKeywords
});

const mapDispatchToProps = dispatch => ({
  searchTIPByKeywords: keywords => dispatch(searchTIPByKeywords(keywords)),
  getFullTIP: id => dispatch(getFullTIP(id)),
  hydrateGeometry: id => dispatch(hydrateGeometry(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
