import Polyline from "@mapbox/polyline";

export const colors = {
  "Bicycle/Pedestrian Improvement": "3388FF",
  "Bridge Repair/Replacement": "b50103",
  Streetscape: "00c8a9",
  "Transit Improvements": "4240BF",
  "Signal/ITS Improvements": "e8c346",
  "Roadway Rehabilitation": "BF409F",
  "Roadway New Capacity": "BF8A40",
  "Intersection/Interchange Improvements": "F57332",
  Other: "3b9770"
};

export const geometryColorType = project => {
  const geometryType = project.geometry.type;
  let path;
  if (geometryType === "LineString") {
    path = `&path=color:0x${
      colors[geometryType]
    }ff|weight:8|enc:${Polyline.fromGeoJSON(project)}`;
  } else if (geometryType === "MultiLineString") {
    path = project.geometry.coordinates
      .map(
        c =>
          `&path=color:0x${
            colors[geometryType]
          }ff|weight:8|enc:${Polyline.fromGeoJSON({
            type: "LineString",
            coordinates: c
          })}`
      )
      .join("");
  } else if (geometryType === "Point") {
    path = `&markers=color:0x${colors[geometryType]}|${
      project.geometry.coordinates[1]
    },${project.geometry.coordinates[0]}`;
  } else if (geometryType === "Polygon") {
    path = project.geometry.coordinates
      .map(
        c =>
          `&path=color:0x${colors[geometryType]}ff|fillcolor:0x${
            colors[geometryType]
          }66|weight:4|enc:${Polyline.fromGeoJSON({
            type: "LineString",
            coordinates: c
          })}`
      )
      .join("");
  }
  return path;
};
