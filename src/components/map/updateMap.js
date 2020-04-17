import mapboxgl from "mapbox-gl";
import { colors } from "../../utils/tileGeometryColorType.js";

export const updateBounds = mapReference => {
  let renderedProjects = {
    allMPMS: [],
    features: []
  };

  let rendered = mapReference.map.queryRenderedFeatures({
    layers: ["pa-tip-points", "pa-tip-lines"]
  });

  rendered.forEach(item => {
    if (renderedProjects.allMPMS.indexOf(item.properties.MPMS_ID) === -1) {
      renderedProjects.allMPMS.push(item.properties.MPMS_ID);

      // add descriptive info for tiles + lat/lng for the tile hover + map popup link
      renderedProjects.features.push({
        MPMS_ID: item.properties.MPMS_ID,
        DESCRIPTIO: item.properties.DESCRIPTIO,
        ROAD_NAME: item.properties.ROAD_NAME,
        LATITUDE:
          item.layer.id === "pa-tip-points"
            ? item.geometry.coordinates[1]
            : item.geometry.coordinates[0][1],
        LONGITUDE:
          item.layer.id === "pa-tip-points"
            ? item.geometry.coordinates[0]
            : item.geometry.coordinates[1][0],
        mapbox_id: `${item.properties.MPMS_ID}_${item._vectorTileFeature._geometry}`
      });
    }
  });
  mapReference.props.getTIPByMapBounds(renderedProjects);
};

export const showPopup = (marker, map) => {
  let details = marker.properties || marker;

  let tilePopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: {
      top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      bottom: [0, -15],
      "bottom-left": [0, -15],
      "bottom-right": [0, -15],
      left: [15, -5],
      right: [-15, -5]
    }
  });

  // handle edge case where line features pass geometry
  if (Array.isArray(details.LONGITUDE) || Array.isArray(details.LATITUDE)) {
    details.LONGITUDE = details.LONGITUDE[0];
    details.LATITUDE = details.LATITUDE[1];
  }

  tilePopup
    .setLngLat([details.LONGITUDE, details.LATITUDE])
    .setHTML(
      `<h2>${details.MPMS_ID}</h2><p style="border-bottom: 8px solid #${
        colors[details.DESCRIPTIO].forMap
      };">${details.ROAD_NAME}</p>`
    )
    .addTo(map);

  return tilePopup;
};
