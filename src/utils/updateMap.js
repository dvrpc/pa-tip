import mapboxgl from "mapbox-gl";

export const updateBounds = mapReference => {
  mapReference.props.setMapState({
    center: mapReference.map.getCenter(),
    zoom: mapReference.map.getZoom()
  });

  if (
    mapReference.props.keywordProjects &&
    mapReference.props.keywordProjects.features
  ) {
    return;
  }
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
};

export const keywordBounds = (mapReference, data) => {
  const projects = data || mapReference.props.keywordProjects;
  var bounds = {};
  let latitude = "";
  let longitude = "";
  let ids = projects.features.map(feature => feature.attributes.MPMS_ID);

  if (projects.features && projects.features.length) {
    for (var i = 0; i < projects.features.length; i++) {
      longitude = projects.features[i].attributes.LNG;
      latitude = projects.features[i].attributes.LAG;
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    }

    mapReference.map.fitBounds(
      [[bounds.xMin, bounds.yMin], [bounds.xMax, bounds.yMax]],
      { padding: 20 }
    );

    return ["in", "MPMS_ID"].concat(ids);
  }
  return ["!=", "MPMS_ID", ""];
};
