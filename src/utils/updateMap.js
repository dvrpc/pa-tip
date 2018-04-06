import mapboxgl from "mapbox-gl";

import other from "./markers/other.svg";
// TODO: import all of the SVG's as an object, with the keys set to the category names
// this allows the updateMArkers function to get the right marker by just doing markers.category

// something like this:
/* const markers = {
    "Bridge Replacement": bridgeReplacement.svg,
    "Signal ITS Improvement": signalITSImprove.svg,
    etc
}
*/

export const updateBounds = mapReference => {
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
};

export const updateMarkers = mapReference => {
  // the risk with didUpdate is the infinite loop, but I can solve that by adding an if(newBounds === oldBounds) dontDoAnything, check
  console.log("mapReference at updateMarkers ", mapReference);
  let projects = mapReference.props.projects;

  projects.forEach(project => {
    console.log("project is ", project);
    let coords = [project.lng, project.lat];

    // get the project category in order to select the appropriate marker
    // const category = project.category

    // match the category to the appropriate marker
    // const svgMarker = markers.category
    const marker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(mapReference.map);
  });
};
