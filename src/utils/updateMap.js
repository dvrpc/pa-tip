import mapboxgl from "mapbox-gl";
import { colors } from "./tileGeometryColorType.js";

export const updateBounds = mapReference => {
  updateMapPosition(mapReference);
  let renderedProjects = {
    allMPMS: [],
    features: []
  };
  let rendered = mapReference.map.queryRenderedFeatures({
    layers: ["pa-tip-points", "pa-tip-lines"]
  });
  rendered.forEach(item => {
    if (renderedProjects.allMPMS.indexOf(item.properties.MPMS_ID) == -1) {
      renderedProjects.allMPMS.push(item.properties.MPMS_ID);
      renderedProjects.features.push({
        cnty: "Montgomery", // REPLACE ONCE VT GETS UPDATED W/ COUNTIES
        mpms: item.properties.MPMS_ID,
        category: item.properties.DESCRIPTIO,
        name: item.properties.ROAD_NAME,
        lat:
          item.layer.id == "pa-tip-points"
            ? item.geometry.coordinates[1]
            : item.geometry.coordinates[0][1],
        long:
          item.layer.id == "pa-tip-points"
            ? item.geometry.coordinates[0]
            : item.geometry.coordinates[1][0],
        mapbox_id: `${item.properties.MPMS_ID}_${
          item._vectorTileFeature._geometry
        }`
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
    let ids = projects.features.map(feature => feature.attributes.MPMS_ID);
    for (var i = 0; i < projects.features.length; i++) {
      longitude = projects.features[i].attributes.LONGITUDE;
      latitude = projects.features[i].attributes.LATITUDE;
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

const updateMapPosition = instance => {
  instance.props.setMapState({
    center: instance.map.getCenter(),
    zoom: instance.map.getZoom()
  });
};

export const showPopup = (marker, map) => {
  let tilePopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: {
      top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      bottom: [0, -20],
      "bottom-left": [0, -20],
      "bottom-right": [0, -20],
      left: [15, -25],
      right: [-15, -25]
    }
  });

  // handle edge case where line features pass geometry
  if (Array.isArray(marker.long) || Array.isArray(marker.lat)) {
    marker.long = marker.long[0];
    marker.lat = marker.lat[1];
  }

  tilePopup
    .setLngLat([marker.long, marker.lat])
    .setHTML(
      `<h2>${marker.mpms}</h2><p style="border-bottom: 8px solid #${
        colors[marker.category].forMap
      };">${marker.name}</p>`
    )
    .addTo(map);

  return tilePopup;
};
