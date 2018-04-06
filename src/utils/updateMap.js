import mapboxgl from "mapbox-gl";

import other from "./markers/other.svg";
import bicycle_pedestrian_improvement from "./markers/bicycle_pedestrian_improvement.svg";
import signal_its_improvements from "./markers/signal_its_improvements.svg";
import streetscape from "./markers/streetscape.svg";
import transit_improvement from "./markers/transit_improvement.svg";
import roadway_rehabilitation from "./markers/roadway_rehabilitation.svg";
import roadway_new_capacity from "./markers/roadway_new_capacity.svg";
import intersection_improvements from "./markers/intersection_improvements.svg";
import bridge_replacement from "./markers/bridge_replacement.svg";

// object to access the marker SVG's by project category
const markers = {
  "Bridge Replacement": bridge_replacement.svg,
  "Bicycle/Pedestrian Improvement": bicycle_pedestrian_improvement.svg,
  "Signal/ITS Improvement": signal_its_improvements.svg,
  Streetscape: streetscape.svg,
  "Transit Improvement": transit_improvement.svg,
  "Roadway Rehabilitation": roadway_rehabilitation.svg,
  "Roadway New Capacity": roadway_new_capacity.svg,
  "Intersection Improvements": intersection_improvements.svg,
  Other: other.svg
};

export const updateBounds = mapReference => {
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
};

export const updateMarkers = mapReference => {
  console.log("mapReference at updateMarkers ", mapReference);

  // sometimes it's undefined (race condition?)
  let projects = mapReference.props.projects
    ? mapReference.props.projects.features
    : false;

  projects &&
    projects.forEach(project => {
      // lag = geometry.y, lng = geometry.x
      let coords = [project.geometry.x, project.geometry.y];

      // get the project category in order to select the appropriate marker
      const category = project.attributes.DESCRIPTIO;

      // match the category to the appropriate marker
      const svgMarker = markers.category;

      // add the marker to the map
      const marker = new mapboxgl.Marker()
        .setLngLat(coords)
        .addTo(mapReference.map);
    });
};
