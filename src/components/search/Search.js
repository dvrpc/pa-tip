import Inferno, { Component } from "inferno";
import { withRouter } from "inferno-router";
import Autosuggest from "react-autosuggest";

import { connect } from "inferno-redux";
import { fetchTIPByKeywords } from "../reducers/getTIPInfo";

import "./search.css";

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <span style="color:#000">{suggestion.name}</span>
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

const transformKeywordSuggestions = data => ({
  title: "TIP Projects",
  results: data.features.slice(0, 3).map(project => ({
    name: `${project.attributes.MPMS_ID}: ${project.attributes.ROAD_NAME}`,
    id: `${project.attributes.MPMS_ID}`,
    type: "expanded"
  }))
});

class Search extends Component {
  constructor() {
    super();

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
            { lat: 39.514909, lng: -76.13659 },
            { lat: 40.608542, lng: -74.389531 }
          )
        },
        data => resolve(data)
      );
    });

  loadKeywordSuggestions = input => {
    console.log({ input });
    this.props.fetchTIPByKeywords(input);
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSelect = (event, { suggestion }) => {
    console.log({ ...suggestion });
    this.props.history.push(
      `/${suggestion.type}/${suggestion.id.replace(/\s/g, "_")}`
    );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.loadKeywordSuggestions(value);
    this.loadLocationSuggestions(value).then(locations => {
      if (locations !== null) {
        console.log("update locations");
        this.setState({ locations });
      }
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  componentWillReceiveProps({ keywordProjects }) {
    if (
      keywordProjects &&
      keywordProjects.hasOwnProperty("features") &&
      keywordProjects.features.length !==
        this.state.keywordProjects.features.length
    ) {
      console.log("new state", keywordProjects);
      this.setState({ keywordProjects });
    }
  }

  render() {
    console.log("render", this.state.keywordProjects, this.state.locations);
    const suggestions = [];
    const locations = transformLocationSuggestions(this.state.locations);
    const keywords = transformKeywordSuggestions(this.state.keywordProjects);
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

    if (locations.results.length) suggestions.push(locations);
    if (keywords.results.length) suggestions.push(keywords);
    suggestions.push(search);

    const inputProps = {
      placeholder: "Search by address or project keywords",
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
        inputProps={inputProps}
      />
    );
  }
}

const mapStateToProps = state => ({
  keywordProjects: state.getTIP.fetchedKeywords
});

const mapDispatchToProps = dispatch => ({
  fetchTIPByKeywords: keywords => dispatch(fetchTIPByKeywords(keywords))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
