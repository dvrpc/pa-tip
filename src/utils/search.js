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
    type: "address"
  };
  let validAddress = true;

  if (validAddress) {
    if (input.type === "municipal boundary") {
      // get tip by municipal boundaries
      // TBD on updating the map cause the JSON municipals might already have the jawns jawned out
    } else if (input.type === "address") {
      // geocode address to get the lat/long of it
      geocoder.geocode(input.value, (err, data) => {
        console.log("data is ", data);
        // TODO: error handling
        const northeast = data.results[0].geometry.bounds.northeast;
        const southwest = data.results[0].geometry.bounds.southwest;
        instance.props.setMapCenter([northeast, southwest]);
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
