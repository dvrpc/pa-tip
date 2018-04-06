// util function to handle search input and find the corresponding TIP projects

const geocoder = new window.google.maps.Geocoder();

// once this is replaced w/the google maps geocoder, set Region Code Biasing
// to Pennsylvannia

export const search = (instance, e) => {
  e.preventDefault();

  // alternative: no input object, just a variable
  // on-the-fly check if the input exists in a) municipal, if not b) geocode, else c) keyword
  // look into type-ahead solutions (bloodhound)

  // GEO data from keyword - need to make another call w/the object ID's to the open data portal
  // to get all the lat/lng stuff (the arcGIS feature service garbage)

  const input = {
    address: e.target.querySelector("input").value
  };
  const options = {
    types: ["(cities)"],
    componentRestrictions: { country: "us" }
  };

  // this isn't doing anything...
  const autocomplete = new window.google.maps.places.Autocomplete(
    e.target.querySelector("input"),
    options
  );

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
        instance.props.getTIPByKeywords(input.value);
      }
    });
    // at this point a valid search has been made and the proper endpoints have been hit
    // navigate to the results
    instance.props.history.push(`/main/${input.address}`);
  } else {
    // error handling for invalid inputs
  }
};
