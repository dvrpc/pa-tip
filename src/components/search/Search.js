import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";

import { connect } from "react-redux";
import {
  searchTIPByKeywords,
  clearKeywords
} from "../../redux/reducers/getTIPInfo";
import {
  getCongressionalDistrict,
  getSenateDistrict,
  getHouseDistrict
} from "../../redux/reducers/congressionalReducer";

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

const transformDistrictSuggestions = (data, type) => {
  let options;

  if (data?.features?.length) {
    options = data.features.map(({ properties }) => ({
      label: `District ${properties.leg_distri} - ${
        properties[`${type[0]}_firstnam`]
      } ${properties[`${type[0]}_lastname`]} (${properties.party})`,
      value: properties.leg_distri + "",
      type
    }));
  } else {
    options = [];
  }
  return options;
};

const transformCongressionalSuggestions = data => {
  return {
    label: "Congressional Districts",
    options: transformDistrictSuggestions(data, "congressional")
  };
};

const transformSenateSuggestions = data => {
  return {
    label: "PA Senate Districts",
    options: transformDistrictSuggestions(data, "senate")
  };
};

const transformHouseSuggestions = data => {
  return {
    label: "PA House Districts",
    options: transformDistrictSuggestions(data, "house")
  };
};

// @TODO: change default text from Select to Seach for TIP Projects
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.Autocomplete = {};
  }

  // @TODO: replace with mapboxgl
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

  loadDistrictSuggestions = input => {
    this.setState({ districts: this.props.getCongressionalDistrict(input) });
  };

  loadSenateSuggestions = input => {
    this.setState({ senate: this.props.getSenateDistrict(input) });
  };

  loadHouseSuggestions = input => {
    this.setState({ house: this.props.getHouseDistrict(input) });
  };

  onChange = newValue => {
    if (!newValue) return;

    this.setState({ value: newValue });
    this.loadKeywordSuggestions(newValue);
    // @TODO: replace with mapboxgl geocoder
    this.loadLocationSuggestions(newValue).then(locations => {
      if (locations !== null) {
        this.setState({ locations });
      }
    });
    this.loadDistrictSuggestions(newValue);
    this.loadSenateSuggestions(newValue);
    this.loadHouseSuggestions(newValue);
  };

  onSelect = suggestion => {
    const newType = suggestion.type;
    const newValue = suggestion.value.replace(/\s/g, "_");

    // clear keyword projects from store
    this.props.clearKeywords();

    // let routing handle data
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
    const districts = transformCongressionalSuggestions(this.props.districts);
    const senate = transformSenateSuggestions(this.props.senate);
    const house = transformHouseSuggestions(this.props.house);

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

    if (this.props.history.location.pathname === "/") {
      suggestions.push(districts);
      suggestions.push(senate);
      suggestions.push(house);
    }

    // because google wont let you limit results to > 5
    locations.options = locations.options.slice(0, 2);
    suggestions.push(locations);

    return (
      <Select
        placeholder={
          <span>Search TIP by Project, Keywords, Fund or Address</span>
        }
        options={suggestions}
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
  keywordProjects: state.getTIP.fetchedKeywords,
  districts: state.getDistricts.congressional,
  senate: state.getDistricts.senate,
  house: state.getDistricts.house
});

const mapDispatchToProps = dispatch => ({
  searchTIPByKeywords: keywords => dispatch(searchTIPByKeywords(keywords)),
  clearKeywords: () => dispatch(clearKeywords()),
  getCongressionalDistrict: keywords =>
    dispatch(getCongressionalDistrict(keywords)),
  getSenateDistrict: keywords => dispatch(getSenateDistrict(keywords)),
  getHouseDistrict: keywords => dispatch(getHouseDistrict(keywords))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
