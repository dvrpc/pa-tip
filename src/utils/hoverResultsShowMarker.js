export const showMarker = resultItem => {
  // @ TODO: once updateMap gets merged into master, change the way this is accessed
  const markerInfo = resultItem.props.data;

  // pass markerInfo to the store

  // have map.js subscribe to the event that updates the store w/mapMarker info
  // on willReceiveProps, create a new popup with all that information

  // in map.js, listen for that variable and activate a marker popup if it gets triggered
};
