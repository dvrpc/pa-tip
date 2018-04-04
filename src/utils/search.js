import geocoder from "geocoder";

export const search = (instance, e) => {
  e.preventDefault();

  // alternative: no input object, just a variable
  // on-the-fly check if the input exists in a) municipal, if not b) geocode, else c) keyword
  // look into type-ahead solutions (bloodhound)

  // GEO data from keyword - need to make another call w/the object ID's to the open data portal
  // to get all the lat/lng stuff (the arcGIS feature service garbage)

  // TODO: look into limiting the response area of the geocoder - set the bounds to PA

  const input = {
    value: e.target.querySelector("input").value,
    // TODO: find a way to dynamically judge and replace the type of input
    type: "geocode"
  };

  // TODO: input validation
  let validAddress = true;

  if (validAddress) {
    // get projects by municipal boundaries
    if (input.type === "municipal boundary") {
      // geocode geocode to get the lat/long of it
    } else if (input.type === "geocode") {
      geocoder.geocode(input.value, (err, data) => {
        console.log("data at search geocode is ", data);
        if (data.results) {
          console.log("what is data ", data);
          instance.props.setMapCenter(data.results[0].geometry.location);
        } else {
          // TODO: error handling
          // Dispatch some kind of `no results for ${input.value} found` render
          alert("geocoding error");
        }
      });
    } else {
      instance.props.getTIPByKeywords(input.value);
    }

    // TODO: validate the search input BEFORE pushing to history
    instance.props.history.push(`/main/${input.value}`);
  } else {
    // do something to prompt re-entry from a user
  }
};
