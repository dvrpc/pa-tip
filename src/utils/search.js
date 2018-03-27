import geocoder from "geocoder";

export const search = (instance, e) => {
  e.preventDefault();
  const input = {
    value: e.target.querySelector("input").value,
    // TODO: find a way to dynamically judge and replace the type of input
    type: "test"
  };

  // TODO: input validation
  let validAddress = true;

  if (validAddress) {
    // get projects by municipal boundaries
    if (input.type === "municipal boundary") {
      // geocode address to get the lat/long of it
    } else if (input.type === "address") {
      geocoder.geocode(input.value, (err, data) => {
        // TODO: error handling
        instance.props.setMapCenter(data.results[0].geometry.location);
      });
    } else {
      instance.props.getTIPByKeywords(input.value);
      // TODO: a way to update the map and get co-ordinate data from keyword search otherwise
      // it's pretty much useless. Unless it can get folded into the 'municipal boundary' search
    }

    // TODO: validate the search input BEFORE pushing to history
    instance.props.history.push(`/main/${input.value}`);
  } else {
    // do something to prompt re-entry from a user
  }
};
