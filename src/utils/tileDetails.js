import { geometryColorType, colors } from "./tileGeometryColorType.js";

export const tileDetails = (propsProject, width, height) => {
  let projectName;
  let background;
  let gradient;
  let projectType;
  let county;
  let id;

  // project.attributes is for arcGIS searches
  // project.data is for keyword searches
  let project = propsProject.attributes || propsProject;

  if (project) {
    id = project.id || project.MPMS_ID;
    county = project.county || project.CTY;

    // limit project names to 80 characters
    projectName = project.road_name || project.ROAD_NAME;
    if (projectName.length > 40) projectName = projectName.slice(0, 36) + "...";

    //TODO: replace this API key with a process.ENV secret
    // Get a background image for the project according to its type (function needs coords & category)
    const path = geometryColorType(project);
    background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${width}x${height}&maptype=satellite${path}`;

    // based on the project type, assign the gradient value for the caption text
    projectType = project.DESCRIPTIO || project.category;
    gradient = `background: linear-gradient(to bottom, ${
      colors[projectType].lightest
    }, ${colors[projectType].darkest} 45%)`;

    return { background, gradient, projectName, county, id };
  } else {
    return false;
  }
};
