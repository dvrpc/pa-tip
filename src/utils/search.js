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

  // @TODO - not sure if this is the best place to reset category from homepage
  instance.context.store.getState().getTIP.category = "All Categories";

  console.log("instance value ", instance.state.value);

  const input = {
    address: instance.state.value,
    // Hardcoded to the entire region
    bounds
  };

  if (instance.state.selectedButton === "Place") {
    // clear keyword projects from memory
    instance.context.store.getState().getTIP.keyword = [];

    geocoder.geocode(input, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();

        instance.props.setMapCenter({ lng, lat });
      } else {
        console.log("Geocode failed because : ", status);
      }
    });
  } else {
    instance.context.store.getState().getTIP.bounds = [];
    instance.props.getTIPByKeywords(input.address);
  }

  // at this point a valid search has been made and the proper endpoints have been hit
  // navigate to the results
  instance.props.history.push(`/main/${input.address}`);
};
