import mapboxgl from "mapbox-gl";
import { colors } from "./tileGeometryColorType.js";

export const updateBounds = mapReference => {
  let renderedProjects = {
    allMPMS: [],
    features: []
  };

  let rendered = mapReference.map.queryRenderedFeatures({
    layers: ["nj-tip-points", "nj-tip-lines"]
  });

  rendered.forEach(item => {
    if (renderedProjects.allMPMS.indexOf(item.properties.DBNUM) === -1) {
      renderedProjects.allMPMS.push(item.properties.DBNUM);

      // add descriptive info for tiles + lat/lng for the tile hover + map popup link
      renderedProjects.features.push({
        // CTY: item.properties.CTY,
        DBNUM: item.properties.DBNUM,
        TYPE_DESC: item.properties.TYPE_DESC,
        PROJECTNAM: item.properties.PROJECTNAM,
        LATITUDE:
          item.layer.id === "nj-tip-points"
            ? item.geometry.coordinates[1]
            : item.geometry.coordinates[0][1],
        LONGITUDE:
          item.layer.id === "nj-tip-points"
            ? item.geometry.coordinates[0]
            : item.geometry.coordinates[1][0],
        mapbox_id: `${item.properties.DBNUM}_${item._vectorTileFeature._geometry}`
      });
    }
  });
  mapReference.props.getTIPByMapBounds(renderedProjects);
};

export const keywordBounds = (mapReference, data) => {
  const projects = data || mapReference.props.keywordProjects;
  var bounds = {};
  let latitude = "";
  let longitude = "";

  if (projects.features && projects.features.length) {
    let ids = projects.features.map(feature => feature.properties.DBNUM);
    for (var i = 0; i < projects.features.length; i++) {
      longitude = projects.features[i].properties.LONGITUDE;
      latitude = projects.features[i].properties.LATITUDE;
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    }

    mapReference.map.fitBounds(
      [
        [bounds.xMin, bounds.yMin],
        [bounds.xMax, bounds.yMax]
      ],
      { padding: 20 }
    );

    return ["in", "DBNUM"].concat(ids);
  }
  return ["!=", "DBNUM", ""];
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
      `<h2>${details.DBNUM}</h2><p style="border-bottom: 8px solid #${
        colors[details.TYPE_DESC].forMap
      };">${details.PROJECTNAM}</p>`
    )
    .addTo(map);

  return tilePopup;
};
