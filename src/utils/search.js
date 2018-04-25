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

  const input = {
    query: instance.state.value,
    // Hardcoded to the entire region
    bounds
  };

  if (instance.state.selectedButton === "Place") {
    console.log("place hit ");
    geocoder.geocode(input, (results, status) => {
      if (status === "OK") {
        console.log("results are ", results);
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        instance.props.setMapCenter({ lng, lat });
      } else {
        console.log("Geocode failed because : ", status);
        // error handling, maybe?
      }
    });
  } else {
    console.log("not polace hit ");
    instance.props.getTIPByKeywords(input.query);
  }

  // at this point a valid search has been made and the proper endpoints have been hit
  // navigate to the results
  instance.props.history.push(`/main/${input.query}`);
};
