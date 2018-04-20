// util function to handle search input and find the corresponding TIP projects

const geocoder = new window.google.maps.Geocoder();
const bounds = new window.google.maps.LatLngBounds(
  { lat: 39.514909, lng: -76.13659 },
  { lat: 40.608542, lng: -74.389531 }
);

export const generateAutocomplete = (element, callback) => {
  new window.google.maps.places.Autocomplete(element, {
    bounds,
    strictBounds: true
  }).addListener("place_changed", callback);
};

export const search = (instance, e) => {
  e.preventDefault();

  // alternative: no input object, just a variable
  // on-the-fly check if the input exists in a) municipal, if not b) geocode, else c) keyword
  // look into type-ahead solutions (bloodhound)

  // GEO data from keyword - need to make another call w/the object ID's to the open data portal
  // to get all the lat/lng stuff (the arcGIS feature service garbage)

  const input = {
    address: instance.state.value,
    // Hardcoded to the entire region
    bounds
  };

  // TODO: input validation
  let validAddress = true;

  if (validAddress) {
    geocoder.geocode(input, (results, status) => {
      if (status == "OK") {
        // IF I can't limit the results to PA from google, I'll have to sort through results here
        // search through address results
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        // TODO: validation. Check that lat & lng exist befoe pushing
        instance.props.setMapCenter({ lng, lat });
      } else {
        console.log("Geocode failed because : ", status);

        // if geocode failed & the address is valid, fall back to keyword search
        console.log("is input.value truthy ", input.value);
        if (input.value) {
          console.log(
            "hitting the get tip by keywords endoint with a truthy value of ",
            input.value
          );
          instance.props.getTIPByKeywords(input.value);
        }
      }
    });
    // at this point a valid search has been made and the proper endpoints have been hit
    // navigate to the results
    instance.props.history.push(`/main/${input.address}`);
  } else {
    // error handling for invalid inputs
  }
};
