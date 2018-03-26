import geocoder from "geocoder";

export const search = (instance, e) => {
  e.preventDefault();
  const input = {
    value: e.target.querySelector("input").value,
    // TODO: find a way to dynamically judge and replace the type of input
    /*
      option 1:
      standardize the input & compare it to the municipal dictionary. if it's in there, input.type = municipal
      if it's not in the municipal dictionary, input.type = geocode and then:
        if error in geocoding, run the keyword API call
        if success, call the address geocode jawnnnnn
    */
    // using LIST search API for now to implement the expanded.js styles
    type: "address"
  };

  let validAddress = true;

  if (validAddress) {
    // get projects by municipal boundaries
    if (input.type === "municipal boundary") {
      // geocode address to get the lat/long of it
    } else if (input.type === "address") {
      geocoder.geocode(input.value, (err, data) => {
        // TODO: error handling
        const northeast = data.results[0].geometry.bounds.northeast;
        const southwest = data.results[0].geometry.bounds.southwest;
        instance.props.setMapCenter([northeast, southwest]);
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
