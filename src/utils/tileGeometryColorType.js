// util function to establish color schemes for projects based on their category

export const colors = {
  "Bicycle/Pedestrian Improvement": {
    lightest: "rgba(242, 101, 34, 0.1)",
    middle: "rgba(242, 101, 34, 0.3)",
    darkest: "rgba(242, 101, 34, 1)",
    forMap: "f26522"
  },
  "Bridge Repair/Replacement": {
    lightest: "rgba(34, 56, 96, 0.1)",
    middle: "rgba(34, 56, 96, 0.3)",
    darkest: "rgba(34, 56, 96, 1)",
    forMap: "223860"
  },
  Streetscape: {
    lightest: "rgba(11, 109, 50, 0.1)",
    middle: "rgba(11, 109, 50, 0.3)",
    darkest: "rgba(11, 109, 50, 1)",
    forMap: "0b6d32"
  },
  "Transit Improvements": {
    lightest: "rgba(114, 159, 170, 0.1)",
    middle: "rgba(114, 159, 170, 0.3)",
    darkest: "rgba(114, 159, 170, 1)",
    forMap: "729faa"
  },
  "Signal/ITS Improvements": {
    lightest: "rgba(237, 28, 36, 0.1)",
    middle: "rgba(237, 28, 36, 0.3)",
    darkest: "rgb(203, 37, 43)",
    forMap: "ed1c24"
  },
  "Roadway Rehabilitation": {
    lightest: "rgba(81,24,81,0.1)",
    middle: "rgba(81,24,81,0.3)",
    darkest: "rgba(81,24,81,1)",
    forMap: "511851"
  },
  "Roadway New Capacity": {
    lightest: "rgba(157, 29, 32, 0.1)",
    middle: "rgba(157, 29, 32, 0.3)",
    darkest: "rgba(157, 29, 32, 1)",
    forMap: "9d1d20"
  },
  "Intersection/Interchange Improvements": {
    lightest: "rgba(255,193,14,0.1)",
    middle: "rgba(255,193,14,0.3)",
    darkest: "rgba(255,193,14,1)",
    forMap: "ffc10e"
  },
  Other: {
    lightest: "rgba(90, 191, 65, 0.1)",
    middle: "rgba(90, 191, 65, 0.3)",
    darkest: "rgba(90, 191, 65, 1)",
    forMap: "5abf41"
  },
  Default: {
    lightest: "rgb(171, 171, 171)",
    middle: "#666666",
    darkest: "#333333"
  }
};

export const geometryColorType = project => {
  const formattedLatLng = `${project.LATITUDE},${project.LONGITUDE}`;

  // get the Category (streestcape, transit improvement, etc., of a project)
  const category = project.TYPE_DESC;
  const mapColors = colors[category].forMap;

  // Draw the project area (points will just show a static map centering on the project location)
  let path = `&path=color:0x${mapColors}ff|weight:8|${formattedLatLng}`;

  return path;
};
