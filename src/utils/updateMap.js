import mapboxgl from "mapbox-gl";

export const updateBounds = mapReference => {
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
};

export const keywordBounds = (mapReference, data) => {
  var bounds = {};
  let latitude = "";
  let longitude = "";

  for (var i = 0; i < data.features.length; i++) {
    longitude = data.features[i].attributes.LNG;
    latitude = data.features[i].attributes.LAT;
    bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
    bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
    bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
    bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
  }

  mapReference.map.fitBounds([
    [bounds.xMin, bounds.yMin],
    [bounds.xMax, bounds.yMax]
  ]);
};
