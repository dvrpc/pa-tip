import mapboxgl from "mapbox-gl";
import { createVNode } from "inferno";
import { VNodeFlags } from "inferno-vnode-flags";

import { colors } from "./tileGeometryColorType.js";

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
  Other: other,
  "Bicycle/Pedestrian Improvement": bicycle_pedestrian_improvement,
  "Signal/ITS Improvement": signal_its_improvements,
  Streetscape: streetscape,
  "Transit Improvements": transit_improvement,
  "Roadway Rehabilitation": roadway_rehabilitation,
  "Roadway New Capacity": roadway_new_capacity,
  "Intersection/Interchange Improvements": intersection_improvements,
  "Bridge Repair/Replacement": bridge_replacement
};

export const updateBounds = mapReference => {
  let bounds = mapReference.map.getBounds();

  const NEbounds = bounds.getNorthEast();
  const SWbounds = bounds.getSouthWest();

  bounds = [NEbounds.lng, NEbounds.lat, SWbounds.lng, SWbounds.lat];

  mapReference.props.getTIPByMapBounds(bounds);
};

export const updateMarkers = mapReference => {
  // grab projects when they become available
  let projects = mapReference.props.projects
    ? mapReference.props.projects.features
    : false;

  // loop through projects in the map and add markers w/popups to them
  projects &&
    projects.forEach(project => {
      // lag = geometry.y, lng = geometry.x
      const coords = [project.geometry.x, project.geometry.y];

      // TODO: refactor with vnodes instead of direct DOM manipulation. For small sets this is fine, but if someone zooms way out and asks 100+ markers to be shown this is not performant.
      //let markerNode = createVNode(VNodeFlags.HtmlElement, "div", "marker");

      // get the project category in order to select the appropriate marker
      const category = project.attributes.DESCRIPTIO;

      // match the category to the appropriate marker
      const svgMarker = markers[category];

      // set the background of markerNode as the svg
      //markerNode.style.background = svgMarker

      // DOM manipulation for now (this works - refactor to use a VNode)
      let markerDiv = document.createElement("div");
      markerDiv.classList.add("marker");
      markerDiv.style.backgroundImage = `url(${svgMarker}`;
      markerDiv.style.backgroundSize = "cover";
      markerDiv.style.height = "55px";
      markerDiv.style.width = "55px";

      // add the marker to the map
      // TODO: look into markers appearing on HOVER, and redirection to expanded page on CLICK
      const marker = new mapboxgl.Marker(markerDiv)
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h2>${project.attributes.ROAD_NAME}</h2>
            <p style="border-bottom: 8px solid #${
              colors[category].forMap
            };">ID: ${project.attributes.MPMS_ID}</p>`
          )
        )
        .addTo(mapReference.map);
    });
};
