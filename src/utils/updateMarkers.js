import mapboxgl from "mapbox-gl";

export const updateMarkers = (mapReference, projects) => {
  // TODO: create a utils function that
  // a) fetches TIP projects by bounds
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
  // b) once the TIP projects are fetched, map through and drops markers from those TIP projects.
  const marker = new mapboxgl.Marker()
    .setLngLat(projects)
    .addTo(mapReference.map);
  // extra steps: check project category to add the correct svg marker

  //^ the above hard coded test stuff should be refactored into a util function that can be invoked on didMount
  // and on didUpdate
  // the risk with didUpdate is the infinite loop, but I can solve that by adding an if(newBounds === oldBounds) dontDoAnything, check
};
