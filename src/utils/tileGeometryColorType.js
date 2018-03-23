import Polyline from "@mapbox/polyline";

export const colors = {
  "Bicycle/Pedestrian Improvement": {
    lightest: "rgba(242, 101, 34, 0.1)",
    middle: "rgba(242, 101, 34, 0.5)",
    darkest: "rgba(242, 101, 34, 1)"
  },
  "Bridge Repair/Replacement": {
    lightest: "rgba(34, 56, 96, 0.1)",
    middle: "rgba(34, 56, 96, 0.5)",
    darkest: "rgba(34, 56, 96, 1)"
  },
  Streetscape: {
    lightest: "rgba(11, 109, 50, 0.1)",
    middle: "rgba(11, 109, 50, 0.5)",
    darkest: "rgba(11, 109, 50, 1)"
  },
  "Transit Improvements": {
    lightest: "rgba(114, 159, 170, 0.1)",
    middle: "rgba(114, 159, 170, 0.5)",
    darkest: "rgba(114, 159, 170, 1)"
  },
  "Signal/ITS Improvements": {
    lightest: "rbga(237, 28, 36, 0.1)",
    middle: "rbga(237, 28, 36, 0.5)",
    darkest: "rbga(237, 28, 36, 1)"
  },
  "Roadway Rehabilitation": {
    lightest: "rgba(81, 24, 81, 0.1)",
    middle: "rgba(81, 24, 81, 0.5)",
    darkest: "rgba(81, 24, 81, 1)"
  },
  "Roadway New Capacity": {
    lightest: "rgba(157, 29, 32, 0.1)",
    middle: "rgba(157, 29, 32, 0.5)",
    darkest: "rgba(157, 29, 32, 1)"
  },
  "Intersection/Interchange Improvements": {
    lightest: "rgba(255, 193, 14, 0.1)",
    middle: "rgba(255, 193, 14, 0.5)",
    darkest: "rgba(255, 193, 14, 1)"
  },
  Other: {
    lightest: "rgba(90, 191, 65, 0.1)",
    middle: "rgba(90, 191, 65, 0.5)",
    darkest: "rgba(90, 191, 65, 1)"
  }
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
