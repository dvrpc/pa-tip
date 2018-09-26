export const showMarker = resultItem => {
  // @ TODO: once updateMap gets merged into master, change the way this is accessed
  console.log(resultItem);
  const id = resultItem.props.data.attributes.OBJECTID;

  // put the id in the store

  // in map.js, listen for that variable and activate a marker popup if it gets triggered
};
