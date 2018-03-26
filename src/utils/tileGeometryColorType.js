import Polyline from "@mapbox/polyline";

export const colors = {
  "Bicycle/Pedestrian Improvement": {
    lightest: "rgba(242, 101, 34, 0.1)",
    middle: "rgba(242, 101, 34, 0.5)",
    darkest: "rgba(242, 101, 34, 1)",
    forMap: "#f26522"
  },
  "Bridge Repair/Replacement": {
    lightest: "rgba(34, 56, 96, 0.1)",
    middle: "rgba(34, 56, 96, 0.5)",
    darkest: "rgba(34, 56, 96, 1)",
    forMap: "#223860"
  },
  Streetscape: {
    lightest: "rgba(11, 109, 50, 0.1)",
    middle: "rgba(11, 109, 50, 0.5)",
    darkest: "rgba(11, 109, 50, 1)",
    forMap: "#0b6d32"
  },
  "Transit Improvements": {
    lightest: "rgba(114, 159, 170, 0.1)",
    middle: "rgba(114, 159, 170, 0.5)",
    darkest: "rgba(114, 159, 170, 1)",
    forMap: "#729faa"
  },
  "Signal/ITS Improvements": {
    lightest: "rgba(237, 28, 36, 0.1)",
    middle: "rgba(237, 28, 36, 0.5)",
    darkest: "rgba(237, 28, 36, 1)",
    forMap: "#ed1c24"
  },
  "Roadway Rehabilitation": {
    lightest: "rgba(81,24,81,0.1)",
    middle: "rgba(81,24,81,0.5)",
    darkest: "rgba(81,24,81,1)",
    forMap: "#511851"
  },
  "Roadway New Capacity": {
    lightest: "rgba(157, 29, 32, 0.1)",
    middle: "rgba(157, 29, 32, 0.5)",
    darkest: "rgba(157, 29, 32, 1)",
    forMap: "#9d1d20"
  },
  "Intersection/Interchange Improvements": {
    lightest: "rgba(255,193,14,0.1)",
    middle: "rgba(255,193,14,0.5)",
    darkest: "rgba(255,193,14,1)",
    forMap: "#ffc10e"
  },
  Other: {
    lightest: "rgba(90, 191, 65, 0.1)",
    middle: "rgba(90, 191, 65, 0.5)",
    darkest: "rgba(90, 191, 65, 1)",
    forMap: "#5abf41"
  }
};

// CONSIDER: having this function take parameters - geometryType and category. Do the logic from tiles.js and only send what's necessary instead of the whole project
export const geometryColorType = project => {
  console.log("project received from arcGIS call ", project);

  // get the Geometry Type (point, line, polygon) of a project
  // project.??? is for the keyword swearch
  /// project.MAPPINGFEA is for the arcGIS call
  const geometryType = project.category || project.MAPPINGFEA;

  // get the Category (streestcape, transit improvement, etc., of a project)
  // project.category is for keyword search
  // project.descriptio is for arcGIS call
  const category = project.category || project.DESCRIPTIO;

  // this line is just to TEST the arcGIS points to see if they will work
  // AS IS: a generic map view gets set so this is NOT working
  let path = `&markers=color:0x${colors[category].forMap}|${project.LAG},${
    project.LNG
  }`;

  /*  
  This block works for the keyword and MAY WORK for the arcGIS stuff w/some refactoring down the road
  if (geometryType === "LineString") {
    path = `&path=color:0x${
      colors[geometryType].darkest
    }ff|weight:8|enc:${Polyline.fromGeoJSON(project)}`;
  } else if (geometryType === "MultiLineString") {
    path = project.geometry.coordinates || 
      .map(
        c =>
          `&path=color:0x${
            colors[geometryType].darkest
          }ff|weight:8|enc:${Polyline.fromGeoJSON({
            type: "LineString",
            coordinates: c
          })}`
      )
      .join("");
  } else if (geometryType === "Point") {
    path = `&markers=color:0x${colors[geometryType].darkest}|${
      project.geometry.coordinates[1]
    },${project.geometry.coordinates[0]}`;
  } else if (geometryType === "Polygon") {
    path = project.geometry.coordinates
      .map(
        c =>
          `&path=color:0x${colors[geometryType].darkest}ff|fillcolor:0x${
            colors[geometryType].darkest
          }66|weight:4|enc:${Polyline.fromGeoJSON({
            type: "LineString",
            coordinates: c
          })}`
      )
      .join("");
  }*/

  return path;
};
